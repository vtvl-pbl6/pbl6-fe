import React, { useState, useEffect } from "react";
import { getImageSize } from "react-image-size";
import "./ImageList.scss";
const ImageList = ({ files, setFiles, isEditable }) => {
  const [listImage, setListImage] = useState([]);
  const [minHeight, setMinHeight] = useState(0);

  useEffect(() => {
    if (files.length > 0) {
      const newImages = files.map((file) => {
        const url = URL.createObjectURL(file);
        return { file, url, height: 0 };
      });

      setListImage(newImages);
    }
  }, [files]);

  useEffect(() => {
    if (listImage.length > 0) {
      const fetchImageSizes = async () => {
        const heights = await Promise.all(
          listImage.map(async (image) => {
            try {
              const { height } = await getImageSize(image.url);
              return height;
            } catch (error) {
              console.error("Error fetching image size:", error);
              return 0;
            }
          })
        );
        setMinHeight(Math.min(...heights));
      };

      fetchImageSizes();
    }
  }, [listImage]);

  const handleRemoveImage = (index) => {
    const newList = listImage.filter((_, i) => i !== index);
    setListImage(newList);

    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  return (
    <div
      className="scroll-container"
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        overflowX: "scroll",
        overflowY: "hidden",
        alignItems: "flex-start",
        border: "1px solid #ddd",
        maxHeight: "200px",
        width: "100%",
        alignContent: "space-between",
        gap: "10px",
      }}
    >
      {listImage.map((img, index) => (
        <div
          key={index}
          style={{
            position: "relative",
            flexShrink: 0,
          }}
        >
          <img
            src={img.url}
            alt={`img-${index}`}
            style={{
              height: minHeight,
              width: "auto",
            }}
          />
          {isEditable && (
            <button
              style={{
                position: "absolute",
                top: "1px",
                right: "9px",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => handleRemoveImage(index)}
            >
              <span style={{ fontSize: "24px", color: "black" }}>×</span>
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ImageList;
