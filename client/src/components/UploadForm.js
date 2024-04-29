import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom'; 

function UploadForm() {
  const navigate = useNavigate();
  const [imageFiles, setImageFiles] = useState([]);
  const [pdfFiles, setPdfFiles] = useState([]);
  const [tags, setTags] = useState([]);
  const [structureType, setStructureType] = useState('');
  let user = JSON.parse(localStorage.getItem("user"));
  const [userId] = useState(user._id);
  const [price,setPrice] = useState('');

  const handleStructureTypeChange = (event) => {
    setStructureType(event.target.value);
  };

  const handleImageFileChange = (e) => {
    setImageFiles(e.target.files);
  };

  const handlePdfFileChange = (e) => {
    setPdfFiles(e.target.files);
  };

  const handleTagsChange = (selectedOptions) => {
    setTags(selectedOptions.map(option => option.value));
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleUpload = async () => {

    // Check if any required field is empty
    if (!imageFiles.length || !pdfFiles.length || !tags.length || !structureType || !price) {
      alert('Please fill out all required fields');
      return;
    }
    const formData = new FormData();

    for (let i = 0; i < imageFiles.length; i++) {
      formData.append('imageFiles', imageFiles[i]);
    }

    for (let i = 0; i < pdfFiles.length; i++) {
      formData.append('pdfFiles', pdfFiles[i]);
    }

    formData.append('tags', tags.join(','));
    formData.append('structureType', structureType);
    formData.append('userId', userId);
    formData.append('price',price);
    console.log("upload client",formData)

    try {
      const response = await axios.post('http://localhost:5000/api/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        navigate('/login/designer');
        alert('Files uploaded successfully');
      } else {
        throw new Error('Failed to upload files');
      }
    } catch (err) {
      console.error(err);
      alert(`Error uploading files: ${err.message}`); 
    }
  };

  const handleCancel = () => {
    navigate('/login/designer');
  };

  // Define the tagOptions array
  const tagOptions = [
    { value: "residential", label: "Residential" },
    { value: "business", label: "Business" },
    { value: "commercial", label: "Commercial" },
    { value: "farm", label: "Farm" },
    { value: "infrastructure", label: "Infrastructure" },
    { value: "sustainable", label: "Sustainable" },
    { value: "tiny house", label: "Tiny House" },
    { value: "single-story", label: "Single-Story" },
    { value: "two-story", label: "Two-Story" },
    { value: "hut", label: "Hut" },
    { value: "component", label: "Component" },
    { value: "decorative", label: "Decorative" },
    { value: "retaining", label: "Retaining" },
    { value: "earthquake", label: "Earthquake" },
    { value: "hurricane", label: "Hurricane" },
    { value: "Tudor", label: "Tudor" },
    { value: "cape cod", label: "Cape Cod" },
    { value: "Mediterranean", label: "Mediterranean" },
    { value: "southwest", label: "Southwest" },
    { value: "modern", label: "Modern" },
    { value: "craftsman", label: "Craftsman" },
    { value: "contemporary", label: "Contemporary" },
    { value: "specialty", label: "Specialty" },
    { value: "industrial", label: "Industrial" },
    { value: "beach", label: "Beach" },
    { value: "bungalow", label: "Bungalow" },
    { value: "cabin", label: "Cabin" },
    { value: "colonial", label: "Colonial" },
    { value: "classical", label: "Classical" },
    { value: "farmhouse", label: "Farmhouse" },
    { value: "ranch", label: "Ranch" },
    { value: "prairie", label: "Prairie" },
    { value: "southern", label: "Southern" },
    { value: "Victorian", label: "Victorian" },
  ];

  return (
    <div className="form-container">
      <div className="sub-container">
        <h1>Upload House/Structural Designs</h1>
        <div className="input-container">
        <label>Structure Type</label>
        <div className="radio-container">
            <label className="radio-label">
              <input
                type="radio"
                value="house"
                checked={structureType === "house"}
                onChange={handleStructureTypeChange}
              />
              House
            </label>
            <label className="radio-label">
              <input
                type="radio"
                value="structural"
                checked={structureType === "structural"}
                onChange={handleStructureTypeChange}
              />
              Structural
            </label>
          </div><br/>
          <label htmlFor="userId">User ID</label>
          <input type="text" placeholder="User ID" value={userId} readOnly />
          <label htmlFor="images">Images</label>
          <input type="file" accept="image/*" onChange={handleImageFileChange} multiple />
          <label htmlFor="tags">Tags</label>
          <Select
            id="tags"
            name="tags"
            value={tags.map(tag => ({ value: tag, label: tag }))}
            onChange={handleTagsChange}
            options={tagOptions}
            isMulti
          /><br/>
          <label htmlFor="price">Price in $</label>
          <input type="text" placeholder="Enter Price($)" onChange={handlePriceChange} />
          <label htmlFor="files">Files</label>
          <input type="file" accept=".pdf,.stl,.obj" onChange={handlePdfFileChange} multiple />
          <div className = "create">
          <button type="submit" onClick={handleUpload}>Submit</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadForm;
