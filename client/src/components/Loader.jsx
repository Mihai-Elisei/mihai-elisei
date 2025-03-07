import React from "react";

function Loader() {
  return (
    <div className="h-screen flex items-center justify-center fixed inset-0 bg-primary z-[100]">
      <div className="flex gap-5 text-6xl sm:text-3xl font-semibold">
        <h1 className="text-secondary emh">EMH</h1>
        <h1 className="text-white e">E</h1>
        <h1 className="text-tertiary m">M</h1>
      </div>
    </div>
  );
}

export default Loader;
