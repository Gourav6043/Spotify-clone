import React from 'react';
import './Song.css';

const Song = ({ song, onSongChange, songDurations }) => {
  const handleClick = () => {
    onSongChange(song);
  };

  return (
    <li className="Song" onClick={handleClick}>
      <div className="Song-info">
        <img className="Song-cover" src={`https://cms.samespace.com/assets/${song.cover}`} alt={song.title} />
        <div>
          <h3 className="Song-title">{song.name}</h3>
          <p className="Song-artist">{song.artist}</p>
        </div>
      </div>
      <div className="song-duration">
        {songDurations[song.id]? (
          <span>
            {Math.floor(songDurations[song.id] / 60)}:{Math.floor(songDurations[song.id] % 60)}
          </span>
        ) : (
          <span>--:--</span>
        )}
      </div>
    </li>
  );
};

export default Song;