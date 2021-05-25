import React,{useState,useEffect} from 'react'
import io from 'socket.io-client'
import queryString from 'query-string'
import InfoBar from '../InfoBar/InfoBar'
import Message from '../Message/Message'
import InputMessage from '../InputMessage/InputMessage'
import './ChatMessage.css'
import ChatList from '../ChatList/ChatList'

let socket;
const ChatMessage=({location})=> {
  const [name,setName]=useState('')
  const [room,setRoom]=useState('')
  const [users, setUsers] = useState('')
  const [message,setMessage]=useState('')
  const [messages,setMessages]=useState([])
  const ENDPOINT='http://localhost:7000'
  useEffect(()=>{
    const {name,room}=queryString.parse(location.search)
    socket= io(ENDPOINT)
    setName(name)
    setRoom(room)

    socket.emit('join',{name,room},(error)=>{
      if(error) {
        alert(error);
      }
    })
  },[ENDPOINT,location.search])

  useEffect(()=>{
    socket.on('message',message=>{
      setMessages(messages=>[...messages,message])
    })
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    })
  },[])

  const sendMessage=(e)=>{
    e.preventDefault()
    if(message){
      socket.emit('sendMessage',message,()=>setMessage(''))
    }
  }

  console.log(message,messages);

  return (
    <div className="chatWrapper">
      <div className="chatContainer">
        <ChatList />
        <InfoBar room={room} users={users}/>
        <Message messages={messages} name={name}/>
        <InputMessage message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
        />
        
      </div>
      
      {/* <form onSubmit={sendMessage}>
        <input type="text" name="chat message"
        placeholder="Type message"
        value={message}
        onChange={(e)=>{setMessage(e.target.value)}}
        required
        >
        </input>
        <button type='submit'>send</button>

      </form> */}
      {/* {chat.map((payload,index)=>{
        return(
          <h3 key={index}>{payload.userName}:<span>{payload.message}</span></h3>
        )
      })} */}
    </div>
  );
}

export default ChatMessage;