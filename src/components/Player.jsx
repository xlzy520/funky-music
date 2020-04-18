import React, {Component, useContext, useEffect, useState, useRef} from 'react';
// import { connect } from 'react-redux';
import '../styles/Player.css'
import Button from './Button'
import Slider from './Slider'
import {
  CaretRightOutlined,
  StepForwardOutlined,
  StepBackwardOutlined,
  LoadingOutlined,
  PauseOutlined,
  DownloadOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
// import { Row, Col, Slider, Button, Tooltip } from 'antd';
import {
  MdRepeat as LoopIcon,
  MdRepeatOne as SingleIcon,
  MdShuffle as ShuffleIcon
} from 'react-icons/md';
import { FiVolume2 as VolumeIcon, FiVolumeX as MuteIcon } from 'react-icons/fi';

import ArtistLinks from './ArtistLinks';
import MVIcon from './MVIcon';
import PlayingList from './PlayingList';
import { toMinAndSec } from '../lib/time_converter';
import { musicPlayer } from '.././config';
import {StoreContext} from "../lib/store";

const playModeIcons = {
  loop: <LoopIcon className="player-icon" />,
  single: <SingleIcon className="player-icon" />,
  shuffle: <ShuffleIcon className="player-icon" />,
};

const playModes = ['loop', 'single', 'shuffle', ];
const platforms = {
  qq: 'QQ音乐',
  netease: '网易云音乐',
  xiami: '虾米音乐'
};
const modeExplanations = {
  loop: '循环',
  single: '单曲循环',
  shuffle: '随机',
};

function usePrevious(value) {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref.current;
}

const Player = (props) =>{
  const audioRef = useRef()
  
  const [getMusicUrlStatus, setgetMusicUrlStatus] = useState('notYet');
  const [playStatus, setplayStatus] = useState('pausing');
  const [playMode, setplayMode] = useState(localStorage.getItem('playMode') || 'loop');
  const [volume, setvolume] = useState(localStorage.getItem('volume')
    ? Number(localStorage.getItem('volume')) : 0.6);
  const [songSource, setsongSource] = useState(null);
  const [muted, setmuted] = useState(false);
  const [playProgress, setplayProgress] = useState(0);
  const [playingListVisible, setplayingListVisible] = useState(false);
  const [songLoaded, setsongLoaded] = useState(false);
  const [songDuration, setsongDuration] = useState(0);
  const [store, dispatch] = useContext(StoreContext)
  
  const currentSong = store.playingList[store.playIndex]
  const playingList = store.playingList
  
  const prevSong = usePrevious(currentSong);
  
  const progress = toMinAndSec(playProgress);
  const total = toMinAndSec(songDuration);
  
  const changePlayIndex = (currentSong, playingList, playMode, direction) => {
    let nextPlayIndex;
    const currentIndex = playingList.findIndex(song =>
      song.link === currentSong.link);
    if (playMode === 'loop') {
      if (direction === 'forward') {
        nextPlayIndex = playingList[currentIndex + 1] ? currentIndex + 1 : 0;
      } else if (direction === 'backward') {
        nextPlayIndex = playingList[currentIndex - 1] ? currentIndex - 1 :
          playingList.length - 1;
      }
    } else if (playMode === 'shuffle') {
      do {
        nextPlayIndex = Math.floor(Math.random() * playingList.length);
      } while (nextPlayIndex === currentIndex);
    }
    if (nextPlayIndex !== undefined) {
      dispatch({ type: 'UPDATE_PLAY_INDEX', data: nextPlayIndex });
    }
  }
  
  let interval = {}
  useEffect(()=>{
    audioRef.current.volume = volume;
    audioRef.current.addEventListener('loadeddata', () => {
      setsongLoaded(true)
      setsongDuration(audioRef.current.duration)
    });
    audioRef.current.addEventListener('play', () => {
      document.title = `${currentSong.name} -
                        ${currentSong.artists
        .map(item => item.name)
        .reduce(
          (accumulator, currentValue) =>
            accumulator + ' / ' + currentValue
        )}`;
      if (interval) { clearInterval(interval); }
      interval = setInterval(() => {
        setplayProgress(audioRef.current.currentTime)
      }, 1000);
    });
    audioRef.current.addEventListener('pause', () => {
      if (interval) {
        clearInterval(interval);
      }
    });
    audioRef.current.addEventListener('ended', () => {
      clearInterval(interval);
      setplayProgress(audioRef.current.currentTime)
      playNext('forward');
    });
  }, [])
  
  useEffect(()=>{
    console.log(currentSong, prevSong);
    if (currentSong) {
      if ((prevSong && currentSong.link !== prevSong.link) || !prevSong) {
        audioRef.current.pause();
        setsongSource(null)
        setsongLoaded(false)
        setplayProgress(0)
        getSongSourceAndPlay(currentSong);
      }
    } else {
      if (prevSong) {
        setsongSource(null)
        setsongLoaded(false)
        setplayProgress(0)
      }
    }
  }, [currentSong])
  
  
  const playOrPause=()=> {
    if (playStatus === 'pausing') {
      if (songSource) {
        play();
      } else {
        getSongSourceAndPlay(currentSong);
      }
    } else if (playStatus === 'playing') {
      pause();
    }
  }
  const getSongSourceAndPlay =(song)=> {
    getSongSource(song.platform, song.originalId, () => {
      play();
    });
  }
  const play=()=> {
    audioRef.current.play();
    setplayStatus('playing')
  }
  const pause=()=> {
    audioRef.current.pause();
    setplayStatus('pausing')
  }
  
  const getSongSource = (platform, originalId, callback) =>{
    setgetMusicUrlStatus('started')
    fetch(`/api/song_source/${platform}/${originalId}`)
      .then(res => res.json())
      .then(json => {
        if (json.status === 'ok') {
          setgetMusicUrlStatus('ok')
          setsongSource(json.data.songSource)
          setsongLoaded(false)
          callback()
          // this.setState({
          //   getMusicUrlStatus: 'ok',
          //   songSource: ,
          //   songLoaded: false,
          // }, callback);
        } else {
          setgetMusicUrlStatus('failed')
          //
          // this.setState({
          //   getMusicUrlStatus: 'failed',
          // });
        }
      })
      .catch(err => {
        setgetMusicUrlStatus('failed')
        //
        // this.setState({
        //   getMusicUrlStatus: 'failed',
        // });
      });
  }
  
  const changePlayProgress=(value)=> {
    console.log(value);
    audioRef.current.currentTime = value.x;
    setplayProgress(value.x)
    // this.setState({ playProgress: value });
  }
  
  const muteOrNot=()=> {
    if (muted) {
      audioRef.current.muted = false;
      setmuted(false)
      // this.setState({ muted: false });
    } else {
      audioRef.current.muted = true;
      setmuted(true)
  
      // this.setState({ muted: true });
    }
  }
  
  const changeVolume=(value)=> {
    audioRef.current.volume = value.x;
    setvolume(value.x)
    // this.setState({ volume: value });
    localStorage.setItem('volume', value.x);
  }
  
  const playNext =(direction)=> {
    if (playStatus === 'playing') {
      pause();
    }
    // const { currentSong, playingList } = props;
    // const { playMode } = this.state;
    if (playMode === 'single' || playingList.length === 1) {
      audioRef.current.currentTime = 0;
      play();
    } else {
      changePlayIndex(currentSong, playingList, playMode, direction);
    }
  }
  
  const switchPlayMode=()=> {
    const i = playModes.indexOf(playMode);
    const mode = playModes[i + 1] || playModes[0];
    localStorage.setItem('playMode', mode);
    setplayMode(mode)
    // this.setState({
    //   playMode: mode,
    // });
  }
  
  const clickPlayingListBtn=()=> {
    setplayingListVisible(!playingListVisible)
    // this.setState({
    //   playingListVisible: !playingListVisible,
    // });
  }
  
  return (
    <div style={styles.player} id="music-player">
      <audio src={songSource} ref={audioRef}/>
      <div className="music-container">
        <div className="col col-4">
          <Button ghost shape="circle" icon={<StepBackwardOutlined />}
                  onClick={() => this.playNext('backward')}
          />
          <Button ghost shape="circle" size="large"
                  onClick={playOrPause}
                  style={{ margin: '0 10px' }}
                  icon={
                    getMusicUrlStatus === 'notYet' ? <CaretRightOutlined />
                      : (
                        getMusicUrlStatus === 'started' ? <LoadingOutlined />
                          : (
                            getMusicUrlStatus === 'ok'
                              ? (
                                playStatus === 'playing'
                                  ? <PauseOutlined />
                                  : <CaretRightOutlined />
                              )
                              : <CaretRightOutlined />
                          )
                      )
                  }
                  disabled={!currentSong}
          />
          <Button ghost shape="circle" icon={<StepForwardOutlined />}
                  onClick={() => playNext('forward')}
          />
        </div>
        <div className="col col-14" style={{ paddingRight: 40 }}>
          <div className="flex-between-center" style={{ height: 20 }}>
            {
              currentSong &&
              <>
                <div className="col col-7 nowrap">
                  <a href={currentSong.link}
                     style={{ color: 'white', marginRight: 4, fontSize: 16 }}
                     target="_blank"
                     title={currentSong.name}
                  >
                    <strong>{currentSong.name}</strong>
                  </a>
                </div>
                <div className="col col-2">
                  {
                    currentSong.mvLink &&
                    <MVIcon
                      link={currentSong.mvLink}
                      color="white"
                    />
                  }
                </div>
                <div className="col col-6 nowrap">
                  {
                    currentSong.artists &&
                    <ArtistLinks artists={currentSong.artists}
                                 fontColor="white"
                    />
                  }
                </div>
                <div className="col col-5" style={{
                  fontSize: 'small', fontWeight: 'lighter',
                  color: 'rgb(230, 230, 230)',
                }}
                >
                  {`来自${platforms[currentSong.platform]}`}
                </div>
                <div className="col col-4" style={{ textAlign: 'right' }}>
                  {
                    getMusicUrlStatus === 'failed' ? '加载失败' :
                      (
                        songLoaded ? `${progress} / ${total}` :
                          '00:00 / 00:00'
                      )
                  }
                </div>
              </>
            }
          </div>
          <Slider
            axis="x" xmin={0} xmax={songDuration ? parseInt(songDuration) : 0} x={playProgress}
            styles={{width: 500}}
            onChange={changePlayProgress}
                  disabled={!songSource}
                  style={{ margin: '8px 0' }}
          />
        </div>
        <div className="col col-1">
          <Button icon={<DownloadOutlined />} ghost shape="circle"
                  href={songSource}
                  target="_blank"
                  download
                  disabled={songSource === null}
          />
        </div>
        <div className="col col-1" style={{ paddingLeft: 3 }}>
          <a
            title={modeExplanations[playMode]}
            onClick={switchPlayMode}
          >
            {
              playModeIcons[playMode]
            }
          </a>
        </div>
        <div className="col col-3" >
          <div className="flex-between-center">
            <div className="col col-4">
              <a onClick={muteOrNot}>
                {
                  muted
                    ? <MuteIcon className="player-icon" />
                    : <VolumeIcon className="player-icon" />
                }
              </a>
            </div>
            <div className="col col-20">
              <Slider axis="x" xmin={0} xmax={1} xstep={0.01}
                      styles={{width: 105, marginLeft: 20, marginRight: 20}}
                      x={volume}
                      onChange={changeVolume}
              />
            </div>
          </div>
        </div>
        <div className="col col-1" style={{ textAlign: 'right' }}>
          <Button ghost icon={<UnorderedListOutlined />}
                  onClick={clickPlayingListBtn}
                  title="播放列表"
          />
        </div>
      </div>
      {
        playingListVisible && <PlayingList />
      }
    </div>
  );
}


const styles = {
  player: {
    position: 'fixed',
    bottom: 0,
    padding: '8px 0',
    width: '100%',
    backgroundColor: musicPlayer.background,
    color: musicPlayer.color,
  },
};



export default Player;
