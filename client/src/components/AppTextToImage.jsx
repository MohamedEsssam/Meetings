import React, { useEffect, useState } from "react";

const AppTextToImage = ({ name, x, y }) => {
  const [img, setImg] = useState("");

  useEffect(() => {
    let canvasTxt = document.getElementById("canvasComponent").getContext("2d");
    canvasTxt.font = "20px Georgia";
    canvasTxt.fillText(name, x, y);
    setImg(canvasTxt.canvas.toDataURL());
  }, []);

  return (
    <div>
      <canvas id="canvasComponent" style={{ border: "1px solid #d3d3d3" }} />
      {img.length > 0 ? <img id="imageComponent" src={img} /> : null}
    </div>
  );
};

export default AppTextToImage;
