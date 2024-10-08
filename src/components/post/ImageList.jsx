import React, { useState, useEffect } from "react";
import "./ImageList.scss";

const ImageList = ({ files, setFiles, isEditable }) => {
  const [listImage, setListImage] = useState([]);

  useEffect(() => {
    if (files.length > 0) {
      const newImages = files.map((file) => {
        const url = URL.createObjectURL(file);
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
      <div
        className="image-grid"
        style={{
          display: "flex", // Sử dụng flexbox để xếp ảnh theo hàng ngang
          gap: "10px",
          width: "100%",
          overflowX: "auto",
          overflowY: "auto", // Kích hoạt cuộn ngang
          scrollbarWidth: "none", // Ẩn scrollbar trên Firefox
          whiteSpace: "nowrap", // Không cho phép xuống dòng
          maxHeight: "430px",
        }}
      >
        {listImage.map((img, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              flexShrink: 0, // Đảm bảo các ảnh không co lại
              width: "auto", // Không đặt chiều rộng cố định
              height: listImage.length > 1 ? "272px" : "430px", // Nếu có hơn 2 ảnh thì chiều cao là 272px, nếu 2 ảnh trở xuống thì chiều cao là 150px
              overflow: "hidden",
              borderRadius: "8px",
            }}
          >
            <img
              src={img.url}
              alt={`img-${index}`}
              style={{
                width: "100%",
                height: "100%", // Giữ chiều cao cố định
                objectFit: "cover", // Giữ đúng tỷ lệ nhưng đảm bảo ảnh lấp đầy container
              }}
            />
            {isEditable && (
              <button
                style={{
                  position: "absolute",
                  top: "4px", // Điều chỉnh vị trí trên nếu cần
                  right: "4px", // Điều chỉnh vị trí phải nếu cần
                  width: "28px", // Chiều rộng của nút
                  height: "28px", // Chiều cao của nút
                  borderRadius: "50%", // Làm tròn góc
                  backgroundColor: "rgba(35, 33, 30, 0.8)",
                  backdropFilter: "blur(5px)", // Màu nền
                  cursor: "pointer", // Thay đổi con trỏ khi di chuột
                  display: "flex", // Sử dụng flexbox
                  justifyContent: "center", // Căn giữa nội dung theo chiều ngang
                  alignItems: "center", // Căn giữa nội dung theo chiều dọc
                  border: "none", // Bỏ đường viền
                }}
                onClick={() => handleRemoveImage(index)}
              >
                <span style={{ fontSize: "24px", color: "white" }}>×</span>
                {/* Điều chỉnh fontSize nếu cần */}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageList;
