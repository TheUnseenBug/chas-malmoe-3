import useAccessStore from "@/store/store";
import React from "react";

const Reset = () => {
  const addAccessToken = useAccessStore((state) => state.addAccessToken);
  return (
    <div>
      <button onClick={() => addAccessToken(null)}>reset</button>
    </div>
  );
};

export default Reset;
