import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

export default function Projects() {
  const [selectedItem, setSelectedItem] = React.useState(0);
  const { portofolioData } = useSelector((state) => state.root);
  const { projects } = portofolioData;

  return (
    <div>
      <SectionTitle title="Projects" />
      <div className="flex py-10 gap-10 sm:flex-col">
        {/* Project Titles Section */}
        <div className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full">
          {projects.map((project, index) => (
            <div
              key={index}
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
                {project.title}
              </h1>
            </div>
          ))}
        </div>

        {/* Project Details Section */}
        <div className="flex items-center justify-center gap-10 sm:flex-col">
          <img
            src={projects[selectedItem].image}
            alt="Project"
            className="h-60 w-72"
          />
          <div className="flex flex-col gap-5">
            <h1 className="text-secondary text-xl">
              {projects[selectedItem].title}
            </h1>

            <p className="text-tertiary text-xl">
              {projects[selectedItem].description}
            </p>
            <p className="text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
              quaerat, necessitatibus libero fugit velit dolores voluptatum est
              cumque, autem id, voluptas consectetur eveniet obcaecati mollitia
              ad possimus itaque accusantium dolorem.
            </p>
          </div>
        </div>
      </div>

      {/* Technologies Section */}
      <div className="flex flex-wrap gap-10">
        {projects[selectedItem]?.technologies?.map((technology, index) => (
          <div key={index} className="border border-tertiary py-3 px-10 rounded-md">
            <h1 className="text-tertiary">{technology}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}
