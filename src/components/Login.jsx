import React, {useContext, useState} from 'react';
import '../styles/Login.css'
import Button from "./Button";
import Message from "./Message";
import {StoreContext} from "../lib/store";
const Login = (props) =>{
  const [store, dispatch] = useContext(StoreContext)
  
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  
  const updateUsername = (name) => {
    dispatch({type: 'UPDATE_USER', data: name});
  };
  const updateFavorite = (keyword) => {
    dispatch({type: 'UPDATE_FAVORITE', data: keyword});
  };
  
  const handleSubmit = (url) =>{
    if (!username || !password) {
      Message('error', '用户名或密码为空！')
    } else {
        fetch(`/${url}`, {
          method: 'post',
          headers: new Headers({
            'content-type': 'application/json',
          }),
          body: JSON.stringify({username, password}),
          // withCredentials: true
          credentials: 'include'
        }).then(res => res.json()).then(({data})=>{
          if (data.success) {
            Message('success', url === 'login'? '登录成功': '注册成功')
            updateUsername(data.username)
            // updateFavorite(data.favorite)
            props.history.push('/')
          } else {
            Message('error', data.msg)
          }
        }).catch(err=>{
        })
    }
  }
  
  
  return (
    <div className="login-container">
      <div className="login-header">
        <h1>Login</h1>
      </div>
      <div className="login-content">
        <form className="login-form">
          <div className="login-form-item">
            <label>Username: </label>
            <input className="funky-input" onChange={event => setusername(event.target.value)}
                    value={username}/>
          </div>
          <div className="login-form-item">
            <label>Password: </label>
          <input className="funky-input" type="password" onChange={event => setpassword(event.target.value)}
                  value={password} />
          </div>
          <div className="login-submit">
            <Button onClick={()=>handleSubmit('register')}>Register</Button>
            <Button type="primary" onClick={()=>handleSubmit('login')}>Login</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
