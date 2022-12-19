import React, { useState } from "react";
import NestedModal from "./App";

const Example = () => {
  const [currentOpenedModal, setCurrentOpenedModal] = useState("first-modal");

  return (
    <NestedModal
      currentOpenedModal={currentOpenedModal}
      setCurrentOpenedModal={setCurrentOpenedModal}
      onClose={() => {}}
    >
      <div id="first-modal">
        First modal content
        <button onClick={() => setCurrentOpenedModal("second-modal")}>
          {" "}
          Open Second Modal
        </button>
      </div>
      <div id="second-modal">
        <button onClick={() => setCurrentOpenedModal("third-modal")}>
          {" "}
          Open Second Modal
        </button>
      </div>
      <div id="third-modal"></div>
    </NestedModal>
  );
};

export default Example;
