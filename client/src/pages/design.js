import React from "react";
import DesignUpload from "../components/DesignUpload";

const Design = () => {
// Parse the JSON string stored in localStorage
const userData = JSON.parse(localStorage.user);

// Access the seller subType
const sellerSubType = userData.seller.subType;

console.log("Seller subType:", sellerSubType);

// Check if userType is 'designer'
    if (sellerSubType === 'designer') {
        return (
            <div>
                <DesignUpload>
                    <b>Upload Designs</b>
                </DesignUpload>
            </div>
        );
    } else {
        // If userType is not 'Designer', render nothing
        <div>
            <h1>
                Only Designer Accounts can upload Designs
            </h1>
        </div>
        return null;
    }
};

export default Design;
