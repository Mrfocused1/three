import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ExpandOnHover.css";

const PEXELS_API_KEY = '8sLoMXg5fX4DKdmX8sSFxebcYNbdcwU6VizqTp4YRdrJ7a3MVlwc9qpp';

const workCategories = [
  {
    title: "Production",
    path: "/work/production",
    query: "video production studio"
  },
  {
    title: "Taking Headshots",
    path: "/work/headshots",
    query: "professional headshot portrait"
  },
  {
    title: "Content Creation",
    path: "/work/content-creation",
    query: "social media content creator"
  },
  {
    title: "Events",
    path: "/work/events",
    query: "event photography concert"
  },
];

const ExpandOnHover = () => {
  const [expandedImage, setExpandedImage] = useState(3);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Fetch 3 images from each category (3 x 4 = 12 total, we'll use 9)
        const allImages = [];

        for (const category of workCategories) {
          const response = await fetch(
            `https://api.pexels.com/v1/search?query=${encodeURIComponent(category.query)}&per_page=3`,
            {
              headers: {
                Authorization: PEXELS_API_KEY
              }
            }
          );
          const data = await response.json();

          if (data.photos && data.photos.length > 0) {
            allImages.push(...data.photos.map(photo => photo.src.large));
          }
        }

        // Take first 9 images
        setImages(allImages.slice(0, 9));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching images from Pexels:', error);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const getImageWidth = (index) =>
    index === expandedImage ? "24rem" : "5rem";

  if (loading) {
    return (
      <div className="expand-on-hover-wrapper">
        <div className="expand-on-hover-container">
          <div className="cta-header">
            <h2 className="cta-title">Explore Our Work</h2>
            <p className="cta-subtitle">Loading our portfolio...</p>
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
          <h2 className="cta-title">Explore Our Work</h2>
          <p className="cta-subtitle">Discover our portfolio across different creative services</p>
        </div>

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
