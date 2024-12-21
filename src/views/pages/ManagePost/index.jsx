import React, { useState, useEffect } from "react";
import { Table, Input } from "antd";
import RequestAPI from "../../../api/admin/requestAPI";
import Utils from "../../../support/support_function";
import "./index.scss";
import { useNavigate } from "react-router-dom";

const ManagePost = () => {
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RequestAPI.getRequests();
        if (response.data.is_success) {
          const postData = response.data.data.map((item) => ({
            id: item.id,
            email: item.request_moderation.sender.email,
            content: Utils.formatContent(item.request_moderation.content),
            reason: Utils.formatReason(item.request_moderation.content),
            createdAt: Utils.formatDateTime(item.created_at),
            updateAt: Utils.formatDateTime(item.updated_at),
          }));
          setPosts(postData);
          setFilteredPosts(postData);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;
    const filteredData = posts.filter(
      (post) =>
        post.email.toLowerCase().includes(value.toLowerCase()) ||
        post.content.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPosts(filteredData);
  };

  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Lí do",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Create at",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Update at",
      dataIndex: "updateAt",
      key: "updateAt",
    },
  ];

  return (
    <div className="main-wrapper">
      <div className="manage-post">
        <h2 className="table-title">Danh sách yêu cầu kiểm duyệt</h2>
        <Input
          placeholder="Tìm kiếm tài khoản, nội dung"
          onChange={handleSearch}
          className="search-input"
        />
        <Table
          columns={columns}
          dataSource={filteredPosts}
          rowKey="id"
          onRow={(record) => ({
            onClick: () => navigate(`/admin/list-requests/detail/${record.id}`),
          })}
        />
      </div>
    </div>
  );
};

export default ManagePost;
