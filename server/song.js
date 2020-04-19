const fetch = require('node-fetch')
const baseUrl = 'http://mini.tongzhong.xyz/api'
const search = (req, res, next) => {
  let { keyword, provider, page } = req.query;
  return fetch(`${baseUrl}/search?provider=${provider}&keyword=${keyword}&page=${page}`)
    .then(res => res.json()).then(data => (res.send(data)));
}

const getSongSource = (req, res, next) => {
  const { platform, originalId } = req.params;
  return fetch(`${baseUrl}/song_source/${platform}/${originalId}`)
    .then(res => res.json()).then(data => (res.send(data)));
};

const getHotList = (req, res, next) => {
  const { platform } = req.params;
  fetch(`${baseUrl}/hot_list/${platform}`)
    .then(res => res.json()).then(data => (res.send(data)));
};


module.exports = {
  search,
  getHotList,
  getSongSource
};
