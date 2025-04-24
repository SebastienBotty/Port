import React from "react";
import "../scss/tooltip.scss";

function Tooltip({ text }: { text: string }) {
  return <div className="tooltip">{text}</div>;
}

export default Tooltip;
