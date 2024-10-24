import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, message, Modal } from "antd";
import { HideLoading, ReloadData, ShowLoading } from "../../redux/rootSlice";
import axios from "axios";

function AdminProjects() {
  const dispatch = useDispatch();
  const { portofolioData } = useSelector((state) => state.root);
  const { projects } = portofolioData || {};
  const [showAddEditModal, setShowAddEditModal] = React.useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
  const [type, setType] = React.useState("add");

  const [form] = Form.useForm(); // Create form instance

  const onFinish = async (values) => {
    try {
      const tempTechnologies = values.technologies.split(",");
      values.technologies = tempTechnologies;
      const tempSkills = values.skills?.split(",");
      values.skills = tempSkills;
      dispatch(ShowLoading());
      let response;
      if (selectedItemForEdit) {
        response = await axios.post("/api/portofolio/update-project", {
          ...values,
          _id: selectedItemForEdit._id
        });
      } else {
        response = await axios.post("/api/portofolio/add-project", values);
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
      const response = await axios.post("/api/portofolio/delete-project", {
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
          Add Project
        </button>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-1 gap-5 mt-5 ">
        {projects &&
          projects.map((project, index) => (
            <div
              key={index}
              className="shadow border border-gray-400 p-5 rounded-md"
            >
              <h1 className="text-primary py-2 text-xl font-bold">
                {project.title}
              </h1>
              <hr />
              <img src={project.image} className="h-60 w-80" alt="Image" />
              <h1 className="py-2">Project Title: {project.title}</h1>
              <h1 className="py-2">Technologies: {project.technologies}</h1>
              <h1 className="py-2">Description: {project.description}</h1>
              <h1 className="py-2">Project Link: {project.link}</h1>
              
              <div className="flex justify-end gap-5 pt-5">
                <button
                  className="bg-primary text-white px-5 py-2 rounded-sm"
                  onClick={() => handleOpenModal(project)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-700 text-white px-5 py-2 rounded-sm"
                  onClick={() => {
                    onDelete(project);
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
        title={selectedItemForEdit ? "Edit Project" : "Add Project"}
        footer={null}
        onCancel={handleCancelModal} // Use the custom cancel handler
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            ...selectedItemForEdit,
            technologies: selectedItemForEdit?.technologies?.join(" , ")
          }}
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
            name="technologies"
            label="Technologies"
            rules={[
              { required: true, message: "Please enter the technologies" }
            ]}
          >
            <input type="text" placeholder="Technologies" />
          </Form.Item>
          <Form.Item
            name="link"
            label="Project Link"
            rules={[
              { required: true, message: "Please enter the Project Link" }
            ]}
          >
            <input type="text" placeholder="Project Link" />
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

export default AdminProjects;
