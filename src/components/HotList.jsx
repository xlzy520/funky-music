import React, { useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import {withRouter} from 'react-router-dom';

import SongList from './SongList';
import OperatingBarOfSongList from './OperatingBarOfSongList';

const HotList = (props)=>{
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect( () => {
    fetchHotList(props.platform);
  }, [props.platform]);
  
  const updateFavorite = () =>{
    fetch(`/favorite/getAll`, {
      credentials: 'include',
    }).then(res => res.json())
      .then(data => {
        if (data.success) {
          const songsObj = data.data.songs;
          const songs = Object.keys(songsObj).map(v=> songsObj[v])
          setLoading(false)
          setSongs(songs)
        
        } else {
          props.history.push('/login')
        }
      })
      .catch(err => console.error(err));
  }
  
  const fetchHotList = (platform) => {
    setLoading(true)
    if (platform === 'my') {
      updateFavorite()
    } else {
      fetch(`/hot_list/${platform}`, {
        credentials: 'include',
      }).then(res => res.json())
        .then(json => {
          if (json.status === 'ok') {
            setLoading(false)
            setSongs(json.data.songs)
          }
        })
        .catch(err => console.error(err));
    }
  }
  
  return <>
    <div style={{ paddingLeft: 620 }}>
      {
        songs.length !== 0 && <OperatingBarOfSongList songs={songs} />
      }
    </div>
    {
      loading ? <LoadingOutlined /> : <SongList updateFavorite={updateFavorite} songs={songs} platform={props.platform} />
    }
  </>;
}

export default withRouter(HotList);
