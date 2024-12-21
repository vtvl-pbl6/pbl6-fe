import React, { useEffect, useState } from "react";
import "./index.scss";
import { Box, Button, Image, Text, VStack } from "@chakra-ui/react";
import noAvt from "../../../assets/imgs/no_avt.jpg";
import ImageList from "../../../components/post/ImageList";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequestAPI from "../../../api/admin/requestAPI";

const DetailRequest = () => {
    const [request, setRequest] = useState(null);
    const navigate = useNavigate();
    const { id: requestId } = useParams();
    useEffect(() => {
        const fetchRequest = async () => {
            try {
                console.log(requestId);
                const response = await RequestAPI.getRequestById(requestId);
                console.log("Response:", response);
                if (response.data.is_success) {
                    setRequest(response.data.data);
                    console.log(response.data.data);
                } else {
                    toast.error("Failed to fetch request details");
                }
            } catch (error) {
                toast.error("An error occurred while fetching request details");
            }
        };
        fetchRequest();
    }, [requestId]);

    const handleAccept = async () => {
        try {
            const response = await RequestAPI.acceptModeration(requestId);
            if (response.data.is_success) {
                toast.success("Đã phê duyệt bài viết");
                navigate("/admin/list-requests");
            } else {
                toast.error(response.data.errors.message);
                console.error("Failed to accept moderation");
            }
        } catch (error) {
            toast.error("Error accepting moderation:", error);
        }
    };

    const handleDecline = async () => {
        try {
            const response = await RequestAPI.declineModeration(requestId);
            if (response.data.is_success) {
                toast.success("Đã từ chối phê duyệt");
                navigate("/admin/list-requests");
            } else {
                toast.error(response.data.errors.message);
            }
        } catch (error) {
            toast.error("Error declining moderation:", error);
        }
    };

    if (!request) return <div>Loading...</div>;

    return (
        <div className="main-wrapper">
            <div className="body-main">
                {/* Content of the post */}
                <div className="left">
                    <h5>Bài đăng</h5>
                    <div className="container-post-b">
                        <div className="header-post-b">
                            <div className="user-info-b">
                                <Image
                                    src={
                                        request.author.avatar_file?.url || noAvt
                                    }
                                    className="user-avatar-b"
                                />
                                <div className="user-name-b">
                                    <Text>{request.author.display_name}</Text>
                                </div>
                                <Text className="post-time-b">
                                    {request.created_at}
                                </Text>
                            </div>
                        </div>
                        <div className="post-body-b">
                            <Text className="post-content-b">
                                {request.content}
                            </Text>
                            {request.files && request.files.length > 0 && (
                                <Box className="post-image-b">
                                    <ImageList
                                        files={request.files}
                                        isEditable={false}
                                    />
                                </Box>
                            )}
                        </div>
                    </div>
                </div>

                {/* Moderation Results */}
                <div className="right">
                    <h5>Kết quả kiểm duyệt</h5>
                    <div className="container-detect">
                        {/* {request.files && request.files.length > 0 ? (
              request.files.map((file) => (
                <div className="detect-row" key={file.id}>
                  <div className="detect-image">
                    <Image
                      src={file.url}
                      alt={file.name}
                      maxWidth="100%"
                      maxHeight="300px"
                      objectFit="cover"
                    />
                  </div>
                  <div className="detect-info">
                    <VStack align="start" spacing={2}>
                      {file.nsfwResult ? (
                        <>
                          <Text>
                            <strong>Tỉ lệ nhạy cảm:</strong>{" "}
                            {(file.nsfwResult.score * 100).toFixed(2)}%
                          </Text>
                          <Text>
                            <strong>Kết luận:</strong>{" "}
                            {file.nsfwResult.score > 0.65
                              ? "Ảnh vi phạm tiêu chuẩn 18+"
                              : "Ảnh không vi phạm tiêu chuẩn 18+"}
                          </Text>
                        </>
                      ) : (
                        <>
                          <Text>
                            <strong>Tỉ lệ nhạy cảm:</strong> 0%
                          </Text>
                          <Text>
                            <strong>Kết luận:</strong> Ảnh không vi phạm tiêu
                            chuẩn 18+
                          </Text>
                        </>
                      )}
                    </VStack>
                  </div>
                </div>
              ))
            ) : (
              <Text>Không có hình ảnh để kiểm duyệt</Text>
            )} */}
                        <Text>
                            <strong>Kết luận: </strong>
                            Không có hình ảnh vi phạm 18+
                        </Text>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="footer-main">
                <Button
                    className="btn-back"
                    onClick={() => navigate("/admin/list-requests")}
                >
                    <LeftOutlined
                        style={{ fontSize: "12px", marginRight: "4px" }}
                    />
                    Quay lại
                </Button>
                <Button className="btn-accept" onClick={handleAccept}>
                    Phê duyệt
                </Button>
                <Button className="btn-deny" onClick={handleDecline}>
                    Từ chối
                </Button>
                {/* <Button className="btn-lock" onClick={handleLock}>
          Khóa
        </Button>
        <Button className="btn-unlock" onClick={handleUnlock}>
          Mở khóa
        </Button> */}
            </div>
            <ToastContainer />
        </div>
    );
};

export default DetailRequest;
