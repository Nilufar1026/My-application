import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import './Join.css';


const Join =()=> {
    const [name,setName]=useState('')
    const [room,setRoom]=useState('')
    return(
        <div className="wrapper">
            <div className="joinContainer">
                <h1 className="heading">Sign in</h1>
                <div className="joinInput">
                    <input placeholder="type your name"
                    className="name" type="text" 
                    onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className="joinInput">
                    <input placeholder="room"
                    className="room" type="text"
                    onChange={(e)=>setRoom(e.target.value)}/>
                </div>
                <Link onClick={e=>(!name || !room) ? e.preventDefault() :null} to={`/chat?name=${name}&room=${room}`}>
                    <button className="button" type="submit">Join</button>
                </Link>           
            </div>
        </div>
        

    )
}

export default Join;
