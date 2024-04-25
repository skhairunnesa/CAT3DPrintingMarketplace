import React from "react";
import "../assets/SuggestedContent.css";
import "./Product";

//the intent is to have relavant product info WITHIN this function. however, i can't figure it out
function SuggestedContent({category}) 
{
    return(
        <div className="row">
            <div className = "category">
                <p>{category}</p>
            </div>
            <div className="product_list">
            </div>
        </div>
    )

}
export default SuggestedContent;