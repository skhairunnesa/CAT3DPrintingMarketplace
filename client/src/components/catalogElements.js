import styled from "styled-components";

export const CatalogPage = styled.div`
    display: grid;
    grid-template-areas:
        "s s"
        "t r"
        "t f";
    justify-content: start;
`;

export const Search = styled.div`
    overflow: auto;
    padding: 10px;
    margin-left: 330px;
    grid-area: s;
`;

export const Tags = styled.div`
    height: 100%; /* Full-height: remove this if you want "auto" height */
    width: 300px;
    overflow-x: hidden; /* Disable horizontal scroll */
    padding: 0px 10px;
    grid-area: t;
`;

export const Results = styled.div`
    overflow: auto;
    padding: 10px;
    grid-area: r;
`;

export const Element = styled.div`
    width: 480px;
    float: left;
    margin: 10px;
    border: 2px solid black;
`;

export const Link = styled.a`
    color: #000000;
    text-decoration: none;
    cursor: pointer;
    &:hover {
        color: #4d4dff;
    }
`;

export const Img = styled.img`
    height: 300px;
    display: block;
    margin-left: auto;
    margin-right: auto;
`;

export const NumResults = styled.div`
    padding: 10px;
    grid-area: f;
`;
