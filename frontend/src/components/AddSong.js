import React, { useState } from 'react';

const AddSong = () => {
  const [song, setSong] = useState({
    title: '',
    artist: '',
    imageUrl: '',
    audioUrl: '',
    duration: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'duration' && !/^\d{1,2}:\d{2}$/.test(value) && value !== '') {
      return;
    }

    setSong({
      ...song,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch('http://localhost:5001/api/songs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(song)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Песня добавлена:', data);
        setSong({
          title: '',
          artist: '',
          imageUrl: '',
          audioUrl: '',
          duration: ''
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error('Ошибка при добавлении песни:', error);
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-lg mx-auto">
      <input
        type="text"
        name="title"
        value={song.title}
        onChange={handleChange}
        placeholder="Song title"
        className="w-full p-2 mb-3 border rounded"
      />
      <input
        type="text"
        name="artist"
        value={song.artist}
        onChange={handleChange}
        placeholder="Artist"
        className="w-full p-2 mb-3 border rounded"
      />
      <input
        type="text"
        name="imageUrl"
        value={song.imageUrl}
        onChange={handleChange}
        placeholder="Image URL"
        className="w-full p-2 mb-3 border rounded"
      />
      <input
        type="text"
        name="audioUrl"
        value={song.audioUrl}
        onChange={handleChange}
        placeholder="Audio URL"
        className="w-full p-2 mb-3 border rounded"
      />
      <input
        type="text"
        name="duration"
        value={song.duration}
        onChange={handleChange}
        placeholder="Duration (mm:ss)"
        className="w-full p-2 mb-3 border rounded"
      />
      <button 
        type="submit" 
        disabled={loading} 
        className="w-full p-3 bg-purple-500 text-white rounded hover:bg-purple-700 disabled:bg-gray-500"
      >
        {loading ? 'Adding Song...' : 'Add Song'}
      </button>
    </form>
  );
};

export default AddSong;
