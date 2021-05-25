import React from 'react'

import './SingleMessage.css'

const SingleMessage =({message:{user,text},name})=>{
    let currentUser=false
    const trimmedName= name.trim().toLowerCase()
    if(user === trimmedName){
        currentUser=true
    }
    return(
        currentUser ? (
            <div className="messageWrapper justifyEnd" >
                <p className="sendName pr-10">{trimmedName}</p>
                <div className="messageBox">
                    <p className="sendText">{text}</p>
                </div>
            </div>
        )
        :(
            <div className="messageWrapper justifyStart" >
                <div className="messageBox">
                    <p className="sendText">{text}</p>
                </div>
                <p className="sendName pl-10">{user}</p>
            </div>           
        )
        
    )

}
  


export default SingleMessage;