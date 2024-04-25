/// <summary>
/// Authors: Jason Shull
/// Description: Script contains how the a defualt page will be handled without having a navbar which will be used anywhere
/// a navbar isnt needed
/// </summary>

import React from "react";

import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

// This page component includes the navbar components.
// Takes in the main page component as a paramater.
const Page = () => {
    return (
        <div className="app-container">
            <NavLink to="./seller" activeStyle>
                seller
            </NavLink>
            <NavLink to="./buyer" activeStyle>
                buyer
            </NavLink>
            
        </div>
    );
};

const NavLink = styled(Link)`
    color: #000000;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    &.active {
        color: #4d4dff;
    }
`;

export default Page;