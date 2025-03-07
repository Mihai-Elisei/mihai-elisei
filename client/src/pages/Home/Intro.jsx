import React from "react";
import { useSelector } from "react-redux";

export default function Intro() {
  const { loading, portofolioData } = useSelector((state) => state.root);
  const { intro } = portofolioData;
  const { firstName, lastName, welcomeText, description, caption } = intro;
  return (
    <div className="h-[80vh] bg-primary flex flex-col items-start justify-center gap-8 py-10">
      <h1 className="text-white">{welcomeText || ""}</h1>
      <h1 className="text-7xl sm:text-3xl text-secondary font-semibold">
        {firstName || ""} {lastName || ""}
      </h1>
      <h1 className="text-6xl sm:text-3xl text-white font-semibold">
        {caption || ''}
      </h1>
      <p className="text-white w-2/3">
        {description || ''}
      </p>
      <button className="border-2 border-tertiary text-tertiary px-10 py-3 rounded">
        Get Started
      </button>
    </div>
  );
}
