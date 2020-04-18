import React, { useContext } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {StoreContext} from "../lib/store";
import Message from './Message'

const AddTo = (props) =>{
  const [store, dispatch] = useContext(StoreContext)
  
  const addToPlaylist = (data) => {
    dispatch({ type: 'ADD_TO_PLAYING_LIST', data: data });
  }
  const  handleClick = () => {
    addToPlaylist(props.data);
    Message('success', '已添加至播放列表')
  }
  
  return (
    <a onClick={handleClick} title="添加到播放列表">
      <PlusOutlined
        style={{
          fontSize: 20,
          display: 'block',
        }}
      />
    </a>
  );
}

export default AddTo;
