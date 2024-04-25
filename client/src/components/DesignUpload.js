/// <summary>
/// Author: Isa Luluquisin
/// Description: Script formats the design-upload card
///</summary> 

import React from "react";
import {Link} from 'react-router-dom'
import "../assets/designUpload.css"

const DesignUpload = ({ image, photoText, designLink }) => {
  return (
    <div className="designUploadContainer">
      <Link to= {designLink}>
        <img className="designImage" src={image} alt="" />
      </Link>
      <div className="designText">
        <p>{photoText}</p>
      </div>
    </div>
  );
}
export default DesignUpload;