import React from 'react';
import '../assets/MidSection.css'; 

function MidSection() {
  return (
    <section className="mid-section">
      <div className="section-item-container">
        <img src="assets/img/bg-2.png" className="section-bg" alt="" />
        <div className="section-info">
          <h1 className="title">premium quality in <span>affordable</span> price</h1>
          <p className="info">lorem 15</p>
        </div>
      </div>
    </section>
  );
}

export default MidSection;