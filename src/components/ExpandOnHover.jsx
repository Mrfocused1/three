import { useState } from "react";
import "./ExpandOnHover.css";

const images = [
  "https://pbs.twimg.com/media/G6dpB9JaAAA2wDS?format=png&name=360x360",
  "https://pbs.twimg.com/media/G6dpEiebIAEHrOS?format=jpg&name=360x360",
  "https://pbs.twimg.com/media/G6dpGJZbsAEg1tp?format=png&name=360x360",
  "https://pbs.twimg.com/media/G6dpHzVbkAERJI3?format=png&name=360x360",
  "https://pbs.twimg.com/media/G6dpKpcbgAAj7ce?format=png&name=360x360",
  "https://pbs.twimg.com/media/G6dpNYzawAAniIt?format=png&name=360x360",
  "https://pbs.twimg.com/media/G6dpPilbcAAH3jU?format=jpg&name=360x360",
  "https://pbs.twimg.com/media/G6dpRFBbsAEvquO?format=jpg&name=360x360",
  "https://pbs.twimg.com/media/G6dpUL-aUAAUqGZ?format=png&name=small",
];

const ExpandOnHover = () => {
  const [expandedImage, setExpandedImage] = useState(3);

  const getImageWidth = (index) =>
    index === expandedImage ? "24rem" : "5rem";

  return (
    <div className="expand-on-hover-wrapper">
      <div className="expand-on-hover-container">
        <div className="expand-on-hover-inner">
          <div className="expand-on-hover-content">
            <div className="expand-on-hover-images">
              {images.map((src, idx) => (
                <div
                  key={idx}
                  className="expand-on-hover-image-wrapper"
                  style={{
                    width: getImageWidth(idx + 1),
                    height: "24rem",
                  }}
                  onMouseEnter={() => setExpandedImage(idx + 1)}
                >
                  <img
                    className="expand-on-hover-image"
                    src={src}
                    alt={`Image ${idx + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandOnHover;
