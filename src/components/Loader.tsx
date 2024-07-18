import React from "react";
import Image from "next/image";


const Loader: React.FC = () => {
  return (
    <div className="flex bg-background-primary justify-center items-center h-screen">
      <div className="animate-bounce">
        <img src="/images/loader-buho.png" alt="Owl Shadow" width={200} />
      </div>
    </div>
  );
};

export default Loader;
