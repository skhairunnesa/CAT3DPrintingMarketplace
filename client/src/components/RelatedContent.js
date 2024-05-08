import React from "react";
import "../styles/RelatedContent.css";
import Product from "./Product";

//the intent is to have relavant product info WITHIN this function. however, i can't figure it out
function RelatedContent({category, products})
{
    return(
        <div className="row">
            <div className = "category">
                <p>{category}</p>
            </div>
            <div className="product_list">
                {products.map(product => (
                    <Product
                        key={product.structure_id}
                        link={`/structure/${product.structure_id}`}
                        title={product.structure_name}
                        image={product.image_urls}
                        designer={product.designer}
                        price={product.price}
                    />
                ))}
            </div>
        </div>
    );

}
export default RelatedContent;
