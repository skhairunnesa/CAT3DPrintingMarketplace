import React from 'react';
import '../assets/ReviewSection.css';
import Person1 from '../assets/img/person1.jpg';
import Person2 from '../assets/img/person2.jpg';
import Person3 from '../assets/img/person3.jpg';
import Person4 from '../assets/img/person4.jpg'; 

const ReviewSection = () => {
  return (
    <section className="review-section">
      <h1 className="section-title"><span> customers </span> say </h1>
      <div className="review-container">
        <div className="review-card">
          <div className="user-dp" data-rating="4.9"><img src={Person1} alt="Person 1" /></div>
          <h2 className="review-title">best quality more than my expectation</h2>
          <p className="review">Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
        </div>
        <div className="review-card">
          <div className="user-dp" data-rating="4.2"><img src={Person2} alt="Person 2" /></div>
          <h2 className="review-title">on time delivery with best packaging</h2>
          <p className="review">Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
        </div>
        <div className="review-card">
          <div className="user-dp" data-rating="4.5"><img src={Person3} alt="Person 3" /></div>
          <h2 className="review-title">very helpful customer support</h2>
          <p className="review">Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
        </div>
        <div className="review-card">
          <div className="user-dp" data-rating="4.7"><img src={Person4} alt="Person 4" /></div>
          <h2 className="review-title">very easy to refund/return products</h2>
          <p className="review">Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
        </div>
      </div>
    </section>
  );
}

export default ReviewSection;
