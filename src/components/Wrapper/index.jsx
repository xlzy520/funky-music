import React, { Component } from 'react';
import neteaseMusicLogo from './images/netease_32.ico';
import qqMusicLogo from './images/qq_32.ico';
import xiamiMusicLogo from './images/xiami_32.ico';

class Wrapper extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { provider } = this.props;
    const { themeColor, logo, link } = providers[provider];
    return (
      <div style={{ ...styles.wrapper, borderColor: themeColor }}>
        <div className="flex-between-center">
          <div className="col col-12">
            <a href={link} target="_blank" alt={provider}>
              <img src={logo} alt="" />
            </a>
          </div>
          <div className="col col-6" style={{ paddingRight: 60 }}>
            {this.props.operatingBar}
          </div>
          <div className="col col-6">
            {this.props.pagination}
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

const styles = {
  wrapper: {
    border: '1px solid',
    borderRadius: 5,
    padding: '10px 10px 0',
    marginBottom: 15
  },
};

const providers = {
  netease: {
    themeColor: '#C20C0C',
    logo: neteaseMusicLogo,
    link: 'https://music.163.com/'
  },
  qq: {
    themeColor: '#2caf6f',
    logo: qqMusicLogo,
    link: 'https://y.qq.com/'
  },
  xiami: {
    themeColor: '#FA8723',
    logo: xiamiMusicLogo,
    link: 'https://www.xiami.com/'
  }
};

export default Wrapper;
