import React from 'react';
import SearchBar from './SearchBar/SearchBar';
import '../styles/Header.css'

const Header = (props) => {
  return (
    <div className="row row-middle header-container">
      <div className="col col-7">
        <div className="title">
          <a href="/" className="ui-link">
            <h1>Funky Music</h1>
          </a>
        </div>
      </div>
      <div className="col col-17">
        <SearchBar />
      </div>
    </div>
  );
}

export default Header;
