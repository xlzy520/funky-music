import React, { useContext } from 'react';
import SearchBar from './SearchBar/SearchBar';
import '../styles/Header.css'
import Button from "./Button";
import {StoreContext} from "../lib/store";
import {withRouter} from 'react-router-dom';


const Header = (props) => {
  const [store, dispatch] = useContext(StoreContext)
  const goLogin = () =>{
    props.history.push(`/login`);
  }
  
  return (
    <div className="row row-middle header-container">
      <div className="col col-7">
        <div className="title">
          <a href="/" className="ui-link">
            <h1>Funky Music</h1>
          </a>
        </div>
        <div>
        
        </div>
      </div>
      <div className="col col-14">
        <SearchBar />
      </div>
      <div className="col col-3 right">
        {
          store.username ? store.username : <Button onClick={goLogin}>登录</Button>
        }
      </div>
    </div>
  );
}

export default withRouter(Header);
