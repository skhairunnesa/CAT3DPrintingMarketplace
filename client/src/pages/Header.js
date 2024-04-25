import React from 'react';
import { useState , useEffect} from 'react';
import '../assets/Header.css'; 
import Seller from '../assets/img/seller.jpg';

import { createRoot } from 'react-dom/client';
import axios from 'axios';
import e from "cors";

var seller;
var sellerID;
var failToLoad = false;
var hasLoaded = false;

var getUser = "http://localhost:5000/getUserByID?id=";
var updateUser = "http://localhost:5000/update?id=";

const defaultImage = "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg";

function Header() {
          // Get Current Seller ID
          sellerID = "660af60ec30674a9825f7109";
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
              document.getElementById('seller_website').innerText = res.data.seller_website;
              document.getElementById('seller_summary').innerText = res.data.seller_summary;
              document.getElementById('seller_name').innerText = res.data.seller_name;
          }
  return (
    <header className="header-section">
      <div className="header-content">
        <img id='seller_image' src={Seller} className="seller-img" alt="Seller" />
      </div>
      <div className='header-card'>
      <h1 id='seller_name' className="header-heading">
        <span>Mark <br /></span> Johnson
      </h1>
      <p id='seller_website' className="header-text">www.markjohnson.org</p>
      <p id='seller_email' className="header-text">markjohnson@gmail.com</p>
      <p id='seller_number' className="header-text">555-555-5555</p>
      <p id='seller_summary' className="header-text">Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
      </div>
    </header>
  );
}

export default Header;
