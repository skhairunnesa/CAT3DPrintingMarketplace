// SellerNavbar.js
import React, { useState, useEffect } from 'react';
import '../assets/Navbar.css'; 
import Cart from '../assets/img/cart.jpg';
import User from '../assets/img/user.jpg';

function SellerNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0); // State to track cart item count

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 180) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handler for clicking on cart
  const handleCartClick = () => {
    // Implement logic to handle cart click, such as opening a cart modal
    console.log('Cart clicked');
  };

  // Handler for clicking on user icon
  const handleUserClick = () => {
    // Implement logic to handle user click, such as opening a user profile menu
    console.log('User clicked');
  };

  // Function to handle clicking on overview
  const handleOverviewClick = () => {
    // Implement logic to handle clicking on overview
    console.log('Overview clicked');
  };

  // Function to handle clicking on products
  const handleProductsClick = () => {
    // Implement logic to handle clicking on products
    console.log('Products clicked');
  };

  // Function to handle clicking on partners
  const handlePartnersClick = () => {
    // Implement logic to handle clicking on partners
    console.log('Partners clicked');
  };

  // Function to handle clicking on articles
  const handleArticlesClick = () => {
    // Implement logic to handle clicking on articles
    console.log('Articles clicked');
  };

  return (
    <nav className={`navbar ${isScrolled ? 'bg' : ''}`}>
    <ul className="links-container">
        <li className="link-item"><a href="#overview" className="link active" onClick={handleOverviewClick}>Overview</a></li>
        <li className="link-item"><a href="#products" className="link" onClick={handleProductsClick}>Products</a></li>
        <li className="link-item"><a href="#partners" className="link" onClick={handlePartnersClick}>Partners</a></li>
        <li className="link-item"><a href="#articles" className="link" onClick={handleArticlesClick}>Articles</a></li>
    </ul>
      <div className="user-interactions">
        <div className="cart" onClick={handleCartClick}>
          <img src={Cart} className="cart-icon" alt="Cart" />
          <span className="cart-item-count">{cartItemCount}</span>
        </div>
        <div className="user" onClick={handleUserClick}>
          <img src={User} className="user-icon" alt="User" />
        </div>
      </div>
    </nav>
  );
}

export default SellerNavbar;