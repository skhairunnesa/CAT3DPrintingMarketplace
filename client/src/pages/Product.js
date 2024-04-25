import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const Product = () => {

  const [structureInfo, setStructureInfo] = useState('');
  const [open, setOpen] = useState(false);

     let { productId } = useParams();
     const [options, setOptions] = useState('');
     const [price, setPrice] = useState('');
     const [images, setImages] = useState('');
     const [dataReceived, setDataReceived] = useState(false);
     const [priceIndex, setPriceIndex] = useState(0);
   
     useEffect(() => {
     const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pageID: { productId }.productId })
     };

     fetch("http://localhost:5000/product", requestOptions).then((response) => response.json()).then((data) => {
          setStructureInfo(data);
          setDataReceived(true);
          setOptions([data.custom_options[0], data.custom_options[1], data.custom_options[2], data.custom_options[3]]);
          setPrice(data.price[priceIndex]);
          let items = [];
          for(let i = 0; i < data.images.length; i++){
               items.push({original: data.images[i]});
          }
          setImages(items);
        }).catch((error) => {
          console.error("Error fetching data:", error);
          setStructureInfo(error.message);
          setDataReceived(false);
     });
    });

    function createDropDown(){
         let items = [];
         for(let i = 0; i < options.length; i++){
              items.push(DropdownItem(options[i], i));
          }
          return items;
     }

     
     function DropdownItem(text, index) {
     return (
         <li className = 'dropdownItem'>
             <button class="dropdownItemButton" onClick={() => OnOptionClick(index)}> {text} </button>
         </li>
     );
   }
    // var images = structureInfo.images[0];
     //images = images.split("https").map(x => {return "https" + x}).slice(1);

     const RedirectButton = () => {
          return <button>Text</button>
     }

     const OnOptionClick = (index) => {
          setPriceIndex(index);
     }
    
     if(!dataReceived)
     {
          return (<div><h1>Product not found, please check your URL or contact support.</h1></div>)
     }
     return (
          <div>
               <p className="imageGallery">
                    <ReactImageGallery items={images} autoPlay={false} showFullscreenButton={true} showPlayButton={false}></ReactImageGallery>
                    </p>
                    <h2 id="h2">Available in your area</h2>
                    <p id="pro_id">Product Id: {{ productId }.productId}</p>  
                    <h1 id ="pro_type">Product Type: {structureInfo.structure_type}</h1> 
                    <p1 id="p1">By: {structureInfo.user_id} </p1>            
               <Link to={`/sellerPage/?id=${structureInfo.user_id}`} component={RedirectButton} class="hyperlink">Click here to see more structures by the creator</Link>
               <div class="card">
        <h3 id="p2">Rating: </h3>
        <span class="star">★</span>
        <span class="star">★</span>
        <span class="star">★</span>
        <span class="star">★</span>
        <span class="star">★</span>
    </div>
             <div className='menu-container'>
                 <div className='menu-trigger' onClick={() => {setOpen(!open) } }>
                    <h4 id="p1">Click for Options</h4>
                 </div>
                 <div className={`dropdown-menu ${open? 'active' : 'inactive' }`}>
                     <ul>
                         {createDropDown()}
                     </ul>
                 </div>
             </div>
             <h1 id = "p2">Price ${price}  </h1>
             <button class ="cartbut"><Link to={`/cart?=${price}`} component={RedirectButton}>Add to cart</Link></button>
             <h1 id="prostuff">From the Designer:</h1>
             <p id="prodisc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sem libero, fringilla in bibendum ut, iaculis sed nunc. Duis quam nunc, placerat eget maximus et, laoreet quis massa. Duis porta congue hendrerit. Nam condimentum tempus ligula, a sagittis libero. Nullam hendrerit velit ac justo ultrices, quis faucibus nulla vehicula. Morbi ornare mi ac odio suscipit dictum. Aenean vel pellentesque dolor. Suspendisse potenti. Fusce ac sagittis orci. Aenean eget tristique sem. Ut vitae mauris augue.</p>
     </div>

     );
};


export default Product;
