

// src/pages/GalleryPage.js
import React from 'react';
import { FaCamera } from 'react-icons/fa';

// Import your images from the assets folder
import img1 from '../assets/images/1.jpg';
import img2 from '../assets/images/2.jpg';
import img3 from '../assets/images/3.jpg';
import img4 from '../assets/images/4.jpg';
import img5 from '../assets/images/5.jpg';
import img6 from '../assets/images/6.jpg';
import img7 from '../assets/images/7.jpg';
// Continue importing all 56 images...

const GalleryPage = () => {
  // Manually defined gallery images array using imported images
  const galleryImages = [
    {
      id: 1,
      src: img1,
      alt: "Likando Kayombo",
      title: "Monday day 1",
      description: "one of the participants taking notes"
    },
    {
      id: 2,
      src: img2,
      alt: "nice foods",
      title: "fancy foods",
      description: "food on the plate"
    },
    {
      id: 3,
      src: img3,
      alt: "fancy foods",
      title: "fancy foods",
      description: "food on the plate"
    },
    // Continue adding entries like this for all 56 images
    {
      id: 4,
      src: img4,
      alt: "Cecelia",
      title: "Formas Training facilitator Cecilia",
      description: "Cecilia taking a group photo after a successful training on Tuesday in May"
    },
    // Add the remaining images here...
     {
      id: 5,
      src: img5,
      alt: "Night sky",
      title: "Formas Research team outside for group photo",
      description: "A group phot of formas reserch entire on Wednesday after a cnclusion a 3 day workshop"
    },
      {
      id: 6,
      src: img6,
      alt: "Group photo",
      title: "A team of formas research assistants",
      description: "a photo of the entire formas research assistants team after an egaging successful meeting"
    },
        {
      id: 7,
      src: img7,
      alt: "Cecelia",
      title: "Formas Training facilitator Cecilia",
      description: "Cecilia taking a group photo after a successful training on Tuesday in May"
    },

  ];
  
  return (
    <div className="max-w-6xl mx-auto pt-16 pb-12">
      <div className="text-center mb-10">
        <FaCamera className="text-6xl mx-auto mb-4 text-blue-500" />
        <h1 className="text-4xl font-bold">Photo Gallery</h1>
        <p className="text-gray-600 mt-2">Beautiful memories</p>
      </div>

      {/* Image Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {galleryImages.map((image) => (
          <div
            key={image.id}
            className="overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl bg-white"
          >
            {/* Image container with fixed aspect ratio */}
            <div className="relative pt-[75%]"> {/* 4:3 aspect ratio */}
              <img
                src={image.src}
                alt={image.alt}
                className="absolute top-0 left-0 w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">{image.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{image.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;

