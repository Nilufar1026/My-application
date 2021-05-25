import React from 'react'
import Background from './wp5149772.jpg';
import './InfoBar.css'

const InfoBar =({room,users})=>(
    <div className="infoWrapper" style={{ background: `url(${Background})` }}>
        <div className="infoContainer">
            <h3>Room:{room}</h3>
        </div>
        {
        users
            ? (
            <div>
                
                <div className="member">
                <h2>Member:</h2>
                <h2>
                    {users.map(({name}) => (
                    <div key={name} className="activeItem">
                       <h3>{name} </h3> 
                    </div>
                    ))}
                </h2>
                </div>
                
            </div>
            )
            : null }
            
    </div>    
)

export default InfoBar;

