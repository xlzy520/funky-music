import React, {useContext} from 'react';
import Button from "./Button";
import { CaretRightOutlined } from '@ant-design/icons';

import AddTo from './AddTo';
import {StoreContext} from "../lib/store";

const OperatingBarOfSongList = props => {
  const [store, dispatch] = useContext(StoreContext)
  const playSongList = (songs) => {
    dispatch({ type: 'NEW_PLAYING_LIST', data: songs });
    dispatch({ type: 'UPDATE_PLAY_INDEX', data: 0 });
  }
  return (
    <div className="row row-middle flex-between-center">
      <div className="col">
        <Button icon={<CaretRightOutlined />}
                onClick={() => playSongList(props.songs)}
        >
          播放全部
        </Button>
      </div>
      <div className="col">
        <AddTo data={props.songs} />
      </div>
    </div>
  );
}

export default OperatingBarOfSongList

