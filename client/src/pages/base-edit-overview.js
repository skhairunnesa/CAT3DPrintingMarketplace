import React, { Component } from "react";
import '../assets/edit-overview.css';
import { useState , useEffect} from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import e from "cors";

var seller;
var sellerID;
var failToLoad = false;
var hasLoaded = false;

var getUser = "http://localhost:8080/getUserByID?id=";
var updateUser = "http://localhost:8080/update?id=";

const defaultImage = "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg";

// Renders the edit overview
function BaseEditOverview()
{
    // Get Current Seller ID
    sellerID = "660b8c7240b171e3ad709c51";
    hasLoaded = false;

    // Calls the handle data load function once the page loads
    useEffect(()=> {
        handleDataLoad();
    }, [])

    // Handles the retieval and display of user data to the webpage
    const handleDataLoad = async() =>
    {
        // Checks if the page has already been loaded
        if(hasLoaded) {return;}
        hasLoaded = true;

        // Attempts to retrieve user data from the database
        const res = await axios.get(getUser + sellerID)

        // Returns and displays the failure message if there was an error with loading
        if(res.data === null || res.data.name == "CastError")
        {
            failToLoad = true;
            return;
        }

        // Retrieves data and fills out fields with previous information
        document.getElementById('seller_website').value = res.data.seller_website;
        document.getElementById('seller_summary').value = res.data.seller_summary;
        document.getElementById('seller_name').innerText = res.data.seller_name;

        // Retrieves data about the seller's products and displays them to the page
        GetProductsFromID();

        // Retrieves data about the seller's partners and displays them to the page
        res.data.seller_partners.forEach(partner_ID => { GetPartnerFromID(partner_ID); });

        // Sets the seller variable to the retrieved data
        seller = res.data;
    }

    // Code to handle the submission of updated information
    // Called when the "save changes button is pressed"
    const handleOnSubmit = async(e) => {
        e.preventDefault();
        console.log(JSON.stringify(seller));
        await fetch(
            updateUser + sellerID, 
            {
                method: "post",
                body: JSON.stringify(seller),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
    }

    // Error message that gets displayed when a loading failure occurs
    if(failToLoad) {
        return (
            <div>
                <h1>
                    Failed To Retrieve User Data
                </h1>
            </div>
        )
    }

    // Returns the editing form
    return ( 
    <div className="editForm">
        <form action="">
            <h1> Edit Profile </h1> 

            <h2 id = "seller_name"> Name </h2> 

            <label htmlFor="seller_picture">Profile Picture:</label>
            <br></br>

            <img alt = "seller profile" id = "seller_picture_display" src={defaultImage}></img>
            <br></br>

            <input type="file" id="seller_picture" name="seller_picture" 
            onChange={UpdateSellerDisplayPicture} accept="image/png, image/jpeg"></input>
            <br></br>

            <label htmlFor="seller_website">Seller Website:</label><br></br>
            <input type="url" id="seller_website" name="seller_website" 
            onChange={(e) => seller.seller_website = e.target.value}
            ></input>
            <br></br>

            <label htmlFor="seller_summary">Summary:</label>
            <br></br>
            <textarea id="seller_summary" type="text" name="seller_summary" 
            onChange={(e) => seller.seller_summary = e.target.value}
            ></textarea>
            <br></br>

            <label htmlFor="seller_products"><h2>Products:</h2></label>

            <div id = "seller_products" className="thumbnailHolder">
            </div>

            <label htmlFor="seller_partners"><h2>Partners:</h2></label>

            <div id = "seller_partners">
                <div id="thumbnailHolder" className="thumbnailHolder"> 
                </div>
            </div>

            <br></br>
            <input id="partner_name" name="partner_name" ></input>
            <button type="button" onClick = { AddPartner } > Add Partner </button>
            <br></br>

            <br></br>
            <button type = "submit" onClick = { handleOnSubmit } > Save Changes </button> 
        </form>
    </div>
    );
};

// Updates the profile picture preview when a new image is chosen
function UpdateSellerDisplayPicture()
{
    let image = document.getElementById("seller_picture_display");
    let input = document.getElementById("seller_picture");
    image.src = window.URL.createObjectURL(input.files[0]);
}

// Retrieves product data based on the seller's ID
const GetProductsFromID = async() =>
{
    // Finds the holder object for products
    let productThumbnails = document.getElementById("seller_products");
    // Adds temporary loading text
    productThumbnails.innerHTML = `Loading...`;

    let outProduct = null;

    // connect to database to get seller products from ID

    /*
    await axios.get("http://localhost:8080/getUserByID?id=" + product_ID)
    .then(product => outProduct = product.data)
    .catch(err => outProduct = null)
    */

    outProduct = dummyProducts;

    // If the retrieval was successful
    if(outProduct !== null)
    {
        productThumbnails.innerHTML = ``;

        // Iterate through each product in the list and display its information
        outProduct.forEach(product => 
        {
            let newThumbnail = document.createElement("div");
            newThumbnail.id = product.product_ID + "_Thumbnail";
            newThumbnail.className = "thumbnail";
            newThumbnail.innerHTML = 
            `
                <p>${product.product_name}</p>
                <p>${product.product_price}</p>
            `
        
            let newButton = document.createElement("button")
            newButton.type = "button";
            newButton.innerHTML = `Edit`
            newButton.addEventListener('click', () => OpenProductEditPage(product.product_ID))
        
            newThumbnail.appendChild(newButton);
            productThumbnails.appendChild(newThumbnail);
        });
    }
}

// Links to the edit page for the product
function OpenProductEditPage(product_ID)
{
    // TODO
}

// Retrieves partner data based on the IDs saved in the seller's information
const GetPartnerFromID = async(partner_ID) =>
{
    // Return if the seller id is the same as the seller then remove from list and return
    if(partner_ID == sellerID) 
    {
        RemovePartner(partner_ID);
        return;
    }

    // Retrieves information from the data base
    let outPartner = null;
    await axios.get(getUser + partner_ID)
    .then(partner => outPartner = partner.data)
    .catch(err => outPartner = null)

    // If the ID is invalid then remove the ID from the list and return
    if(outPartner === null || outPartner.name === "CastError")
    {
        RemovePartner(partner_ID);
        return;
    }

    // If the entered ID is not saved in the seller's infomation then add it to the list in the seller's information
    if(!seller.seller_partners.includes(partner_ID) && partner_ID !== sellerID)
    {
        seller.seller_partners.push(partner_ID);
    }

    // Assembling the display for the seller thumbnail 
    let thumbnail = document.getElementById("thumbnailHolder");

    let newThumbnail = document.createElement("div");
    newThumbnail.id = partner_ID + "_Thumbnail";
    newThumbnail.className = "thumbnail";
    newThumbnail.innerHTML = `<p>${outPartner.seller_name}</p>`

    let newButton = document.createElement("button")
    newButton.type = "button";
    newButton.innerHTML = `Remove`
    newButton.addEventListener('click', () => RemovePartner(partner_ID))

    newThumbnail.appendChild(newButton);
    thumbnail.appendChild(newThumbnail);
}

// Adds the partner based on the value in the text field
function AddPartner()
{
    let partnerID = document.getElementById('partner_name').value;
    document.getElementById('partner_name').value = "";

    // return if the ID is the same as the seller's or the id is already present in the list
    if(seller.seller_partners.includes(partnerID) || partnerID == sellerID) { return; }
    
    GetPartnerFromID(partnerID);
}

// Remove a partner from the list
function RemovePartner(partner_ID)
{
    // removes the partner from the list
    const index = seller.seller_partners.indexOf(partner_ID);

    if (index > -1) {
        seller.seller_partners.splice(index, 1);
    }

    // removes the thumbnail if it exists on the page
    let thumbnail = document.getElementById(partner_ID + "_Thumbnail");

    if(thumbnail !== null)
    {
        thumbnail.remove();
    }
}

const dummyProducts =
[
    {product_ID: 1234, product_name : "stuffsssssssssssssssssssssss", product_price : "20"},
    {product_ID: 213,product_name : "stuff2", product_price : "50"},
    {product_ID: 123123,product_name : "stuff3", product_price : "12"},
    {product_ID: 12312312, product_name : "stuff4", product_price : "3"}
]

export default BaseEditOverview;