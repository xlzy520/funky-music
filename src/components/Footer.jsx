import React from 'react';
import { GithubOutlined } from '@ant-design/icons';

const Footer = (props) =>{
  return (
    <div style={{ textAlign: 'center' }}>
      <a href="https://github.com/enzeberg/tongzhong-music"
         target="blank"
      >
        <GithubOutlined style={{ fontSize: 'large' }} /> Junqiu
      </a>
    </div>
  );
}

export default Footer
