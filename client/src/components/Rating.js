import React, { useState } from "react";
import '../styles/Rating.css'; // Import CSS file for styling

const Rating = () => {
    const [rating, setRating] = useState(null);

    // Function to handle rating selection
    const handleRating = (value) => {
        setRating(value);
    };

    return (
        <div className="rating-container">
            <div className="stars">
                {[...Array(5)].map((_, index) => (
                    <span
                        key={index}
                        className={index < rating ? "star-filled" : "star-empty"}
                        onClick={() => handleRating(index + 1)}
                    >
                        &#9733; {/* Unicode for star symbol */}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Rating;
