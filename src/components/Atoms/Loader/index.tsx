import React from "react";

const Loader = () => {
  return (
    <div className="grid place-content-center h-screen">
      <div className="flex flex-col items-center">
        <span className="loading loading-bars loading-lg" />
        <h1 className="text-center">Loading...</h1>
      </div>
    </div>
  );
};

export default Loader;
