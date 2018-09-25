import React from 'react';

export default (props)=>{
    return(
        <div className={`notification is-${props.messageType}`}>
            <button className="delete" onClick={()=>{props.removeMessage()}}></button>
            <span>{props.messageName}</span>
        </div>
    )
}