import React from 'react';

const NoBenchmarkTrackDetails = () => {
  return (
    <div className='benchmark-track-details'>
      <div className='album-art'>
        <img src={'/empty-album.png'}/>
      </div>
      <div className='details'/>
    </div>
  );
};

export default NoBenchmarkTrackDetails;