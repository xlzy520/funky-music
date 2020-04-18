import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import {StoreContext} from '../lib/store'
import TopSongs from "./TopSongs";
import Result from "./Result";
import {LoadingOutlined} from "@ant-design/icons";

const SearchResult = (props)=>{
  const [store, dispatch] = useContext(StoreContext)
  
  
  const updateSearchHistory = (keyword) => {
    dispatch({type: 'UPDATE_SEARCH_HISTORY', data: keyword});
  };
  
  const onResultResponded = (provider, data) => {
    dispatch({
      type: 'UPDATE_SEARCH_RESULTS', provider, data
    });
  };
  
  const searchEnded = () => {
    dispatch({type: 'UPDATE_SEARCH_STATUS', data: 'searched'});
  };
  
  const onSearch = () => {
    dispatch({type: 'CLEAR_RESULTS'});
    dispatch({type: 'UPDATE_SEARCH_STATUS', data: 'searching'});
  };
  
  useEffect(()=>{
    const hash = window.location.hash
    const value = window.decodeURIComponent(hash.substring(hash.indexOf('value=') + 6))
    console.log(value);
    const providers = ['netease', 'qq', 'xiami']
    let resultsResponded = 0
    // dispatch({type: 'CLEAR_SEARCH_HISTORY'});
    updateSearchHistory(value);
    onSearch();
    providers.forEach(provider => {
      fetch(`/api/search?provider=${provider}&keyword=${window.encodeURIComponent(value)}`, {
        // withCredentials: true
        credentials: 'include'
      })
        .then(res => res.json())
        .then(data => {
          onResultResponded(provider, data)
          resultsResponded++;
          if (resultsResponded === providers.length) {
            searchEnded()
          }
        })
        .catch(err => {
          console.log('err ', err);
        });
    })
  }, [])
  
  return (
    <div>
      <TopSongs />
      {
        Object.keys(store.searchResults).map((key) => (
          <Result
            result={store.searchResults[key]}
            provider={key}
            key={key} />
        ))
      }
      <div className="loading-anim-wrapper">
        {
          store.searchStatus === 'searching' &&
          <LoadingOutlined />
        }
      </div>
    </div>
  );
}

export default withRouter(SearchResult);
