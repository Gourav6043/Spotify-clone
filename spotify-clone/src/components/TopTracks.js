import React from 'react';
import './TopTracks.css';
import Song from './Song';

const TopTracks = ({ songs, onSongChange, songDurations }) => {
  const topTracks = songs.filter((song) => song.top_track);

  return (
    <ul className="TopTracks-list">
      {topTracks.map((song) => (
        <Song key={song.id} song={song} onSongChange={onSongChange} songDurations={songDurations} />
      ))}
    </ul>
  );
};

export default TopTracks;