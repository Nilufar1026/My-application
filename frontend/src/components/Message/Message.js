import React from 'react'
import SingleMessage from '../SingleMessage/SingleMessage'
import './Message.css'

const Message =({messages,name})=>(
    <div className="messagesWrapper">
        {messages.map((message,index)=>
        <div key={index}>
            <SingleMessage message={message} name={name}/>
        </div>
        )}
        
    </div>    
)

export default Message;