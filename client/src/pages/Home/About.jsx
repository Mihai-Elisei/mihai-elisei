import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

export default function About() {
  const { loading, portofolioData } = useSelector((state) => state.root);
  const { about } = portofolioData;
  const { skills, imageUrl, description1, description2 } = about;
  return (
    <div>
      <SectionTitle title="About" />
      <div className="flex w-full items-center sm:flex-col">
        <div className="h-[70vh] w-1/2 sm:w-full sm:hidden pt-20">
          <dotlottie-player
            src={imageUrl}
            background="transparent"
            speed="1"
            loop
            autoplay
          ></dotlottie-player>
        </div>
        <div className="flex flex-col justify-center items-center gap-5 px-20 sm:px-5 sm:py-10 w-1/2 h-[70vh] sm:h-[auto] sm:w-full">
          <p className="text-white">
           {description1 || ''}
          </p>
          <p className="text-white">
            {description2 || ''}
          </p>
        </div>
      </div>
      <div className="py-5">
        <h1 className="text-tertiary text-xl mt-5">
          Here are a few technologies I've been working with recently:
        </h1>
        <div className="flex flex-wrap gap-10">
          {skills.map((skill, index) => (
            <div className="border border-tertiary py-3 px-10  rounded-md">
              <h1 className="text-tertiary">{skill}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
