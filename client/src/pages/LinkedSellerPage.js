import React from 'react';
import "../assets/NewSellerPage.css";
import { useState , useEffect} from 'react';
import Seller from '../assets/img/seller.jpg';

import { createRoot } from 'react-dom/client';
import axios from 'axios';
import e from "cors";
import { Link, useParams } from "react-router-dom";

var seller;
var sellerID;
var failToLoad = false;
var hasLoaded = false;

var getUser = "http://localhost:5000/getUserByID?id=";
var updateUser = "http://localhost:5000/update?id=";

const defaultImage = "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg";

function LinkedSellerPage(props)
{

 // Get Linked Seller ID
 const sellerID = useParams().sellerID;
 console.log(sellerID);
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
     document.getElementById('seller_name').innerText = res.data.firstName + " " + res.data.lastName;
     document.getElementById('seller_name_again').innerText = res.data.firstName + " " + res.data.lastName;

     if(!Object.hasOwn(res.data.seller, "seller_website"))
     {
         res.data.seller.seller_website = "";
     }

     document.getElementById('seller_website').value = res.data.seller.seller_website;
     document.getElementById('seller_website').href = res.data.seller.seller_website;

     if(!Object.hasOwn(res.data.seller, "seller_summary"))
     {
         res.data.seller.seller_summary = "";
     }

     document.getElementById('seller_summary').innerText = res.data.seller.seller_summary;
     
 }

 return(
     <div className="SellerPage">
         <div>
            <button>Dashboard</button>
            <button onClick={() =>  window.location.href='/edit-overview'}>
             Profile Customization
             </button>
            <button>Quotes Requests</button>
            <button>Messages</button>
            <button>Pans</button>
            <button>Analytics</button>
            <button>Partnership</button>
         </div>
         <div>
             <h1 id='seller_name' className="seller_name">
                 something
             </h1>
             <div>
                 <button>Overview</button>
                 <button>Projects</button>
                 <button>Articles</button>
                 <button>Partners</button>   
             </div>
             <div>
                 <div>
                     <img src={""} alt="UserPicture"/>
                 </div>
                 <div>
                     <h1 id='seller_name_again' className="seller_name">name</h1>
                     <a id='seller_website' className="seller_website">     Link to Website</a>
                     <p id='seller_summary' className="header-text">
                         This is just filler text. But perhaps we should limit bios to
                         a 250 word length or something.
                         Lorem Ipsum is simply dummy text of the printing and 
                         typesetting industry. Lorem Ipsum has been the industry's 
                         standard dummy text ever since the 1500s, when an unknown 
                         printer took a galley of type and scrambled it to make a type 
                         specimen book. It has survived not only five centuries, but also the 
                         leap into electronic typesetting, remaining essentially unchanged. 
                         It was popularised in the 1960s with the release of Letraset sheets 
                         containing Lorem Ipsum passages, and more recently with desktop publishing 
                         software like Aldus PageMaker including versions of Lorem Ipsum.
                     </p>
                 </div>
             </div>
             <hr/>
             <div>
                 {/*Grab customers items from the backend and display them here. Customize styling as needed*/}
                 <SellerInfoCard imgSrc={""} ProductTitle={"Concrete Walls"} designer={"ABC Commercial"} starRating={2} totalReviews={100}/>
                 <SellerInfoCard imgSrc={""} ProductTitle={"Grid Iron field"} designer={"Bradley University"} starRating={1} totalReviews={10000}/>
                 <SellerInfoCard imgSrc={""} ProductTitle={"Kentucky Blue Grass"} designer={"Lance Fields"} starRating={5} totalReviews={5}/>
                 <SellerInfoCard imgSrc={""} ProductTitle={"Dominos Building"} designer={"Chicago Co."} starRating={0} totalReviews={1}/>

             </div>
             <div>
                 <h1><span style={{color:"gold"}}>{"Customers"}</span> <span color={{color:"black"}}>{" Say:"}</span></h1>
                 <div>
                     <CustomerReview rating={4.5} header={"On time with good delivery"} review={"lorem ipson dolor da"}/>
                     <CustomerReview rating={5} header={"On time with good delivery"} review={"lorem ipson dolor da"}/>
                     <CustomerReview rating={3.3} header={"On time with good delivery"} review={"lorem ipson dolor da"}/>
                     <CustomerReview rating={1} header={"On time with good delivery"} review={"lorem ipson dolor da"}/>
                 </div>
                 
             </div>

         </div>



     </div>
 )

}

/*
    Created according to the website
    imgSrc: image source location
    ProductTitle: name of product
    designer: Who made the item
    starRating: total star review -> should be between 1 and 5
    totalReviews: how many total review
*/
function SellerInfoCard({imgSrc, ProductTitle, designer, starRating, totalReviews}){

    return(
        <div className="SellerItemCard">
            <div>
                <img src={imgSrc}/>
            </div>
            <strong>{ProductTitle}</strong>
            <p>{`Designed By: ${designer}`} </p>

            <div>
                <p>
                    {
                        [...Array(Math.max(starRating,0))].map((elem,id)=>{
                            return <span style={{color:"orange"}} key={"star"+id}>{`${String.fromCharCode(9733)}`}</span>
                        })
                    }
                    {
                        [...Array(5-starRating)].map((elem,id)=>{
                            return `${String.fromCharCode(9734)}`
                        })
                    }
                </p>
                <p>{`(${totalReviews})`}</p>
            </div>
            

        </div>
    );

}

function CustomerReview({rating, header, review, ImgSRC}){

    return(
        <div className="CustomerReview">
            <div>
                <img src={ImgSRC}/>
                <div>{rating}</div>
            </div>
            <strong>{header}</strong>
            <p>{review}</p>

        </div>
    )
}

export default LinkedSellerPage;