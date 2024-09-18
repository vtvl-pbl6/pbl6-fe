import React, { useState } from "react";
import authAPI from "../../../api/authAPI";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 

const Homepage = () => {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const credentials = {
            username: username,
            password: password
        };

        try {
            // Gọi API đăng nhập qua authAPI
            const response = await authAPI.login(credentials);
            toast.success("Đăng nhập thành công!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000 // thời gian hiển thị thông báo là 3 giây
            });
        } catch (error) {
            toast.error("Đăng nhập thất bại. Vui lòng thử lại.", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
        }
    };

    return (
        <div>
            <h1>Hello World</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Tài khoản:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Nhập tài khoản"
                        required
                    />
                </div>
                <div>
                    <label>Mật khẩu:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nhập mật khẩu"
                        required
                    />
                </div>
                <button type="submit">Đăng nhập</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Homepage;
