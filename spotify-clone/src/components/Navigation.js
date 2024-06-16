import React from 'react';
import './Navigation.css';

const Navigation = ({ onToggle, showForYou }) => {
  return (
    <div className="App-nav">
      <button
        className="App-nav-button"
        onClick={() => onToggle(true)}
        style={{ color: showForYou? '#ffffff' : '#d5d9d5' }}
      >
        For You
      </button>
      <button
        className="App-nav-button"
        onClick={() => onToggle(false)}
        style={{ color:!showForYou? '#ffffff' : '#d5d9d5' }}
      >
        Top Tracks
      </button>
    </div>
  );
};

export default Navigation;