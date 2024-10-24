import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, message, Modal } from "antd";
import { HideLoading, ReloadData, ShowLoading } from "../../redux/rootSlice";
import axios from "axios";

function AdminCourses() {
  const dispatch = useDispatch();
  const { portofolioData } = useSelector((state) => state.root);
  const { courses } = portofolioData || {};
  const [showAddEditModal, setShowAddEditModal] = React.useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
  const [type, setType] = React.useState("add");

  const [form] = Form.useForm(); // Create form instance

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response;
      if (selectedItemForEdit) {
        response = await axios.post("/api/portofolio/update-course", {
          ...values,
          _id: selectedItemForEdit._id
        });
      } else {
        response = await axios.post("/api/portofolio/add-course", values);
      }

      if (response.data.success) {
        message.success(response.data.message);
        setShowAddEditModal(false);
        setSelectedItemForEdit(null);
        form.resetFields(); // Reset form fields after submission
        dispatch(HideLoading());
        dispatch(ReloadData(true));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.response?.data?.message || "An error occurred");
    } finally {
      dispatch(HideLoading());
    }
  };

  const onDelete = async (item) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/portofolio/delete-course", {
        _id: item._id
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        dispatch(HideLoading());
        dispatch(ReloadData(true));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const handleOpenModal = (item = null) => {
    setSelectedItemForEdit(item);
    setType(item ? "edit" : "add");
    setShowAddEditModal(true);
  };

  const handleCancelModal = () => {
    // When cancelling the modal, reset form and state, and close modal
    setShowAddEditModal(false);
    setSelectedItemForEdit(null);
    form.resetFields(); // Reset the form fields to avoid keeping the previous data
  };

  // Reset form fields and set new values when modal opens
  useEffect(() => {
    if (showAddEditModal) {
      if (selectedItemForEdit) {
        form.setFieldsValue(selectedItemForEdit);
      } else {
        form.resetFields(); // Reset form for 'add' mode
      }
    }
  }, [selectedItemForEdit, showAddEditModal, form]);

  return (
    <div>
      <div className="flex justify-end">
        <button
          className="bg-primary px-5 py-2 text-white"
          onClick={() => handleOpenModal()}
        >
          Add Course
        </button>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-1 gap-5 mt-5 ">
        {courses &&
          courses.map((course, index) => (
            <div
              key={index}
              className="shadow border border-gray-400 p-5 rounded-md"
            >
              <h1 className="text-primary py-2 text-xl font-bold">
                {course.title}
              </h1>
              <hr />
              <img src={course.image} className="h-60 w-80" alt="Image" />
              <h1 className="py-2">Course Title: {course.title}</h1>
              <h1 className="py-2">Description: {course.description}</h1>
              <h1 className="py-2">Course Link: {course.link}</h1>

              <div className="flex justify-end gap-5 pt-5">
                <button
                  className="bg-primary text-white px-5 py-2 rounded-sm"
                  onClick={() => handleOpenModal(course)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-700 text-white px-5 py-2 rounded-sm"
                  onClick={() => {
                    onDelete(course);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
      <Modal
        open={showAddEditModal}
        title={selectedItemForEdit ? "Edit Course" : "Add Course"}
        footer={null}
        onCancel={handleCancelModal} // Use the custom cancel handler
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
         
          form={form} // Attach form instance to Form component
        >
          <Form.Item
            name="title"
            label="title"
            rules={[{ required: true, message: "Please enter the title" }]}
          >
            <input type="text" placeholder="Title" />
          </Form.Item>
          <Form.Item
            name="image"
            label="Image URL"
            rules={[{ required: true, message: "Please enter the image URL" }]}
          >
            <input type="text" placeholder="Image URL" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please enter the Description" }
            ]}
          >
            <textarea type="text" placeholder="Description" />
          </Form.Item>

          <Form.Item
            name="link"
            label="Course Link"
            rules={[
              { required: true, message: "Please enter the Course Link" }
            ]}
          >
            <input type="text" placeholder="Course Link" />
          </Form.Item>
          <div className="flex justify-end">
            <button
              className="border-primary text-primary px-5 py-2"
              onClick={handleCancelModal} // Use the cancel handler to close modal
            >
              Cancel
            </button>
            <button className="bg-primary text-white px-5 py-2" type="submit">
              {selectedItemForEdit ? "Update" : "Add"}
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminCourses;
