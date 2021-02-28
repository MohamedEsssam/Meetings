import React, { useEffect, useState } from "react";

const AppTextToImage = React.memo(
  ({ representative, unit, destination, notes }) => {
    const [img, setImg] = useState("");

    useEffect(() => {
      let canvas = document.getElementById("canvasComponent");
      let canvasTxt = canvas.getContext("2d");
      let maxWith = canvas.width;
      canvasTxt.font = "20px Georgia";
      canvasTxt.textAlign = "end";
      canvasTxt.fillText(
        `${representative["label"]} : ${representative["text"]}*`,
        representative["x"],
        representative["y"],
        maxWith -
          `${representative["label"]} : ${representative["text"]}*`.length
      );
      canvasTxt.fillText(
        `${unit["label"]} : ${unit["text"]}*`,
        unit["x"],
        unit["y"],
        maxWith - `${unit["label"]} : ${unit["text"]}*`.length
      );
      canvasTxt.fillText(
        `${destination["label"]} : ${destination["text"]}*`,
        destination["x"],
        destination["y"],
        maxWith - `${destination["label"]} : ${destination["text"]}*`.length
      );
      canvasTxt.fillText(
        `${notes["label"]} : ${notes["text"]}*`,
        notes["x"],
        notes["y"],
        maxWith - `${notes["label"]} : ${notes["text"]}*`.length
      );
      setImg(canvasTxt.canvas.toDataURL());
    }, []);

    return (
      <div
        style={{
          float: "right",
          direction: "ltr",
          width: "auto",
          paddingLeft: "20px",
        }}
      >
        <canvas
          id="canvasComponent"
          style={{
            display: "none",
            float: "right",
            direction: "ltr",
            width: "auto",
          }}
          width="auto"
          height="auto"
        />
        {img && (
          <img
            id="imageComponent"
            src={img}
            style={{
              border: "1px solid #d3d3d3",
              float: "right",
              direction: "ltr",
              width: "auto",
            }}
          />
        )}
      </div>
    );
  }
);

export default AppTextToImage;
