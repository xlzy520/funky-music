import React, {useState, useReducer, useContext, useEffect} from 'react';
import {DeleteOutlined, SearchOutlined} from '@ant-design/icons';
import {withRouter} from 'react-router-dom';
import Button from "../Button";
import './index.css'
import {StoreContext} from '../../lib/store'


const styles = {
  'minWidth': '708px',
  'left': '0',
  'top': '35px',
}

const SearchBar = (props) => {
  const [hidden, setHidden] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [searchedKeyword, setSearchedKeyword] = useState('');
  const [store, dispatch] = useContext(StoreContext)
  
  const onSearch = () => {
    dispatch({type: 'CLEAR_RESULTS'});
    dispatch({type: 'UPDATE_SEARCH_STATUS', data: 'searching'});
  };
  const onResultResponded = (provider, data) => {
    dispatch({
      type: 'UPDATE_SEARCH_RESULTS', provider, data
    });
  };
  
  const searchEnded = () => {
    dispatch({type: 'UPDATE_SEARCH_STATUS', data: 'searched'});
  };
  const handleSearchInputFocus = (e) => {
    setHidden(false)
  }
  const handleSearchInputBlur = (e) => {
    setHidden(true)
  }
  
  const clearHistory = (e) => {
    dispatch({type: 'CLEAR_SEARCH_HISTORY'});
  }
  
  const updateSearchHistory = (keyword) => {
    dispatch({type: 'UPDATE_SEARCH_HISTORY', data: keyword});
  };
  
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      handleSearch()
    }
  }
  
  const handleSearch = (val) => {
    console.log(val);
    const value = val || keyword.trim();
    if (value !== '' && value !== searchedKeyword) {
      // setSearchedKeyword(value)
      // const providers = ['netease', 'qq', 'xiami']
      // let resultsResponded = 0
      // // dispatch({type: 'CLEAR_SEARCH_HISTORY'});
      // updateSearchHistory(value);
      // onSearch();
      // providers.forEach(provider => {
      //   fetch(`/search?provider=${provider}&keyword=${window.encodeURIComponent(value)}`, {
      //     // withCredentials: true
      //     credentials: 'include'
      //   })
      //     .then(res => res.json())
      //     .then(data => {
      //       onResultResponded(provider, data)
      //       resultsResponded++;
      //       if (resultsResponded === providers.length) {
      //         searchEnded()
      //       }
      //     })
      //     .catch(err => {
      //       console.log('err ', err);
      //     });
      // })
      // this.props.updateSearchKeyword(value);
      props.history.push(`/search?value=${window.encodeURIComponent(value)}`);
    }
  }
  
  
  const onSelect = (key) => {
  }
  
  
  return (
    <div className="search-bar">
       <span className="funky-input-search funky-dropdown-trigger funky-input-search-enter-button funky-input-group-wrapper">
         <span className="funky-input-wrapper funky-input-group">
           <input placeholder="歌曲 | 专辑 | 艺人"
                  onBlur={handleSearchInputBlur}
                  onFocus={handleSearchInputFocus}
                  onKeyUp={handleKeyPress}
                  onChange={event => setKeyword(event.target.value)}
                  className="funky-input" value={keyword}/>
           <span className="funky-input-group-addon">
             <Button type="primary" icon={<SearchOutlined/>} onClick={()=>handleSearch()}/>
           </span>
           <div className="search-results">
        <div className={`funky-dropdown funky-dropdown-placement-bottomLeft ${hidden ? 'funky-dropdown-hidden' : ''}`}
             style={styles}>
          <ul className="funky-dropdown-menu funky-dropdown-menu-light
          funky-dropdown-menu-root funky-dropdown-menu-vertical">
            <li className="funky-dropdown-menu-item-group">
              <div className="funky-dropdown-menu-item-group-title">
                <div className="flex-between-center">
                  <span>搜索历史</span>
                  <Button shape="circle" icon={<DeleteOutlined/>} onClick={clearHistory}/>
                </div>
              </div>
              <ul className="funky-dropdown-menu-item-group-list">
                {
                  store.history.map(item => {
                    return (
                      <li className="funky-dropdown-menu-item" onClick={()=>handleSearch(item)}  key={item} role="menuitem">{item}</li>
                    )
                  })
                }
              </ul>
            </li>
          </ul>
        </div>
      </div>
         </span>
       </span>
    </div>
  
  )
}

export default withRouter(SearchBar)
