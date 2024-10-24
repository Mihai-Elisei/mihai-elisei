import React from "react";
import { Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/rootSlice";
import axios from "axios";
import { message } from "antd";

function AdminContact() {
  const { portofolioData } = useSelector((state) => state.root);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/portofolio/update-contact", {
        ...values,
        _id: portofolioData.contact._id // Make sure _id exists
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
        initialValues={portofolioData.contact}
      >
        <Form.Item name="name" label="Name">
          <input type="text" placeholder="Name" />
        </Form.Item>

        <Form.Item name="gender" label="Gender">
          <input type="text" placeholder="Gender" />
        </Form.Item>
        <Form.Item name="age" label="Age">
          <input placeholder="Age" />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <input type="text" placeholder="Email" />
        </Form.Item>
        <Form.Item name="mobile" label="Mobile">
          <input type="text" placeholder="Mobile" />
        </Form.Item>
        <Form.Item name="address" label="Address">
          <input type="text" placeholder="Address" />
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

export default AdminContact;
