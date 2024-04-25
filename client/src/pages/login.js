/* Author: Isa Luluquisin
// Description: Dummy page for sampleproduct. This page is a filler for when a user 
// clicks on an image
*/


import React from "react";

import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

// This page component includes the navbar components.
// Takes in the main page component as a paramater.
const Login = () => {
    return (
        <div className="app-container">
            <NavLink to="./seller" activeStyle>
                seller
            </NavLink>
            <NavLink to="./designer" activeStyle>
                designer
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

export default Login;