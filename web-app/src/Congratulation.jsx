import React from "react";
import { Modal } from "antd";

const showCongratulation = (title, selectedCandidate, handleStopFiring) => {
  Modal.success({
    content: (
      <h2>
        Congratulations to{" "}
        <span style={{ fontWeight: "bold", color: "red" }}>
          {selectedCandidate}
        </span>
      </h2>
    ),
    icon: (
      <h1>
        <img alt="" src="https://img.icons8.com/bubbles/100/000000/prize.png" />
        &ensp;
        {title}
      </h1>
    ),
    onOk: () => handleStopFiring(selectedCandidate),
    width: 600,
  });
};

export default showCongratulation;
