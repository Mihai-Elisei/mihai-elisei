import React from "react";
import { Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/rootSlice";
import axios from "axios";
import { message } from "antd";

function AdminAbout() {
  const { portofolioData } = useSelector((state) => state.root);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      const tempSkills = values.skills.split(",");
      values.skills = tempSkills;
      dispatch(ShowLoading());
      const response = await axios.post("/api/portofolio/update-about", {
        ...values,
        _id: portofolioData.about._id // Make sure _id exists
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
        initialValues={{
          ...portofolioData.about,
          skills: portofolioData.about.skills.join(" , ")
        }}
      >
        <Form.Item name="imageUrl" label="Image URL">
          <input type="text" placeholder="Image URL" />
        </Form.Item>
        <Form.Item name="description1" label="Description1">
          <textarea placeholder="Description1" />
        </Form.Item>
        <Form.Item name="description2" label="Description2">
          <textarea placeholder="Description2" />
        </Form.Item>
        <Form.Item name="skills" label="Skills">
          <textarea placeholder="Skills" />
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

export default AdminAbout;
