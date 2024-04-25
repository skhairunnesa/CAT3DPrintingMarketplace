import React from "react";
import "../assets/collections.css";
import {Link} from 'react-router-dom'

const Collections = ({name, image, link}) => {
//make this whole thing a button/link?
    return(
        <div className="header">
        <Link to= {link}>
            <img className= "collectionsPhoto" src={image} alt="" />
        </Link>
        <div className="collectionsText">
                <p>{name}</p>
            </div> 
        </div>
    );
}
export default Collections;