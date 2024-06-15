import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import Player from './components/Player';
import TopTracks from './components/TopTracks';
import ForYou from './components/ForYou';
import { getSongs } from './api/songs';
import ProfilePic from './images/profile-pic.jpg';

function App() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showForYou, setShowForYou] = useState(true);
  const [songDurations, setSongDurations] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');

  useEffect(() => {
    const fetchSongs = async () => {
      const response = await getSongs();
      const songsWithDurations = await Promise.all(
        response.data.map(async (song) => {
          const audio = new Audio(song.url);
          await new Promise((resolve) => {
            audio.addEventListener('loadedmetadata', () => {
              resolve();
            });
          });
          return { ...song, duration: audio.duration };
        })
      );
      setSongs(songsWithDurations);
      setCurrentSong(songsWithDurations[0]);
      setSongDurations(songsWithDurations.reduce((acc, song) => ({ ...acc, [song.id]: song.duration }), {}));
      setBackgroundColor(songsWithDurations[0].accent);
    };
    fetchSongs();
  }, []);

  const handleSongChange = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setBackgroundColor(currentSong.accent);
  };
  
  const handleToggle = (showForYou) => {
    setShowForYou(showForYou);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredSongs = songs.filter((song) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      song.name.toLowerCase().includes(searchTerm) ||
      song.artist.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className="App" style={{ backgroundColor }} >
      <header className="App-header">
        <h1 className="Logo"><i className="fa-brands fa-spotify"/> Spotify</h1>
        <img src={ProfilePic} alt="Profile Picture" className="profile-pic" />
      </header>

      <main className="App-main">
        <div className="App-nav">
          <button
            className="App-nav-button"
            onClick={() => handleToggle(true)}
            style={{ color: showForYou? '#ffffff' : '#d5d9d5' }}
          >
            For You
          </button>
          <button
            className="App-nav-button"
            onClick={() => handleToggle(false)}
            style={{ color:!showForYou? '#ffffff' : '#d5d9d5' }}
          >
            Top Tracks
          </button>
        </div>

        <div className="search-container">
          <input
            type="search"
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
            placeholder="Search Song, Artist"
          />
          <i className="fas fa-search search-icon" />
        </div>

        <div className="App-content">
          {showForYou? (
            <ForYou songs={filteredSongs || songs} onSongChange={handleSongChange} songDurations={songDurations} />
          ) : (
            <TopTracks songs={filteredSongs || songs} onSongChange={handleSongChange} songDurations={songDurations} />
          )}
        </div>
      </main>

      <section className="player-side">
          {currentSong && (
            <Player
            songList={songs}
            song={currentSong}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            setCurrentSong={handleSongChange}
            />
          )}
      </section>
    </div>
  );
}

export default App;