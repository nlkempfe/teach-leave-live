import React, { useState } from 'react';
import YouTube from 'react-youtube';

//import controller functions
import {readUser} from '../firebase/controllers'

//import material ui components
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')
  const [open, setOpen] = useState(null)
  const [displayVideo, setDisplayVideo] = useState(false)

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
        setDescription(doc.data().description)
        if (premium)
        {
          setName(doc.data().name + ' (Premium)')
        }
        else 
        {
          setName(doc.data().name)
        }
    }
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeDisplay = () => {
    setDisplayVideo(true);
  }

  //<iframe style={iframe_style} src={'https://www.youtube.com/embed/' + link + '/0.jpg'} frameborder='0' allowfullscreen />

  const checkUser = () => {
    //console.log(!(premium))
    if ((userPremium || !(premium)) && !(displayVideo))
    {
      return (<div class='check'>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-slide-title"
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle id="alert-dialog-slide-title">
                    {name}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      {description}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={changeDisplay} color="primary">
                      Watch Video
                    </Button>
                    <Button onClick={handleClose} color="primary">
                      Exit
                    </Button>
                  </DialogActions>
                </Dialog>
                <Button onClick={handleClickOpen}><img src={'https://img.youtube.com/vi/' + link + '/default.jpg'} /><br/>{name}</Button>
              </div>)
    }
    else if (displayVideo)
    {
      return ( 
          <div style={container_style}>
            <iframe style={iframe_style} src={'https://www.youtube.com/embed/' + link} frameborder='0' allowFullScreen />
          </div>
      )
    }
    else
    {
      return (null)
    }
  }

  return (
    <div style={props.style}>
        {checkUser()}
    </div>
  );
}

export default EmbeddedVideo;
