import React, { useState, useEffect, useContext} from 'react';

import SongList from './SongList';
import {StoreContext} from "../lib/store";


const TopSongs = (props) =>{
  const [topSongs, setTopSongs] = useState([]);
  const [store, dispatch] = useContext(StoreContext)
  const searchResults = store.searchResults
  
  useEffect(()=>{
    if (Object.keys(searchResults).length === 0) {
     setTopSongs([])
    }
    Object.keys(searchResults).forEach((key) => {
      if (topSongs.every((song) => song.platform !== key)) {
        if (searchResults[key].searchSuccess) {
          setTopSongs([...topSongs,
            searchResults[key].data.songs[0]
          ])
        }
      }
    });
  }, [searchResults])
  
  return topSongs.length === 0 ? null : (
    <div style={{
      padding: '0px 10px',
      marginBottom: 15,
      backgroundColor: 'rgb(250,250,250)',
      borderRadius: 5
    }}
    >
      <SongList songs={topSongs} showPlatform />
    </div>
  );
  
}

export default TopSongs;
