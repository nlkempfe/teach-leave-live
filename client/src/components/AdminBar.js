import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

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
      <Drawer anchor = 'left' variant = 'persistent' open={true}>
        <div className={classes.toolbar} />
        <ListItem button selected = {location == '/admin/dashboard' ? true : false} component = {RouterLink} to = '/admin/dashboard'>
          <ListItemIcon><TrendingUpIcon/></ListItemIcon>
          <ListItemText>Dashboard</ListItemText>
        </ListItem>
        <ListItem button selected = {location == '/admin/users' ? true : false} component = {RouterLink} to = '/admin/users'>
          <ListItemIcon><SupervisorAccountIcon/></ListItemIcon>
          <ListItemText>Manage Users</ListItemText>
        </ListItem>
        <ListItem button selected = {location == '/admin/blog' ? true : false} component = {RouterLink} to = '/admin/blog'>
          <ListItemIcon><ForumIcon/></ListItemIcon>
          <ListItemText>Manage Blog</ListItemText>
        </ListItem>
        <ListItem button selected = {location == '/admin/courses' ? true : false} component = {RouterLink} to = '/admin/courses'>
          <ListItemIcon><SchoolIcon/></ListItemIcon>
          <ListItemText>Manage Courses</ListItemText>
        </ListItem>
      </Drawer>
    </div>
  );
}

export default NavigationBar;
