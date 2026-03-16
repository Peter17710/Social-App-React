import React from "react";
import { RingLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="h-screen flex justify-center items-center">
      <RingLoader color="#4459fc" size={100} />
    </div>
  );
}
