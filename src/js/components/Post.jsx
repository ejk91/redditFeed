import React, { Component } from 'react';

export default function Post(props) {
    let img = '' ;
    let timestamp = new Date(props.info.created_utc * 1000).toString();

    if (props.info.post_hint === "image") {
      img = (<img className='img' style={{width:'500px'}} src={props.info.url}></img>)
    }

    return (
      <div className='post'>
          <div className='information'>
           <div className='title'><a href={props.info.url}>{props.info.title}</a></div>
           <div className='time'> {timestamp}</div>
           <div className='caption'>{props.info.selftext}</div>
          </div>
          {img}
      </div>
    )
}