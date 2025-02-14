import React, { useEffect, useState } from 'react';

const CardList = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://music-player-production-f92d.up.railway.app/api/songs")
      .then((response) => response.json())
      .then((data) => {
        setSongs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Ошибка загрузки песен:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
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
