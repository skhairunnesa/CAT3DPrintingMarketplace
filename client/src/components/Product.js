import React from "react";
import "../styles/Product.css";
import {Link} from 'react-router-dom'

const Product = ({title, image, link, designer, price}) => {
//make this whole thing a button/link?
    return(
        <div className="header">
            <Link to= {link}>
                <img className="productPhoto" src={image} alt="" />
            </Link>
            <div className="productInfo" >
                <strong>{title}</strong>
                <section><small>Designed by: {designer}</small></section>
                <section><small>Price: ${price}</small></section>
            </div>
        </div>
    );
}
export default Product;
