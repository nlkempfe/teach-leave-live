import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

/* Import custom components */
import AuthButton from "./AuthButton";

/* Import material-ui components */
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

/* Import material-ui icons */
import ForumIcon from '@material-ui/icons/Forum';
import MenuIcon from '@material-ui/icons/Menu';
import SchoolIcon from '@material-ui/icons/School';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: theme.mixins.toolbar,
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
          <Button href = "/home">Home</Button>
          <Button href = "/blog">Blog</Button>
          <Button href = "/admin/dashboard">Admin</Button>
          <AuthButton currUser={props.currUser} updateUser={props.updateUser}/>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavigationBar;
