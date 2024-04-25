/// <summary>
/// Authors: Jason Shull
/// Description:
/// </summary>

import React from "react";

import { BuyerNavBar, SellerNavBar, DesignerNavBar, SmallerSellerNavBar, SmallerBuyerNavBar, SmallerDefaultNavBar, DefaultNavBar} from "../components/Navbar";

// This page component includes the navbar components.
// Takes in the main page component as a paramater.
export const BuyerPageFramework = ({ component }) => {
    return (
        <div className="app-container">
            <SmallerBuyerNavBar/>
            <BuyerNavBar />
            <div className="content-container">
                <div className="main-content">
                    {component}
                </div>
            </div>
        </div>
    );
};

export const SellerPageFramework = ({ component }) => {
    return (
        <div className="app-container">
            <SmallerSellerNavBar />
            <SellerNavBar />
            <div className="content-container">
                <div className="main-content">
                    {component}
                </div>
            </div>
        </div>
    );
};

export const DesignerPageFramework = ({ component }) => {
    return (
        <div className="app-container">
            <SmallerSellerNavBar />
            <DesignerNavBar />
            <div className="content-container">
                <div className="main-content">
                    {component}
                </div>
            </div>
        </div>
    );
};

export const DefaultPageFramework = ({component}) => {
    return(
        <div className="app-container">
            <SmallerDefaultNavBar />
            <DefaultNavBar />
            <div className="content-container">
                <div className="main-content">
                    {component}
                </div>
            </div>
        </div>
    )
};