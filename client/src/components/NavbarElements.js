/// <summary>
/// Authors: 
/// Description: This script handles how the elements for the navbar is setup
/// </summary>

import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
import SearchIcon from "../assets/SearchIcon.png";

export const Nav = styled.nav`
    background: #ffc700;
    height: 85px;
    display: flex;
    justify-content: space-between;
    padding: 0.2rem calc((100vw - 1000px) / 2);
    z-index: 12;
`;

export const smallNav = styled.nav`
    background: #ffc700;
    height: 85px;
    display: flex;
    justify-content: space-between;
    padding: 0.2rem calc((100vw - 1000px) / 2);
    z-index: 12;
`;

export const NavLink = styled(Link)`
    color: #000000;
    display: flex;
    align-items: center;
    font-weight: bold;
    font: "Times New Roman";
    text-decoration: none;
    font-size: 20px;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    &.active {
        color: #4d4dff;
    }
`;

export const SmallNavLink = styled(Link)`
color: #000000;
    display: flex;
    align-items: center;
    font-weight: bold;
    font: "Times New Roman";
    font-size: 15px;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    &.active {
        color: #4d4dff;
    }
`;

export const Bars = styled(FaBars)`
    display: none;
    color: #000000;
    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 75%);
        font-size: 1.8rem;
        cursor: pointer;
    }
`;

export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    margin-right: -24px;
    /* Second Nav */
    /* margin-right: 24px; */
    /* Third Nav */
    /* width: 100vw;
white-space: nowrap; */
    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export const SmallNavMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: right;
    /* Third Nav */
    /* width: 100vw;
white-space: nowrap; */
    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export const SearchButton = styled.span`
    display: inline-block;
    width: 30px; 
    height: 30px; 
    background-image: url(${SearchIcon}); 
    background-size: cover; 
    background-repeat: no-repeat;
    cursor: pointer;
`;

export const SearchInput = styled.input`
    padding: 0.5rem; 
    margin-right: -1px; 
    border-radius: 5px;
    border: 1px solid #ccc;
    outline: none;
`;

export const SearchContainer = styled.div`
    display: flex;
    align-items: center;
`;