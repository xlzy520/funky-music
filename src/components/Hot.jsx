import React, { useState } from 'react';
import '../styles/Hot.css'
import HotList from './HotList';
import classNames from "../lib/classnames";

const Hot = (props) => {
  const [platform, setPlatform] = useState('netease');
  const [select, setSelect] = useState('netease');
  
  const changePlatform = (key) => {
    setPlatform(key)
    setSelect(key)
  }
  const platforms = [
    {label: '网易云音乐', value: 'netease'},
    {label: 'QQ音乐', value: 'qq'},
    {label: '我的音乐', value: 'my'}
    ]
  
  return (
    <section className="hot-container">
      <aside className="hot-sider">
        <h2>热歌榜</h2>
        <ul className="funky-menu funky-menu-light funky-menu-root funky-menu-inline">
          {
            platforms.map((platformItem)=>{
              return (
                <li key={platformItem.value} className={classNames('funky-menu-item', {
                  'funky-menu-item-selected': select === platformItem.value
                })}
                    onClick={()=>changePlatform(platformItem.value)}
                    style={{'paddingLeft': '24px'}}>{platformItem.label}</li>
              )
            })
          }
        </ul>
      </aside>
      <main className="hot-content">
        <HotList platform={platform} />
      </main>
    </section>
  )
}

export default Hot;
