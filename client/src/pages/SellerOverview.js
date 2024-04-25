import React, { useState, useEffect } from "react";
import '../assets/App.css';
import SellerNavbar from '../components/SellerNavbar.js';
import Header from '../pages/Header.js';
import ProductSection from '../pages/ProductSection.js';
import ImageMidSection from '../pages/ImageMidSection.js';
import ReviewSection from '../pages/ReviewSection.js';
import EditPage from '../pages/base-edit-overview.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function SellerOverview() {

    return (
        <div className="app-container">
            <SellerNavbar />
            <div className="header">
            <Header />
            <div className="content-container">
                <ProductSection />
                    <div className="content-container">
                        <ImageMidSection />
                        <div className="content-container">
                            <ReviewSection />                
                        <div className="main-content">
                            <Routes>
                                <Route path="/productSection" element={<ProductSection />} />
                                <Route path="/imageMidSection" element={<ImageMidSection />} />
                                <Route path="/reviewSection" element={<ReviewSection />} />
                                <Route path="/edit-overview" element={<EditPage />} />
                            </Routes>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default SellerOverview;