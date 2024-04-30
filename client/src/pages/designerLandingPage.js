/// <summary>
/// Authors: Corinne Scheidecker, Isa Luluquisin
/// Description: Script contains how the default webpage will be formated
/// </summary>

import React from "react";
import "../assets/SellerLandingPage.css";
import Product from "../components/Product";
import Collections from "../components/Collections";
import SuggestedContent from "../components/SuggestedContent";
import AutoplayCarousel from "../components/AutoplayCarousel";
import "../assets/customerLandingPage.css";
import "../assets/carousel.css";
import DesignUpload from "../components/DesignUpload";
import "../assets/designUpload.css";

 //Format for seller landing page
const DesignerLandingPage = () => {
    return (
        <div className="SellerLandingPage">
             
             <DesignUpload>
                Upload Designs
            </DesignUpload>
                
                <div className="carousel">
                <AutoplayCarousel />
            </div>

            <div className="suggested_content">
                <SuggestedContent category = "Just Added"/>

                <div className="product_list">
                    <ul>
                    <li><Product 
                        link = "/dummyPages/sampleProduct" 
                        title = "Mansion" 
                        image = "https://i.imgur.com/R6N42eD.png"
                        designer = "designer" 
                        price = "4000"/></li>
                    <li><Product 
                        link = "/dummyPages/sampleProduct" 
                        title = "Modern" 
                        image = "https://i.imgur.com/KZfGbM0.png"
                        designer = "designer" 
                        price = "4000"/></li>
                    <li><Product 
                        link = "/dummyPages/sampleProduct" 
                        title = "Humble Living" 
                        image = "https://i.imgur.com/dXiGF8b.png"
                        designer = "designer" 
                        price = "4000"/></li>
                    </ul>
                </div>

                <SuggestedContent category = "Good Fit for Your Company"/>

                <div className="product_list">
                    <ul>
                    <li><Product 
                        link = "/dummyPages/sampleProduct" 
                        title = "Office Building" 
                        image = "https://th.bing.com/th/id/OIP.MLmGvVQCJ4ETKI6lFEkPYQHaE7?rs=1&pid=ImgDetMain"
                        designer = "designer" 
                        price = "4000"/></li>
                    <li><Product 
                        link = "/dummyPages/sampleProduct" 
                        title = "Hospital" 
                        image = "https://th.bing.com/th/id/R.72fbbb2693580c414dc51e8b4a7ba08f?rik=Ygqs6%2bkyWcle5A&riu=http%3a%2f%2fwww10.aeccafe.com%2fblogs%2farch-showcase%2ffiles%2f2011%2f10%2fCAN0649_N22_letter.jpg&ehk=eQFt4WNZCVtGNyMZd2RF14%2f0xr%2f5UutjE6q5H0NS9Gs%3d&risl=&pid=ImgRaw&r=0"
                        designer = "designer" 
                        price = "4000"/></li>
                    <li><Product 
                        link = "/dummyPages/sampleProduct" 
                        title = "School" 
                        image = "https://upload.wikimedia.org/wikipedia/commons/2/24/State_Normal_School_Building.jpg"
                        designer = "designer" 
                        price = "4000"/></li>
                    </ul>
                </div>

            </div>

            <Collections 
                link = "/dummyPages/sampleProduct" 
                title = "Smart Home Collection" 
                image = "https://i.imgur.com/sAokhhu.jpeg"/>

            <div className="suggested_content">
                <SuggestedContent category = "Tiny Home"/>

            <div className="product_list">
                    <ul>
                    <li><Product 
                        link = "/dummyPages/sampleProduct" 
                        title = "Ranch-Style" 
                        image = "https://i.imgur.com/zOuYHxy.jpeg"
                        designer = "designer" 
                        price = "4000"/></li>
                    <li><Product 
                        link = "/dummyPages/sampleProduct" 
                        title = "Farmhouse" 
                        image = "https://i.imgur.com/jimZy9d.jpeg"
                        designer = "designer" 
                        price = "4000"/></li>
                    <li><Product 
                        link = "/dummyPages/sampleProduct" 
                        title = "Cottage" 
                        image = "https://i.imgur.com/b495bNJ.jpeg"
                        designer = "designer" 
                        price = "4000"/></li>
                    </ul>
                </div>
            </div>

        </div>

    );
};
 
export default DesignerLandingPage;