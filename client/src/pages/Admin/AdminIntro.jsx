import React from "react";
import { Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/rootSlice";
import axios from "axios";
import { message } from "antd";

function AdminIntro() {
  const { portofolioData } = useSelector((state) => state.root);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/portofolio/update-intro", {
        ...values,
        _id: portofolioData.intro._id // Make sure _id exists
      });

      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.response?.data?.message || "An error occurred");
    } finally {
      dispatch(HideLoading());
    }
  };
  return (
    <div>
      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={portofolioData.intro}
      >
        <Form.Item name="welcomeText" label="Welcome Text">
          <input type="text" placeholder="Intro" />
        </Form.Item>
        <Form.Item name="firstName" label="First Name">
          <input type="text" placeholder="First Name" />
        </Form.Item>
        <Form.Item name="lastName" label="Last Name">
          <input type="text" placeholder="Last Name" />
        </Form.Item>
        <Form.Item name="caption" label="Caption">
          <input type="text" placeholder="Caption" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <textarea placeholder="Description" />
        </Form.Item>
        <div className="flex justify-end">
          <button
            className="px-10 py-2 bg-primary text-white rounded-md"
            type="submit"
          >
            Update
          </button>
        </div>
      </Form>
    </div>
  );
}

export default AdminIntro;
