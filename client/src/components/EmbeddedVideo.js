import React, { useState } from 'react';
import YouTube from 'react-youtube';

//import material ui components
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';

//import firebase
import {auth, provider, db} from '../firebase/firebaseInit';
import {readUser} from '../firebase/controllers'
/*
Provides an embeded youtube video that fills its container and matches an aspect ratio
Provide props.aspectRatio to specify the aspect ratio (e.g. 16.0/9.0)
Default aspect ratio is 16.0/9.0 if props.aspect ratio is not provided
*/

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
  },
  media: {
    height: '100%',
  },
});

function EmbeddedVideo (props) {
  const [userPremium, setUserPremium] = useState(readUser().premium)
  const link = props.link;
  const premium = props.premium;
  const description = props.description;
  const name = props.name;
  const [open, setOpen] = useState(null)
  const [displayVideo, setDisplayVideo] = useState(props.shouldDisplay)

  const classes = useStyles();

  /*Calculate inverse of aspect ratio and convert into a percentage*/
  const inverseAspectRatio = ((props.aspectRatio ? 1.0/props.aspectRatio : 9.0/16.0) * 100) + '%'

  //styles the container of the button/video
  const container_style = {
    position: 'relative',
    overflow: 'hidden',
    paddingTop: 20,
    height: '100%'
  };

  //styles the Iframe containing the youtube video
  const iframe_style = {
    width: '100%',
    height: 600
  };

  //If the courese is premium this Icon is displayed
  const checkPremiumCourse = () => {
    console.log(premium)
    if (premium)
    {
      return (
      <LocalAtmIcon />);
    }
  };

  //handles opening of popup
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const closeVideo = () => {
    setDisplayVideo(false);
    props.setFilter('');
    props.setActive(false);
    props.setPremium(false);
    props.setName('');
    props.setDescription('');
    props.setLink('');
  }

  //displays the video when needed
  const changeDisplay = () => {
    setDisplayVideo(true);
    setOpen(false);
    props.setFilter(name);
    props.setActive(true);
    props.setPremium(premium);
    props.setName(name);
    props.setDescription(description);
    props.setLink(link);
  }

  //styles the button
  const buttonStyle = {
    float: 'center',
    paddingTop: 5
  }

  //styles the icon
  const iconStyle = {
    float: 'right'
  }

  //Styles the video when it is activated
  const playingStyle = {
    float: 'center',
    paddingTop: '1%',
    paddingLeft: '10%',
    paddingRight: '10%',
    height: '100%'
  }

  /*Chooses what to return based off the status of user and the video. The component will always start with an
    image of the youtube video and a button that creates a popup. If the video is a standard video or if a premium user
    is viewing a premium user the popup will allow the user to click a button to view and watch the video. Otherwise the
    popup will direct the user to pay for a premium membership*/
  const checkUser = () => {
    if ((userPremium || !(premium)) && !(displayVideo))
    {
      return ( <div style={props.style}>
                <Card variant='outlined' classname={classes.root}>
                  <CardContent>
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby='alert-dialog-slide-title'
                      aria-describedby='alert-dialog-slide-description'
                    >
                      <DialogTitle id='alert-dialog-slide-title'>
                        {name}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id='alert-dialog-slide-description'>
                          {description}
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={changeDisplay} color='primary'>
                          Watch Video
                        </Button>
                        <Button onClick={handleClose} color='primary'>
                          Exit
                        </Button>
                      </DialogActions>
                    </Dialog>
                      <img width='100%' src={'https://img.youtube.com/vi/' + link + '/default.jpg'} />
                      <div style={buttonStyle}>
                        <Button fullWidth variant='outlined' onClick={handleClickOpen}>{name}<div style={iconStyle}>{checkPremiumCourse()}</div></Button>
                      </div>
                      </CardContent>
                </Card>
              </div>)
    }
    else if (displayVideo)
    {
      return (
        <div style={playingStyle}>
          <Card variant='outlined'>
            <CardContent>
              <iframe allow='autoplay' style={iframe_style} src={'https://www.youtube.com/embed/' + link + '?autoplay=1'} frameborder='0' allowFullScreen/>
              <div style={buttonStyle}>
                 <Button fullWidth variant='outlined' onClick={closeVideo}>Close</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }
    else
    {
      return (
      <div style={props.style}>
        <Card classname={classes.root}>
          <CardContent>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby='alert-dialog-slide-title'
              aria-describedby='alert-dialog-slide-description'
            >
              <DialogTitle id='alert-dialog-slide-title'>
                {name}
              </DialogTitle>
              <DialogContent>
               <DialogContentText id='alert-dialog-slide-description'>
                 {description}
                </DialogContentText>
                <DialogContentText id='alert-dialog-slide-description'>
                 To view this course please upgrade to a premium membership.
                </DialogContentText>
              </DialogContent>
                <DialogActions>
                  <Button href = '/account' color='primary'>
                    Buy Premium
                 </Button>
                 <Button onClick={handleClose} color='primary'>
                   Exit
                 </Button>
              </DialogActions>
            </Dialog>
            <img width='100%' src={'https://img.youtube.com/vi/' + link + '/default.jpg'} />
          <div style={buttonStyle}>
            <Button fullWidth variant='outlined' onClick={handleClickOpen}>{name}<div style={iconStyle}>{checkPremiumCourse()}</div></Button>
          </div>
          </CardContent>
      </Card>
      </div>)
    }
  }

  return (
    <div style={container_style}>
        {checkUser()}
    </div>
  );
}

export default EmbeddedVideo;
