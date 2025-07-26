import React from "react";
import Home from "./components/Home";

const Page = () => {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(at 27% 54%, #ebf0f6 0px, transparent 50%), radial-gradient(at 37% 42%, #98ccd3 0px, transparent 50%), radial-gradient(at 82% 100%, #364e68 0px, transparent 50%), radial-gradient(at 94% 10%, #132238 0px, transparent 50%), #ebf0f6",
      }}
    >
      <Home />
    </div>
  );
};

export default Page;
