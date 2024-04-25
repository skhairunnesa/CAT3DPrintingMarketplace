import React from 'react';
import '../assets/ProductSection.css'; 
import Product1 from '../assets/img/test1.jpg';
import Product2 from '../assets/img/test2.jpg';
import Product3 from '../assets/img/test3.jpg';
import Product4 from '../assets/img/test4.jpg';

function ProductSection() {
  return (
    <section className="best-selling-product-section">
      <h1 className="section-title">best selling products</h1>
      <div className="product-container">
        <div className="product-card">
          <img src={Product1} className="product-img" alt="Product 1" />
        </div>
        <div className="product-card">
          <img src={Product2} className="product-img" alt="Product 2" />
        </div>
        <div className="product-card">
          <img src={Product3} className="product-img" alt="Product 3" />
        </div>
        <div className="product-card">
          <img src={Product4} className="product-img" alt="Product 4" />
        </div>
      </div>
    </section>
  );

}

export default ProductSection;

