import React, { useState, useRef, useEffect } from 'react';
import { FaMicrophone, FaPlay, FaPause, FaVolumeUp } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import formasAudio from '../assets/formas.mp3';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const AudioPage = () => {
  // Single audio file data
  const audio = {
    id: 1,
    title: "Fromas Presentation",
    description: "Closing presentaion at the formas training",
    duration: "9:04",
    file: "/assets/formas.mp3",
    tags: ["Keynote", "closing"]
  };

  // State hooks
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [progress, setProgress] = useState(0);
  
  // Refs for GSAP animations
  const headerRef = useRef(null);
  const playerRef = useRef(null);
  const contentRef = useRef(null);
  const progressBarRef = useRef(null);
  const playButtonRef = useRef(null);
  
  // Audio element reference
  const audioRef = useRef(null);

  // Initialize GSAP animations
  useEffect(() => {
    // Set initial positions for animation
    gsap.set([headerRef.current, playerRef.current, contentRef.current], {
      opacity: 0,
      y: 50
    });
    
    // Header animation
    gsap.to(headerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.3
    });
    
    // Player animation
    gsap.to(playerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.6
    });
    
    // Content animation with scroll trigger
    gsap.to(contentRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
    
    // Progress bar animation
    gsap.set(progressBarRef.current, { scaleX: 0 });
    gsap.to(progressBarRef.current, {
      scaleX: 1,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: playerRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
    
    // Play button animation
    gsap.set(playButtonRef.current, { scale: 0 });
    gsap.to(playButtonRef.current, {
      scale: 1,
      duration: 0.6,
      ease: "back.out(1.7)",
      delay: 1
    });
    
    // Microphone icon animation
    const micIcon = document.querySelector('.microphone-icon');
    if (micIcon) {
      gsap.to(micIcon, {
        rotation: 360,
        duration: 2,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: micIcon,
          start: "top bottom",
          toggleActions: "play none none none"
        }
      });
    }
    
    // Cleanup animations on unmount
    return () => {
      gsap.killTweensOf([
        headerRef.current, 
        playerRef.current, 
        contentRef.current,
        progressBarRef.current,
        playButtonRef.current
      ]);
    };
  }, []);

  // Handle play/pause with animation
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      // Pause animation
      gsap.to(playButtonRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "back.out"
      });
    } else {
      audioRef.current.play();
      // Play animation - pulse effect
      gsap.to(playButtonRef.current, {
        scale: 1.1,
        duration: 0.5,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut"
      });
    }
    setIsPlaying(!isPlaying);
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    
    // Volume animation
    gsap.to('.volume-icon', {
      scale: 1.3,
      color: '#3b82f6',
      duration: 0.2,
      yoyo: true,
      repeat: 1
    });
  };

  // Update progress bar as audio plays
  const handleTimeUpdate = () => {
    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    const newProgress = (currentTime / duration) * 100 || 0;
    setProgress(newProgress);
    
    // Progress bar animation
    gsap.to(progressBarRef.current, {
      scaleX: newProgress / 100,
      duration: 0.2,
      ease: "power1.out"
    });
  };

  // Handle progress bar click (seek)
  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.clientWidth;
    const seekTime = (clickPosition / progressBarWidth) * audioRef.current.duration;
    
    audioRef.current.currentTime = seekTime;
    const newProgress = (seekTime / audioRef.current.duration) * 100;
    setProgress(newProgress);
    
    // Seek animation
    gsap.to(progressBarRef.current, {
      scaleX: newProgress / 100,
      duration: 0.3,
      ease: "power2.out"
    });
    
    // Pulse effect on progress bar
    gsap.to(progressBarRef.current, {
      backgroundColor: '#93c5fd',
      duration: 0.2,
      yoyo: true,
      repeat: 1
    });
  };

  return (
    <div className="max-w-4xl mx-auto pt-16 pb-12 px-4">
      <div ref={headerRef} className="text-center mb-10">
        <FaMicrophone className="microphone-icon text-6xl mx-auto mb-4 text-blue-500" />
        <h1 className="text-4xl font-bold">Audio Presentation</h1>
      </div>

      {/* Audio Player */}
      <div ref={playerRef} className="bg-white rounded-xl shadow-lg p-6 mb-12 transform transition-all duration-300 hover:shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">{audio.title}</h2>
          <div className="flex items-center space-x-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm transform transition-transform duration-300 hover:scale-105">
              MP3
            </span>
            <span className="text-gray-500">{audio.duration}</span>
          </div>
        </div>
        
        {/* Hidden audio element */}
        <audio
          ref={audioRef}
          src={formasAudio}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => {
            setIsPlaying(false);
            gsap.to(playButtonRef.current, { scale: 1 });
          }}
          onLoadedMetadata={() => setProgress(0)}
        />
        
        {/* Progress Bar */}
        <div 
          className="h-2 bg-gray-200 rounded-full mb-4 cursor-pointer overflow-hidden"
          onClick={handleProgressClick}
        >
          <div 
            ref={progressBarRef}
            className="h-full bg-blue-500 rounded-full origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
        
        {/* Controls */}
        <div className="flex items-center justify-between">
          <button
            ref={playButtonRef}
            onClick={togglePlay}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 transition-colors shadow-lg"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <FaPause /> : <FaPlay className="ml-1" />}
          </button>
          
          <div className="flex items-center space-x-2 w-1/3">
            <FaVolumeUp className="volume-icon text-gray-500" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer volume-slider"
            />
          </div>
          
          <div className="text-right">
            <a 
              href={audio.file} 
              download
              className="text-blue-500 hover:text-blue-700 font-medium transform transition-transform duration-300 hover:scale-105"
            >
              Download Audio
            </a>
          </div>
        </div>
      </div>

      {/* Additional Content Section */}
      <div ref={contentRef} className="bg-gray-50 rounded-xl p-6 transform transition-all duration-300 hover:shadow-md">
        <h3 className="text-xl font-semibold mb-4">About This Recording</h3>
        <p className="text-gray-700 mb-4">
          {audio.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {audio.tags.map(tag => (
            <span 
              key={tag} 
              className="bg-gray-200 px-3 py-1 rounded-full text-sm transform transition-transform duration-300 hover:scale-105"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AudioPage;