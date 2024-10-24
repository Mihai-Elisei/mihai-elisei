import React from "react";
import axios from "axios";
import { HideLoading, ShowLoading } from "../../redux/rootSlice";
import { message } from "antd";
import { useDispatch } from "react-redux";

function Login() {
  const [user, setUser] = React.useState({
    username: "",
    password: ""
  });
  const dispatch = useDispatch();
  const login = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/portofolio/admin-login", user);
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("token", JSON.stringify(response.data));
        window.location.href = "/admin";
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-primary">
      <div className="w-96 flex gap-5 p-5 shadow border border-gray-500 flex-col rounded-md bg-white">
        <h1 className="text-2xl">Potofolio - Admin Login</h1>
        <hr />
        <input
          type="text"
          value={user.username}
          placeholder="Username"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <input
          type="password"
          value={user.password}
          placeholder="Password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button
          className="bg-primary text-white p-2 rounded-md"
          onClick={login}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
