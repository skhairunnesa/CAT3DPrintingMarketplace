/*Author: Isa Luluquisin, Kait
// Description: This script contains the content of the customer landing screen. It is formatted as
// shown in the sample document given at the beginning of the project.
*/

import React, { useState, useEffect } from "react";
import "../styles/customerLandingPage.css";
import "../styles/carousel.css";
import axios from 'axios';
import AutoplayCarousel from "../components/AutoplayCarousel";
import Product from "../components/Product";
import Collections from "../components/Collections";
import SuggestedContent from "../components/SuggestedContent"

//Format for customer landing page
const CustomerLandingPage = () => {
    const [structures, setStructures] = useState([]);
    const [trendingStructures, setTrendingStructures] = useState([]);
    const [gardenStructures, setGardenStructures] = useState([]);
    const [tinyHomeStructures, setTinyHomeStructures] = useState([]);

    // useEffect(() => {
    //     axios.get('http://localhost:5000/api/Structures')
    //         .then(response => {
    //             console.log(response.data);
    //             setStructures(response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching structures:', error);
    //         });
    // }, []);
    // axios.get('http://localhost:5000/api/Structures/trendy')
    // axios.get('http://localhost:5000/api/Structures/garden')
    useEffect(() => {
        axios.get(`http://localhost:5000/api/Structures/tags/trendy`)
        .then(response => {
            console.log("trendy:...", response);
            setTrendingStructures(response.data);
        })
        .catch(error => {
            console.error("Error fetching trendy:...", error);
        });

        axios.get('http://localhost:5000/api/Structures/tags/garden')
        .then(response => {
            console.log("garden:...", response);
            setGardenStructures(response.data);
        })
        .catch(error => {
            console.error("Error fetching garden:...", error);
        });
        axios.get('http://localhost:5000/api/Structures/tags/tiny')
        .then(response => {
            console.log("garden:...", response);
            setTinyHomeStructures(response.data);
        })
        .catch(error => {
            console.error("Error fetching garden:...", error);
        });

        // Fetch structures for each category
        // const fetchStructuresByCategory = async () => {
        //     try {
        //         const trendingResponse = await axios.get('http://localhost:5000/api/Structures/tags')
        //         .then(response => {
        //             return response;
        //         });
        //         setTrendingStructures(trendingResponse.data);

        //         const gardenResponse = await axios.get('http://localhost:5000/api/Structures/tags', {
        //             params: { tags: ['garden'] } // Adjust tags as needed
        //         });
        //         setGardenStructures(gardenResponse.data);

        //         const tinyHomeResponse = await axios.get('http://localhost:5000/api/Structures', {
        //             params: { tags: ['tiny', 'home'] } // Adjust tags as needed
        //         });
        //         setTinyHomeStructures(tinyHomeResponse.data);
        //     } catch (error) {
        //         console.error('Error fetching structures:', error);
        //     }
        // };
        // fetchStructuresByCategory();
    }, []);


    return (
        <div className="customerLandingPage">    
            <div className="carousel">
                <AutoplayCarousel />
            </div>

            <div className="suggested_content">
                <SuggestedContent category = "Trending Home Designs"/>

                <div className="product_list">
                    <ul>
                    {trendingStructures.map(structure => (
                        <li><Product 
                            link = {`/structure/${structure.structure_id}`}
                            title = {`${structure.structure_name}`}
                            image = {`${structure.image_urls}`}
                            designer = {`${structure.designer}`}
                            price = {`${structure.price}`}
                        >
                    </Product></li>
                ))}
                    {/* <li><Product 
                        link = "/dummyPages/sampleProduct" 
                        title = "Lantern Home" 
                        image = "https://homesnapshots.com/wp-content/uploads/sites/2/2019/08/67424.jpg"
                        designer = "designer" 
                        price = "4000" /></li>
                    <li><Product 
                        link = "/dummyPages/sampleProduct" 
                        title = "Sphere House" 
                        image = "https://robbreport.com/wp-content/uploads/2023/02/Credit-Jilbert-Daniel-8-1.jpg?w=1000"
                        designer = "designer" 
                        price = "4000" /> </li>
                    <li><Product 
                        link = "/dummyPages/sampleProduct" 
                        title = "Japanese Style Cabin" 
                        image = "https://aspiremetro.com/wp-content/uploads/2022/07/haiku.jpeg"
                        designer = "designer" 
                        price = "4000" /></li> */}
                    </ul>
                </div>

                <div className="suggested_content">
                <SuggestedContent category = "Garden Magic"/>

                <div className="product_list">
                    <ul>
                    {gardenStructures.map(structure => (
                        <li><Product 
                            link = {`/structure/${structure.structure_id}`}
                            title = {`${structure.structure_name}`}
                            image = {`${structure.image_urls}`}
                            designer = {`${structure.designer}`}
                            price = {`${structure.price}`}
                        >
                    </Product></li>
                ))}
                    {/* <li><Product 
                        link = "/dummyPages/sampleProduct" 
                        title = "Green House" 
                        image = "https://i.etsystatic.com/21692876/r/il/503d7d/2734910657/il_570xN.2734910657_53ld.jpg" 
                        designer = "designer" 
                        price = "4000"/></li>
                    <li><Product 
                        link = "/dummyPages/sampleProduct" 
                        title = "Garden Log Cabin" 
                        image = "https://media.glampinghub.com/CACHE/images/accommodations/riverfront-log-home-cabin-1493371670946/7e8853f03105db72ce48cc20205ef360.jpg"
                        designer = "designer" 
                        price = "4000"/></li>
                    <li><Product 
                        link = "/dummyPages/sampleProduct" 
                        title = "Vintage Villa" 
                        image = "https://www.victoriabuzz.com/wp-content/uploads/2017/04/Tulip-House-on-Beach-Drive.jpg"
                        designer = "designer" 
                        price = "4000"/></li> */}
                    </ul>
                </div>
              </div>

            <Collections 
                link = "/dummyPages/sampleProduct" 
                title = "Smart Home Collection" 
                image = "https://images.surferseo.art/17bb9c9b-4894-43ed-97a0-ed9389bb657d.png"
                designer = "designer" 
                price = "4000"/>
                
              <div className="suggested_content">
                <SuggestedContent category = "Tiny Home"/>

                <div className="product_list">
                    <ul>
                    {tinyHomeStructures.map(structure => (
                        <li><Product 
                            link = {`/structure/${structure.structure_id}`}
                            title = {`${structure.structure_name}`}
                            image = {`${structure.image_urls}`}
                            designer = {`${structure.designer}`}
                            price = {`${structure.price}`}
                        >
                    </Product></li>
                    ))}
                    </ul>
                </div>
              </div>
            </div>
        </div>

    );
    
};
 
export default CustomerLandingPage;
// import React, { useState, useEffect } from "react";
// import axios from 'axios';
// import { Link, Route } from "react-router-dom";
// import Structure from "./structure";

// const StructureSelectionPage = () => {

//     return (
//         <div style={{ marginLeft: "10px" }}>
//             <h1>Structures</h1>
//             <ul>
                // {structures.map(structure => (
                //     <Product key={structure.s}>
                //         <Link to={`/structure/${structure.structure_id}`}>{structure.structure_name} ${structure.price}</Link>
                //     </Product>
                // ))}
//             </ul>
//         </div>
//     );
// };

// export default StructureSelectionPage;
