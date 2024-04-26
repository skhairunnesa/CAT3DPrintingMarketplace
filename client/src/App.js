/// <summary>
/// Authors: Jason Shull, Parker Libby, Isa Luluquisin
/// Description: This sript handles all of the links that the files need to navigate to
/// </summary>

import React, { useState, useEffect } from "react";

import './assets/App.css';

// Components
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import axios from 'axios';

// Pages
import Seller from "./pages/sellerLandingPage";
import Designer from "./pages/designerLandingPage";
import Buyer from "./pages/customerLandingPage";
import { BuyerPageFramework, SellerPageFramework, DefaultPageFramework, DesignerPageFramework } from "./pages/Pageframework";
import Structures from "./pages/structures";
import Brands from "./pages/brands";
import Company from "./pages/company";
import Houses from "./pages/houses";
import Resources from "./pages/resources";
import Discover from "./pages/discover";
import Design from "./pages/design";
import Construct from "./pages/construct";
import Community from "./pages/community";
import Support from "./pages/support";
import MyAccount from "./pages/dummyPages/myAccount";
import MyFavorites from "./pages/dummyPages/myFavorites";
import MyCart from "./pages/myCart";

import EditPage from './pages/base-edit-overview.js';
import SellerPage from './pages/SellerOverview.js';
import { CreateAccountForm, CreateBuyerForm, CreateSellerForm, LoginForm, LoginScreenBase, Template } from './Login';
import './index.css';
import Product from "./pages/Product";
import Catalog from "./pages/catalog";

function App() {
    const [sellers, setSellers] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/getUsers')
            .then(sellers => setSellers(sellers.data))
            .catch(err => console.log(err));
    }, []);

    const [sellerID, setSellerID] = useState("660322de66ad374e72b6a49e");

    const [seller, setSeller] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8080/getUserByID?id=" + sellerID)
            .then(seller => setSeller(seller.data))
            .catch(err => console.log(err));
    }, [sellerID]);


    return (
        <Router>
            <div>
                <Routes>
                    {/** ROUTING FOR PRESSING THE HOME BUTTONS */}
                    <Route
                        exact path="/" //Path for it to be added too
                        element={<DefaultPageFramework component={<Buyer />} />} />
                    <Route
                        exact path="/login/buyer" //Path for it to be added too
                        element={<BuyerPageFramework component={<Buyer />} />} />
                    <Route
                        exact path="/login/seller" //Path for it to be added too
                        element={<SellerPageFramework component={<Seller />} />} />
                    <Route
                        exact path="/login/designer" //Path for it to be added too
                        element={<DesignerPageFramework component={<Designer />} />} />

                    {/** ROUTING FOR LOGIN */}
                    <Route
                        exact path="/login"
                        element={<Template children={<LoginScreenBase children={<LoginForm />} />} />} />
                    <Route
                        exact path="/SignUp"
                        element={<Template children={<LoginScreenBase children={<CreateAccountForm />} />} />} />
                    <Route
                        exact path="/SignUp/SellerSignUp"
                        element={<Template children={<LoginScreenBase children={<CreateSellerForm />} />} />} />
                    <Route
                        exact path="/SignUp/BuyerSignUp"
                        element={<Template children={<LoginScreenBase children={<CreateBuyerForm />} />} />} />

                    {/** ROUTING FOR DEFAULT NAVBAR AND SMALLNAVBAR */}
                    <Route
                        path="/houses" //Path for it to be added too
                        element={<DefaultPageFramework component={<Houses />} />} />
                    <Route
                        path="/structures" //Path for it to be added too
                        element={<DefaultPageFramework component={<Structures />} />} />
                    <Route
                        path="/brands" //Path for it to be added too
                        element={<DefaultPageFramework component={<Brands />} />} />
                    <Route
                        path="/resources" //Path for it to be added too
                        element={<DefaultPageFramework component={<Resources />} />} />
                    <Route
                        path="/company" //Path for it to be added too
                        element={<DefaultPageFramework component={<Company />} />} />
                    <Route
                        path="/dummyPages/myAccount" //Path for it to be added too
                        element={<DefaultPageFramework component={<MyAccount />} />} />
                    <Route
                        path="/dummyPages/myFavorites" //Path for it to be added too
                        element={<DefaultPageFramework component={<MyFavorites />} />} />
                    {/**include routing for myFavorites and Location Editor */}

                    {/** ROUTING FOR BUYER NAVBAR AND SMALLNAVBAR */}
                    <Route
                        path="/houses" //Path for it to be added too
                        element={<BuyerPageFramework component={<Houses />} />} />
                    <Route
                        path="/structures" //Path for it to be added too
                        element={<BuyerPageFramework component={<Structures />} />} />
                    <Route
                        path="/brands" //Path for it to be added too
                        element={<BuyerPageFramework component={<Brands />} />} />
                    <Route
                        path="/resources" //Path for it to be added too
                        element={<BuyerPageFramework component={<Resources />} />} />
                    <Route
                        path="/company" //Path for it to be added too
                        element={<BuyerPageFramework component={<Company />} />} />
                    <Route
                        path="/dummyPages/myAccount" //Path for it to be added too
                        element={<BuyerPageFramework component={<MyAccount />} />} />
                    <Route
                        path="/dummyPages/myFavorites" //Path for it to be added too
                        element={<BuyerPageFramework component={<MyFavorites />} />} />
                    <Route
                        path="/myCart" //Path for it to be added to
                        element={<BuyerPageFramework component={<MyCart />} />} />

                    <Route
                        path="/structures/:id"
                        element={<Structures />}
                    />
                    {/** <Route */}
                    {/**path="/messages" //Path for it to be added to */}
                    {/**element={<BuyerPageFramework component={<MessageInbox />} />} />  */}

                    {/** ROUTING FOR SELLER NAVBAR AND SMALLNAVBAR */}
                    <Route
                        path="/discover" //Path for it to be added too
                        element={<SellerPageFramework component={<Discover />} />} />
                    <Route
                        path="/design" //Path for it to be added too
                        element={<SellerPageFramework component={<Design />} />} />
                    <Route
                        path="/construct" //Path for it to be added too
                        element={<SellerPageFramework component={<Construct />} />} />
                    <Route
                        path="/community" //Path for it to be added too
                        element={<SellerPageFramework component={<Community />} />} />
                    <Route
                        path="/support" //Path for it to be added too
                        element={<SellerPageFramework component={<Support />} />} />
                    <Route
                        path="/dummyPages/myAccount" //Path for it to be added too
                        element={<SellerPageFramework component={<MyAccount />} />} />

                    <Route
                         path="/product/:productId"
                         element={<BuyerPageFramework component={<Product />} />} />
                    <Route
                         path="/catalog"
                         element={<BuyerPageFramework component={<Catalog />} />} />
                    {/**must also include small navbar routing like location editor and message inbox */}

                    {/** ROUTING FOR DESIGNER NAVBAR AND SMALLNAVBAR */}
                    <Route
                        path="/discover" //Path for it to be added too
                        element={<DesignerPageFramework component={<Discover />} />} />
                    <Route
                        path="/design" //Path for it to be added too
                        element={<DesignerPageFramework component={<Design />} />} />
                    <Route
                        path="/construct" //Path for it to be added too
                        element={<DesignerPageFramework component={<Construct />} />} />
                    <Route
                        path="/community" //Path for it to be added too
                        element={<DesignerPageFramework component={<Community />} />} />
                    <Route
                        path="/support" //Path for it to be added too
                        element={<DesignerPageFramework component={<Support />} />} />
                    <Route
                        path="/dummyPages/myAccount" //Path for it to be added too
                        element={<DesignerPageFramework component={<MyAccount />} />} />
                    {/**must also include small navbar routing like location editor and message inbox */}


                    <Route path="/edit-overview" element={<SellerPageFramework component={<EditPage />} />} />
                    <Route path="/sellerPage" element={<SellerPageFramework component={<SellerPage />} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
