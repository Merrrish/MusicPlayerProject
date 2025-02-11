import React, { useState, useEffect, useRef } from "react";

const Card = ({ image, audioUrl, volume, isActive, handlePlay, time, onTimeUpdate }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (isActive) {
      setIsPlaying(true);
      audioRef.current.play();
    } else {
      setIsPlaying(false);
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  }, [isActive]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateProgress = () => {
        if (!isDragging) {
          setCurrentTime(audio.currentTime);
          onTimeUpdate(audio.currentTime);
        }
      };

      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
      };

      audio.addEventListener("timeupdate", updateProgress);
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
        audio.removeEventListener("timeupdate", updateProgress);
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };
    }
  }, [isDragging, onTimeUpdate]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      handlePlay(audioUrl);
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    updateCurrentTime(e);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      updateCurrentTime(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updateCurrentTime = (e) => {
    const progressBar = progressBarRef.current.getBoundingClientRect();
    const clickPosition = e.clientX - progressBar.left;
    const newTime = (clickPosition / progressBar.width) * duration;

    if (!isNaN(newTime) && newTime >= 0 && newTime <= duration) {
      setCurrentTime(newTime);
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="relative bg-cardbg rounded-xl shadow-lg w-64 h-auto sm:w-80 overflow-hidden">
      {/* Контейнер с обложкой */}
      <div className="w-full h-48 sm:h-64 overflow-hidden">
        <img
          src={image}
          alt="Cover"
          className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out hover:scale-110"
        />
      </div>

      <div className="bg-card py-4 px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <button
            onClick={togglePlay}
            className="bg-cbg rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-white shadow-md"
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>

          <div
            className="flex-1 mx-4 relative cursor-pointer"
            ref={progressBarRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-purple-500"
                style={{
                  width: `${(currentTime / duration) * 100}%`,
                }}
              ></div>
              <div
                className="absolute top-1/2 w-4 h-4 bg-purple-700 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${(currentTime / duration) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          <span className="text-cardbg text-xs sm:text-sm font-semibold">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
      </div>
      <audio ref={audioRef} src={audioUrl} />
    </div>
  );
};

export default Card;
