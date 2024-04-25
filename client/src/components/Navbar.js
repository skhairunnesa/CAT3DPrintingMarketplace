/// <summary>
/// Authors: Jason Shull, Parker Libby
/// Description: This script handles all of the links that the files need to navigate to for the navbar
/// </summary>

import React from "react";
import { Nav, NavLink, NavMenu, SmallNavMenu, SmallNavLink, SearchContainer, SearchInput, SearchButton } from "./NavbarElements";
import caterpillarLogo from '../assets/caterpillar_logo.png'

export const DefaultNavBar = () => {
    return (
        <Nav>
            <NavMenu>
                <NavLink to="/" activeStyle>
                    <img src={require("../assets/House.png")} alt="House"></img>
                </NavLink>
                <NavLink to="/houses" activeStyle>
                    Houses
                </NavLink>
                <NavLink to="/catalog" activeStyle>
                    Structures
                </NavLink>
                <NavLink to="/brands" activeStyle>
                    Brands
                </NavLink>
                <NavLink to="/resources" activeStyle>
                    Resources
                </NavLink>
                <NavLink to="/company" activeStyle>
                    Company
                </NavLink>
            </NavMenu>
            <SearchContainer>
                <SearchInput type="text" placeholder="Search..." />
                <SearchButton><img src={require("../assets/SearchIcon.png")} alt="Search" width="30" height="30" /></SearchButton>
            </SearchContainer>
        </Nav>
    );
};

export const BuyerNavBar = () => {
    return (
        <Nav>
            <NavMenu>
                <NavLink to="/login/buyer" activeStyle>
                    <img src={require("../assets/House.png")} alt="House"></img>
                </NavLink>
                <NavLink to="/houses" activeStyle>
                    Houses
                </NavLink>
                <NavLink to="/catalog" activeStyle>
                    Structures
                </NavLink>
                <NavLink to="/brands" activeStyle>
                    Brands
                </NavLink>
                <NavLink to="/resources" activeStyle>
                    Resources
                </NavLink>
                <NavLink to="/company" activeStyle>
                    Company
                </NavLink>
            </NavMenu>
            <SearchContainer>
                <SearchInput type="text" placeholder="Search..." />
                <SearchButton><img src={require("../assets/SearchIcon.png")} alt="Search" width="30" height="30" /></SearchButton>
            </SearchContainer>
        </Nav>
    );
};

export const SellerNavBar = () => {
    return (
        <Nav>
            <NavMenu>
                <NavLink to="/login/seller" activeStyle>
                    <img src={require("../assets/House.png")} alt="House"></img>
                </NavLink>
                <NavLink to="/discover" activeStyle>
                    Discover
                </NavLink>
                <NavLink to="/design" activeStyle>
                    Design
                </NavLink>
                <NavLink to="/construct" activeStyle>
                    Construct
                </NavLink>
                <NavLink to="/community" activeStyle>
                    Community
                </NavLink>
                <NavLink to="/support" activeStyle>
                    Support
                </NavLink>
            </NavMenu>
            <SearchContainer>
                <SearchInput type="text" placeholder="Search..." />
                <SearchButton><img src={require("../assets/SearchIcon.png")} alt="Search" width="30" height="30" /></SearchButton>
            </SearchContainer>
        </Nav>
    );
};

export const DesignerNavBar = () => {
    return (
        <Nav>
            <NavMenu>
                <NavLink to="/login/designer" activeStyle>
                    <img src={require("../assets/House.png")} alt="House"></img>
                </NavLink>
                <NavLink to="/discover" activeStyle>
                    Discover
                </NavLink>
                <NavLink to="/design" activeStyle>
                    Design
                </NavLink>
                <NavLink to="/construct" activeStyle>
                    Construct
                </NavLink>
                <NavLink to="/community" activeStyle>
                    Community
                </NavLink>
                <NavLink to="/support" activeStyle>
                    Support
                </NavLink>
            </NavMenu>
            <SearchContainer>
                <SearchInput type="text" placeholder="Search..." />
                <SearchButton><img src={require("../assets/SearchIcon.png")} alt="Search" width="30" height="30" /></SearchButton>
            </SearchContainer>
        </Nav>
    );
};

export const SmallerDefaultNavBar = () => {
    return (
        <smallNav>
            <SmallNavMenu>
                <SmallNavLink to="/login" activeStyle>
                    Login
                </SmallNavLink>
                <SmallNavLink to="/dummyPages/myfavorites" activeStyle>
                    My Favorites
                </SmallNavLink>
                <SmallNavLink to="/location-editor" activeStyle>
                    Location Editor
                </SmallNavLink>
                <SmallNavLink to="/message-inbox" activeStyle>
                    Message Inbox
                </SmallNavLink>
            </SmallNavMenu>
        </smallNav>
    );
};

export const SmallerSellerNavBar = () => {
    return (
        <smallNav>
            <SmallNavMenu>
                <SmallNavLink to="/dummyPages/myaccount" activeStyle>
                    My Account
                </SmallNavLink>
                <SmallNavLink to="/dummyPages/locationeditor" activeStyle>
                    Location Editor
                </SmallNavLink>
                <SmallNavLink to="/dummyPages/messagesinbox" activeStyle>
                    Message Inbox
                </SmallNavLink>
            </SmallNavMenu>
        </smallNav>
    );
};

export const SmallerBuyerNavBar = () => {
    return (
        <smallNav>
            <SmallNavMenu>
                <SmallNavLink to="/dummyPages/myaccount" activeStyle>
                    My Account
                </SmallNavLink>
                <SmallNavLink to="/dummyPages/myfavorites" activeStyle>
                    My Favorites
                </SmallNavLink>
                <SmallNavLink to="/dummyPages/messagesinbox" activeStyle>
                    Message Inbox
                </SmallNavLink>
                <SmallNavLink to="/mycart" activeStyle>
                    <img src={require("../assets/Cart.png")} alt="Cart" height="30"></img>
                </SmallNavLink>
            </SmallNavMenu>
        </smallNav>
    );
};
