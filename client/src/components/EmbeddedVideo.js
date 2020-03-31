import React, { useState } from 'react';
import YouTube from 'react-youtube';

//import controller functions
import {readUser} from '../firebase/controllers'


//import firebase
import {auth, provider, db} from '../firebase/firebaseInit';
/*
Provides an embeded youtube video that fills its container and matches an aspect ratio
Provide props.aspectRatio to specify the aspect ratio (e.g. 16.0/9.0)
Default aspect ratio is 16.0/9.0 if props.aspect ratio is not provided
*/
function EmbeddedVideo (props) {
  const [link, setLink] = useState('')
  const [premium, setPremium] = useState(false)
  const [userPremium, setUserPremium] = useState(false)

  /*Calculate inverse of aspect ratio and convert into a percentage*/
  const inverseAspectRatio = ((props.aspectRatio ? 1.0/props.aspectRatio : 9.0/16.0) * 100) + '%'

  const container_style = {
    position: 'relative',
    overflow: 'hidden',
    paddingTop: inverseAspectRatio
  };

  const iframe_style = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    border: '0'
  };

  const checkUser = () => {
    console.log(!(premium))
    if (userPremium || !(premium))
    {
      return (null)
    }
    else
    {
      return (<div style={iframe_style}></div>)
    }
  }

  let userRef = db.collection('courses').doc(props.courseName);
  let getDoc = userRef.get()
  .then(doc => {
    if (!doc.exists)
    {
      console.log('No Such Document')
    }
    else {
        setLink(doc.data().link)
        setPremium(doc.data().premium)
        setUserPremium(readUser().premium)
    }
  })

  return (
    <div style = {props.style}>
      <div style = {container_style}>
        <iframe style = {iframe_style} src={'https://www.youtube.com/embed/' + link} frameborder='0' allowfullscreen />
        {checkUser()}
      </div>
    </div>
  );
}

export default EmbeddedVideo;
