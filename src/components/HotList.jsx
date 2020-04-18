import React, { useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

import SongList from './SongList';
import OperatingBarOfSongList from './OperatingBarOfSongList';

const HotList = (props)=>{
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect( () => {
    fetchHotList(props.platform);
  }, [props.platform]);
  
  const fetchHotList = (platform) => {
    setLoading(true)
    fetch(`/api/hot_list/${platform}`, {
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
  
  return <>
    <div style={{ paddingLeft: 620 }}>
      {
        songs.length !== 0 && <OperatingBarOfSongList songs={songs} />
      }
    </div>
    {
      loading ? <LoadingOutlined /> : <SongList songs={songs} />
    }
  </>;
}

export default HotList;
