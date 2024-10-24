import React, { useEffect } from "react";
import Header from "../../components/Header";
import { Tabs } from "antd";
import AdminIntro from "./AdminIntro";
import AdminAbout from "./AdminAbout";
import { useSelector } from "react-redux";
import AdminExperiences from "./AdminExperiences";
import AdminProjects from "./AdminProjects";
import AdminCourses from "./AdminCourses";
import AdminContact from "./AdminContact";

function Admin() {
  const { portofolioData } = useSelector((state) => state.root);

  const tabItems = [
    {
      key: "1",
      label: "Intro",
      children: <AdminIntro />
    },
    {
      key: "2",
      label: "About",
      children: <AdminAbout />
    },
    {
      key: "3",
      label: "Experiences",
      children: <AdminExperiences />
    },
    {
      key: "4",
      label: "Projects",
      children: <AdminProjects />
    },
    {
      key: "5",
      label: "Courses",
      children: <AdminCourses />
    },
    {
      key: "6",
      label: "Contact",
      children: <AdminContact />
    }
  ];

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/admin-login";
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="flex justify-between">
        <h1 className="text-2xl p-5 text-primary">Admin</h1>
        <h1
          className="underline text-primary text-xl px-5 curson-pointer"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/admin-login";
          }}
        >
          Logout
        </h1>
      </div>

      {portofolioData && (
        <div className="px-5 pb-10">
          <Tabs defaultActiveKey="1" items={tabItems} />
        </div>
      )}
    </div>
  );
}

export default Admin;
