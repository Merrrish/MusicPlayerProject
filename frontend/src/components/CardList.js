import React, { useEffect, useState } from 'react';

const CardList = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true); // Состояние загрузки

  useEffect(() => {
    fetch("https://musicplayerproject-production-4db2.up.railway.app/api/songs")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Сервер вернул ошибку: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        setSongs(data);
      })
      .catch((error) => console.error("Ошибка при загрузке песен:", error));
  }, []);
  

  if (loading) {
    return <div>Loading...</div>; // Можно заменить на компонент загрузки
  }

  return (
    <div>
      <h2>Song List</h2>
      {songs.length > 0 ? (
        songs.map((song) => (
          <div key={song.id} className="song-card">
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
            {song.imageUrl && <img src={song.imageUrl} alt={song.title} />}
            {song.audioUrl && (
              <audio controls>
                <source src={song.audioUrl} type="audio/mp3" />
              </audio>
            )}
          </div>
        ))
      ) : (
        <p>No songs available</p>
      )}
    </div>
  );
};

export default CardList;
