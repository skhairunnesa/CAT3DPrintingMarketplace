import React from "react";

import Navbar from "../components/Navbar";

// This page component includes the navbar components.
// Takes in the main page component as a paramater.
const PageFramework = ({component}) => {
    return (
        <div className="app-container">
            <Navbar />
            <div className="content-container">
            <div className="main-content">
                {component}
            </div>
            </div>
        </div>
    );
};

export default PageFramework;