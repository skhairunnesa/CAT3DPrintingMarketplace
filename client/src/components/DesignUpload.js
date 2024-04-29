import React, { useState } from "react";
import UploadForm from "./UploadForm"; 
import "../assets/designUpload.css";

const DesignUpload = ({ children }) => {
  // State to track whether the upload button has been clicked
  const [isUploadClicked, setIsUploadClicked] = useState(false);

  return (
    <div className="designUploadContainer">
        {/* Display the upload button */}
        {!isUploadClicked && (
          <button className="uploadbtn" onClick={() => setIsUploadClicked(true)}>
            {children}
          </button>
        )}

        {/* Display the form only when the upload button is clicked */}
        {isUploadClicked && <UploadForm />}
    </div>
  );
};

export default DesignUpload;
