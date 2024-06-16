import React, { useState, useEffect, useRef } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Player.css';

const Player = ({songList,  song, isPlaying, setIsPlaying, setCurrentSong}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(1);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', (e) => {
        setCurrentTime(e.target.currentTime);
      });

      audioRef.current.addEventListener('loadedmetadata', (e) => {
        setDuration(e.target.duration);
        setIsLoaded(true);
      });

      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
      });
    }
  }, []);

  useEffect(() => {
    if (song && isLoaded) {
      audioRef.current.src = song.url;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [song, isPlaying, isLoaded]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handlePreviousSong = () => {
    const currentIndex = songList.indexOf(song);
    const previousIndex = currentIndex - 1;
    if (previousIndex >= 0) {
      setCurrentSong(songList[previousIndex]);
    }
  };
  
  const handleNextSong = () => {
    const currentIndex = songList.indexOf(song);
    const nextIndex = currentIndex + 1;
    if (nextIndex < songList.length) {
      setCurrentSong(songList[nextIndex]);
    }
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = seekTime;
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
    audioRef.current.volume = event.target.value;
  };

  const handleVolumeMouseLeave = () => {
    setShowVolumeControl(false);
  };

  return (
    <div className="Song-player">

      <div className="Player-song-info">
        <h2 className="Player-song-name">{song.name}</h2>
        <p className="Player-song-artist">{song.artist}</p>
      </div>

      <div className="Player-song-cover">
        <img src={`https://cms.samespace.com/assets/${song.cover}`} alt={song.name} />
      </div>

      <div className="Song-progress">
        <input
          type="range"
          min={0}
          max={100}
          value={duration > 0? (currentTime / duration) * 100 : 0}
          onChange={handleSeek}
        />
      </div>

      <div className="Player-controls">
        <button className="player-menu">
        <i className="fa-solid fa-ellipsis"/>
        </button>

        <div>
          <button className="Player-control" onClick={handlePreviousSong}>
            <i className="fa-solid fa-backward" />
          </button>
          <button className="play-pause-control" onClick={handlePlayPause}>
            {isPlaying ? <i className="fa-solid fa-pause"/> : <i className="fa-solid fa-play"/> }
          </button>
          <button className="Player-control" onClick={handleNextSong}>
            <i className="fa-solid fa-forward" />
          </button>
        </div>
        
        <div className="volume-container">
          <button onClick={ () => setShowVolumeControl(!showVolumeControl)} className="volume-button">
            {volume == 0? (
              <i className="fa-solid fa-volume-xmark"/>
            ) : volume < 0.5? (
              <i className="fa-solid fa-volume-low"/>
            ) : (
              <i className="fa-solid fa-volume-high"/>
            )}
          </button>
          {showVolumeControl && (
            <div
              className="volume-control"
              onMouseLeave={handleVolumeMouseLeave}
            >
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
              />
            </div>
          )}
        </div>
        
      </div>

      <audio ref={audioRef} src={song.url} data-song-id={song.id} />
    </div>
  );
};

export default Player;