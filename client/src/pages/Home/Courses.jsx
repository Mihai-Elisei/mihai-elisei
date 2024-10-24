import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

export default function Courses() {
  const [selectedItem, setSelectedItem] = React.useState(0);

  const { portofolioData } = useSelector((state) => state.root);
  const { courses } = portofolioData;
  return (
    <div>
      <SectionTitle title="Courses" />
      <div className="flex py-10 gap-10 sm:flex-col">
        <div className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full">
          {courses.map((course, index) => (
            <div
              className="p-5 cursor-pointer"
              onClick={() => {
                setSelectedItem(index);
              }}
            >
              <h1
                className={`text-xl px-5 ${
                  selectedItem === index
                    ? "text-tertiary border-tertiary border-l-4 -ml-[23px] bg-[#1a7f5a23] py-3 sm:w-full"
                    : "text-white"
                }`}
              >
                {course.title}
              </h1>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-10 sm:flex-col">
          <div className="flex flex-col gap-5">
            <h1 className="text-secondary text-xl">
              {courses[selectedItem].title}
            </h1>
            <a href={courses[selectedItem].link}></a>
          </div>
          <img
            src={courses[selectedItem].image}
            alt="image"
            className="h-52 w-80"
          />
        </div>
      </div>
    </div>
  );
}
