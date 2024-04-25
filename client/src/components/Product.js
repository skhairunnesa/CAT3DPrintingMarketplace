import React from "react";
import "../assets/Product.css";
import {Link} from 'react-router-dom'

const Product = ({name, image, link}) => {
//make this whole thing a button/link?
    return(
        <div className="header">
        <Link to= {link}>
            <img className="productPhoto" src={image} alt="" />
        </Link>
        <div className="productTitle">
                <p>{name}</p>
            </div> 
        </div>
    );
}
export default Product;