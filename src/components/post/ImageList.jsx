import React, { useState, useEffect } from "react";
import "./ImageList.scss";

const ImageList = ({ files, setFiles, isEditable }) => {
  const [listImage, setListImage] = useState([]);

  useEffect(() => {
    if (files.length > 0) {
      const newImages = files.map((file) => {
        const url = file.url || URL.createObjectURL(file);
        return { file, url };
      });
      setListImage(newImages);
    }
  }, [files]);

  const handleRemoveImage = (index) => {
    const newList = listImage.filter((_, i) => i !== index);
    setListImage(newList);

    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  return (
    <div>
      <div className="image-grid">
        {listImage.map((img, index) => (
          <div
            className="image-list"
            key={index}
            style={{
              height: listImage.length > 1 ? "272px" : "430px",
            }}
          >
            <img className="image" src={img.url} alt={`img-${index}`} />
            {isEditable && (
              <button
                className="button-image"
                onClick={() => handleRemoveImage(index)}
              >
                <span className="span-x">×</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageList;
