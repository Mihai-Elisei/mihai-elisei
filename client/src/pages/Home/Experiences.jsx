import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

export default function Experiences() {
  const [selectedItem, setSelectedItem] = React.useState(0)
  const { portofolioData } = useSelector((state) => state.root);
  const { experiences } = portofolioData;
 
  return (
    <div>
      <SectionTitle title="Experience" />
      <div className="flex py-10 gap-10 sm:flex-col">
        <div className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full">
          {experiences.map((experience, index) => (
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
                {experience.period}
              </h1>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="text-secondary text-xl">
            {experiences[selectedItem].title}
          </h1>
          <h1 className="text-tertiary text-xl">
            {experiences[selectedItem].company}
          </h1>
          <p className="text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            quaerat, necessitatibus libero fugit velit dolores voluptatum est
            cumque, autem id, voluptas consectetur eveniet obcaecati mollitia ad
            possimus itaque accusantium dolorem.
          </p>
        </div>
      </div>
    </div>
  );
}
