import React,{useState,useEffect} from 'react'
//import io from 'socket.io-client'
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import ChatMessage from './components/ChatMessage/ChatMessage';
import Join from './components/Join/Join';

const App =()=> {
  return(
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/chat"  component={ChatMessage} />
    </Router>
  )
    
}

export default App;
