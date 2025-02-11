import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub } from 'react-icons/fa';  // Importing the GitHub icon from React Icons
import Card from "./components/Card";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [songs, setSongs] = useState([]);
  const [volume, setVolume] = useState(50);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch("musicplayerproject-production-4db2.up.railway.app")
      .then((response) => response.json())
      .then((data) => {
        setSongs(data);
      })
      .catch((error) => console.error("Ошибка при загрузке песен:", error));
  }, []);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < songs.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
  };

  const handlePlay = (audioUrl) => {
    if (audioUrl !== currentSong) {
      setCurrentSong(audioUrl);
      setCurrentTime(0); // Сбрасываем таймер для новой песни
    }
  };

  const handleTimeUpdate = (time) => {
    setCurrentTime(time);
  };

  const getLyricsForCurrentTime = () => {
    const playingSong = songs.find((song) => song.audioUrl === currentSong);

    if (!playingSong || !Array.isArray(playingSong.lyricsWithTiming)) {
      return "";
    }

    // Найти последнюю строку лирики, которая соответствует текущему времени
    const currentLine = playingSong.lyricsWithTiming.find(
      (line, index, array) =>
        line.time <= currentTime &&
        (index === array.length - 1 || array[index + 1].time > currentTime)
    );

    return currentLine ? currentLine.text : "";
  };

  return (
    <div className="flex flex-col items-center bg-cbg text-white p-6 sm:p-8 min-h-screen">
      {/* Добавление значка GitHub, теперь над заголовком */}
      <div className="flex justify-center mb-3"> {/* Уменьшаем отступ между иконкой и заголовком */}
        <a
          href="https://github.com/your-username" // Замените на ваш GitHub URL
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-prpl transition duration-300"
        >
          <FaGithub className="h-8 w-8" /> {/* Увеличиваем размер иконки */}
        </a>
      </div>

      {/* Заголовок */}
      <div className="text-center mb-6 sm:mb-10">
        <motion.h1
          className="font-customC text-2xl sm:text-3xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          Listen to the best songs
        </motion.h1>
        <motion.p
          className="font-customB text-card bg-prpl px-3 py-1.5 w-24 sm:w-32 mx-auto"
          initial={{ opacity: 0, y: 20 }} // Начинает немного ниже
          animate={{ opacity: 1, y: 0 }} // Поднимается на своё место
          transition={{ duration: 0.4, delay: 0.2 }} // Анимация появления
        >
          in the World
        </motion.p>
      </div>

      {/* Карточки и кнопки */}
      <div className="relative w-full max-w-4xl flex items-center justify-center overflow-hidden h-[300px] sm:h-[350px]">
        <button
          onClick={handlePrev}
          className={`absolute left-0 rounded-full p-4 z-30 flex items-center justify-center transition-colors duration-300 ${
            currentIndex === 0 ? "bg-gray-500 cursor-not-allowed" : "bg-prpl hover:bg-prpld"
          }`}
          disabled={currentIndex === 0}
          style={{ width: "50px", height: "50px" }} // Круглая кнопка
        >
          ◀
        </button>

        <div className="flex items-center justify-center relative w-full">
          {songs.length > 0 &&
            songs.map((song, index) => {
              const isCurrent = index === currentIndex;
              const isPrev = index === (currentIndex - 1 + songs.length) % songs.length;
              const isNext = index === (currentIndex + 1) % songs.length;

              let opacity = 1;
              if (index < currentIndex - 1 || index > currentIndex + 1) {
                opacity = 0;
              } else if (index !== currentIndex) {
                opacity = Math.max(0.2, 1 - Math.abs(currentIndex - index) * 0.4);
              }

              return (
                <div
                  key={index}
                  className={`absolute transition-all duration-500 ease-in-out transform ${
                    isCurrent ? "scale-100 z-20 opacity-100" : "scale-75"
                  } ${isPrev ? "-translate-x-3/4" : ""} ${isNext ? "translate-x-3/4" : ""}`}
                  style={{
                    opacity,
                  }}
                >
                  <Card
                    image={song.imageUrl}
                    time={song.duration}
                    audioUrl={song.audioUrl}
                    volume={volume}
                    isActive={song.audioUrl === currentSong}
                    handlePlay={() => handlePlay(song.audioUrl)}
                    onTimeUpdate={handleTimeUpdate} // Передаем callback
                  />
                </div>
              );
            })}
        </div>

        <button
          onClick={handleNext}
          className={`absolute right-0 rounded-full p-4 z-30 flex items-center justify-center transition-colors duration-300 ${
            currentIndex === songs.length - 1 ? "bg-gray-500 cursor-not-allowed" : "bg-prpl hover:bg-prpld"
          }`}
          disabled={currentIndex === songs.length - 1}
          style={{ width: "50px", height: "50px" }} // Круглая кнопка
        >
          ▶
        </button>
      </div>

      {/* Текст внизу экрана */}
      <div className="mt-4 sm:mt-8 text-center w-64 sm:w-80"> {/* Уменьшаем отступы для уменьшения расстояния */}
        <motion.div
          key={songs[currentIndex]?.title}
          className="font-customCB text-white text-xl sm:text-2xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {songs[currentIndex]?.title || ""}
        </motion.div>

        <motion.div
          key={`${currentIndex}-artist`}
          className="font-customB text-gray-400 text-lg sm:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {songs[currentIndex]?.artist || ""}
        </motion.div>

        <div className="mt-2 relative w-64 sm:w-80"> {/* Уменьшаем отступ между ползунком и текстами */}
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full h-2 bg-gray-300 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #8b5cf6 ${volume}%, #d1d5db ${volume}%)`,
            }}
          />
          <div className="font-customB text-medium text-gray-400 mt-1">{volume}%</div>

          {/* Стили для ползунка */}
          <style jsx>{`
            input[type="range"]::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 24px;
              height: 24px;
              border-radius: 50%;
              background-color: #4915ea; /* Цвет кружочка */
              cursor: pointer;
              box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
            }

            input[type="range"]::-moz-range-thumb {
              width: 24px;
              height: 24px;
              border-radius: 50%;
              background-color: #4915ea; /* Цвет кружочка для Firefox */
              cursor: pointer;
              box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
            }
          `}</style>
        </div>

        {/* Отображение текущей строки текста песни */}
        <div className="lyrics-container mt-3 sm:mt-4 text-center"> {/* Уменьшаем отступ между ползунком и текстом */}
          <motion.div
            key={getLyricsForCurrentTime()} // Обновляем ключ для анимации
            className="font-customB text-white text-xl sm:text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {getLyricsForCurrentTime()}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default App;
