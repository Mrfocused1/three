import { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import "./ExpandOnHover.css";

const workCategories = [
  {
    title: "Production",
    path: "/work/production"
  },
  {
    title: "Taking Headshots",
    path: "/work/headshots"
  },
  {
    title: "Content Creation",
    path: "/work/content-creation"
  },
  {
    title: "Events",
    path: "/work/events"
  },
];

const ExpandOnHover = () => {
  const { data, loading } = useData();
  const [expandedImage, setExpandedImage] = useState(3);

  const exploreData = data.exploreWork || {
    title: 'Explore Our Work',
    subtitle: 'Discover our portfolio across different creative services',
    images: []
  };

  // Filter out empty images
  const images = exploreData.images.filter(img => img && img.trim() !== '');

  const getImageWidth = (index) =>
    index === expandedImage ? "24rem" : "5rem";

  if (loading) {
    return (
      <div className="expand-on-hover-wrapper">
        <div className="expand-on-hover-container">
          <div className="cta-header">
            <h2 className="cta-title">{exploreData.title}</h2>
            <p className="cta-subtitle">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="expand-on-hover-wrapper">
      <div className="expand-on-hover-container">
        {/* Call to Action Header */}
        <div className="cta-header">
          <h2 className="cta-title">{exploreData.title}</h2>
          <p className="cta-subtitle">{exploreData.subtitle}</p>
        </div>

        {images.length > 0 ? (
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
                      alt={`Portfolio image ${idx + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="cta-header">
            <p className="cta-subtitle">No images yet. Add them in the admin panel.</p>
          </div>
        )}

        {/* Work Category Buttons */}
        <div className="work-buttons-container">
          {workCategories.map((category, idx) => (
            <Link
              key={idx}
              to={category.path}
              className="work-button"
            >
              {category.title}
              <span className="work-button-arrow">→</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpandOnHover;
