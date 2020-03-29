import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

/* Import controllers */
import {readUser} from "../firebase/controllers";

/* Import custom components */
import AuthButton from './AuthButton';

/* Import material-ui components */
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

function NavigationBar (props) {
  const classes = useStyles();
  const location = useLocation().pathname;

  return (
    <div style = {{display: 'flex'}}>
      <CssBaseline/>
      <AppBar position = 'static' className = {classes.appBar}>
        <Toolbar>
          <Typography variant = 'h6' style = {{flexGrow: 1}}>
            Teach. Leave. Live.
          </Typography>
          <Button href = '/home' disabled = {location == '/home' ? true : false}>Home</Button>
          <Button href = '/blog' disabled = {location == '/blog' ? true : false}>Blog</Button>
          <Button href = '/courses' disabled = {location == '/courses' ? true : false}>Courses</Button>
          <Button href = '/socials' disabled = {location == '/socials' ? true : false}>Socials</Button>
          {(props.currUser !== null && props.currUser.role === 'admin') ? <Button href = '/admin/dashboard' disabled = {location.includes('/admin/') ? true : false}>Admin</Button> : null }
          <AuthButton currUser={props.currUser} updateUser={props.updateUser}/>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavigationBar;
