import React from 'react';
import './ForYou.css';
import Song from './Song';

const ForYou = ({ songs, onSongChange, songDurations }) => {
  const forYouTracks = songs.filter((song) =>!song.top_track);

  return (
    <ul className="ForYou-list">
      {forYouTracks.map((song) => (
        <Song key={song.id} song={song} onSongChange={onSongChange} songDurations={songDurations} />
      ))}
    </ul>
  );
};

export default ForYou;