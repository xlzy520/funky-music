import React, { Component } from 'react';
import '../styles/List.css'
// import { List } from 'antd';

import SongItem from './SongItem';

const SongList = props => {
  
  return (
    <div className="ui-table">
      <div className="ui-table-body">
        <div className="table-body">
          {props.songs.map(song=>(<SongItem key={song.link} song={song} showPlatform={props.showPlatform}/>))}
        </div>
      </div>
    </div>
  )
}

// class SongList extends Component {
  // constructor(props) {
  //   super(props);
  // }
  //
  // render() {
   
    // return (
    //   <List
    //     itemLayout="horizontal"
    //     dataSource={this.props.songs}
    //     renderItem={song => {
    //       return (
    //         <SongItem key={song.link}
    //           song={song}
    //           showPlatform={this.props.showPlatform}
    //         />
    //       );
    //     }}
    //     className="song-list"
    //   />
    // );
//   }
// }
//
export default SongList
