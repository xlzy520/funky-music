import React, { useState, useEffect, useContext } from 'react';
import { Pagination } from 'antd';
import '../styles/Result.css'
import classNames from "../lib/classnames";

import SongList from './SongList';
import Wrapper from './Wrapper';
import OperatingBarOfSongList from './OperatingBarOfSongList';
import { FaAngleLeft, FaAngleRight } from "react-icons/all";
import { withRouter } from 'react-router-dom';

import {StoreContext} from '../lib/store'

const Result = (props)=>{
  const [store, dispatch] = useContext(StoreContext)
  const [pageNo, setPageNo] = useState(1);
  const hash = window.location.hash
  const value = window.decodeURIComponent(hash.substring(hash.indexOf('value=') + 6))
  const keyword = store.searchKeyword || value
  const onResultResponded = (provider, data) => {
    dispatch({ type: 'UPDATE_SEARCH_RESULTS', provider, data});
  }

  const onPageChange = (page) => {
    const { provider } = props;
    fetch(`/api/search?provider=${provider}&keyword=${keyword}&page=${page}`)
      .then(res => res.json())
      .then(json => {
        onResultResponded(provider, json);
      })
      .catch(err => {
        console.log('err ', err);
      });
  }
  
  const decreasePageNo = () =>{
    if (pageNo<result.data.totalCount) {
      setPageNo(pageNo + 1)
      onPageChange(pageNo + 1)
    }
  }
  
  const increasePageNo = () =>{
    if (pageNo>1) {
      setPageNo(pageNo - 1)
      onPageChange(pageNo-1)
    }
  }
  
  const { result, provider } = props;
  let mainPart;
  if (result.searchSuccess) {
    mainPart = <SongList songs={result.data.songs} />;
  } else {
    mainPart = <h3>{result.message}</h3>;
  }
  
  return (
    <Wrapper provider={provider}
             operatingBar={
               result.searchSuccess &&
               <OperatingBarOfSongList songs={result.data.songs} />
             }
             pagination={ result.searchSuccess &&
             (
               <ul className="ant-pagination ant-pagination-simple">
                 <li title="Previous Page" className={classNames('ant-pagination-prev',{
                   'ant-pagination-disabled': pageNo === 1
                 })}>
                   <a className="ant-pagination-item-link" onClick={increasePageNo}>
                     <FaAngleLeft/>
                   </a>
                 </li>
                 <li className="ant-pagination-simple-pager">
                   <input type="text" size={3} value={pageNo} onChange={event => setPageNo(event.target.value)} />
                   <span className="ant-pagination-slash">/</span>{result.data.totalCount}</li>
                 <li title="Next Page" className={classNames('ant-pagination-next', {
                   'ant-pagination-disabled': pageNo === result.data.totalCount
                 })}>
                   <a className="ant-pagination-item-link" onClick={decreasePageNo}>
                     <FaAngleRight/>
                   </a>
                 </li>
               </ul>
             )
             // <Pagination
             //   simple
             //   onChange={onPageChange}
             //   defaultPageSize={4}
             //   total={result.data.totalCount} />
             }
    >
      {mainPart}
    </Wrapper>
  );
}

export default withRouter(Result);
