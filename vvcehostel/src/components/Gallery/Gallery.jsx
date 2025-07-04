import React, { useState } from 'react';
import './Gallery.css';
import {
  FaBuilding,
  FaCogs,
  FaTshirt,
  FaUtensils,
  FaDumbbell,
  FaCamera,
  FaAmbulance,
  FaMotorcycle,
  FaBed,
  FaTint,
  FaBookOpen,
} from 'react-icons/fa';
import { GiFireExtinguisher } from 'react-icons/gi';

const galleryData = {
  blueprint: [],
  lift: ['lift1.jpg'],
  laundry: ['laundry1.jpg'],
  mess: ['mess1.jpg', 'mess2.jpg', 'mess3.jpg'],
  gym: [],
  cctv: ['cctv1.jpg'],
  ambulance: [],
  twoWheeler: [],
  rooms: ['room1.jpg'],
  fire: ['fire1.jpg', 'fire2.jpg'],
  water: ['drinkingwater1.jpg', 'drinkingwater2.jpg'],
  studyhall: [],
  parking: ['parking1.jpg', 'parking2.jpg', 'parking3.jpg', 'parking4.jpg'],
};

const galleryCategories = [
  { title: 'Blueprint and Structure', icon: <FaBuilding />, folder: 'blueprint' },
  { title: 'Lift Facilities', icon: <FaCogs />, folder: 'lift' },
  { title: 'Laundry Facilities', icon: <FaTshirt />, folder: 'laundry' },
  { title: 'Mess Facilities', icon: <FaUtensils />, folder: 'mess' },
  { title: 'Gym Facilities', icon: <FaDumbbell />, folder: 'gym' },
  { title: 'CCTV Facilities', icon: <FaCamera />, folder: 'cctv' },
  { title: 'Ambulance Service', icon: <FaAmbulance />, folder: 'ambulance' },
  { title: 'Two Wheeler Parking', icon: <FaMotorcycle />, folder: 'parking' },
  { title: 'Rooms & Cleanliness', icon: <FaBed />, folder: 'rooms' },
  { title: 'Fire Extinguisher', icon: <GiFireExtinguisher />, folder: 'fire' },
  { title: 'RO Drinking Water (Hot & Cold)', icon: <FaTint />, folder: 'water' },
  { title: 'Study Hall - 3rd Floor', icon: <FaBookOpen />, folder: 'studyhall' },
];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const images = selectedCategory
    ? galleryData[selectedCategory.folder].map(
        (file) => `/gallery/${selectedCategory.folder}/${file}`
      )
    : [];

  return (
    <div className="gallery-page">
      <h2 className="gallery-title">🏞️ Hostel Gallery</h2>
      <p className="gallery-subtitle">Click on a category below to explore photos 📸</p>

      {!selectedCategory && (
        <>
          {/* 🎬 Boys Hostel YouTube Videos */}
          <h3 className="video-heading">🎥 Boys Hostel Tour</h3>
          <div className="youtube-video-grid">
            <div className="youtube-card">
              <iframe
                src="https://www.youtube.com/embed/tTVy3GziJ1U"
                title="Boys Hostel - Part 1"
                allowFullScreen
              ></iframe>
              <p className="youtube-title">Boys Hostel – Part 1</p>
            </div>
            <div className="youtube-card">
              <iframe
                src="https://www.youtube.com/embed/ZKFCiW5YTls"
                title="Boys Hostel - Part 2"
                allowFullScreen
              ></iframe>
              <p className="youtube-title">Boys Hostel – Part 2</p>
            </div>
          </div>

          {/* 👩‍🎓 Girls Hostel Videos */}
          <h3 className="video-heading">👩‍🎓 Girls Hostel Tour</h3>
          <div className="youtube-video-grid">
            <div className="youtube-card">
              <iframe
                src="https://www.youtube.com/embed/ksS0A_VKhYU"
                title="Girls Hostel Part 1"
                allowFullScreen
              ></iframe>
              <p className="youtube-title">Girls Hostel – Part 1</p>
            </div>
            <div className="youtube-card">
              <iframe
                src="https://www.youtube.com/embed/eV9K6SmEcrY"
                title="Girls Hostel Part 2"
                allowFullScreen
              ></iframe>
              <p className="youtube-title">Girls Hostel – Part 2</p>
            </div>
          </div>
        </>
      )}

      {/* 🖼️ Photo Gallery Categories */}
      {!selectedCategory ? (
        <div className="gallery-card-grid">
          {galleryCategories.map((cat, idx) => (
            <div key={idx} className="gallery-card" onClick={() => setSelectedCategory(cat)}>
              <div className="gallery-icon">{cat.icon}</div>
              <div className="gallery-label">{cat.title}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="gallery-images">
          <button className="back-btn" onClick={() => setSelectedCategory(null)}>
            ← Back
          </button>
          <h3 className="category-heading">{selectedCategory.title}</h3>
          <div className="image-grid">
            {images.length > 0 ? (
              images.map((img, idx) => (
                <img key={idx} src={img} alt={`${selectedCategory.title} ${idx + 1}`} />
              ))
            ) : (
              <p>No images available for this category.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
