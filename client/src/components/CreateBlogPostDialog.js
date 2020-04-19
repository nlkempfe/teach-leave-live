import React, { useState } from 'react';
import {debounce} from 'lodash';

/* Import firebase products */
import {db, firestore} from '../firebase/firebaseInit';

/* Import material-UI components */
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    content: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    actions: {
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(1),
    }
  }));

function CreateBlogPostDialog(props) {
  const classes = useStyles();

  /* Hook for the value of each form */
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [allowCommenting, setAllowCommenting] = useState(false);

  /* Handle changes of the value of each form using debounce to improve performance*/
  const handleTitleChange = debounce ((title) => {
    setTitle(title);
  }, 500);
  const handleContentChange = debounce ((content) => {
    setContent(content);
  }, 500);
  const handleImageURLChange = debounce ((imageURL) => {
    setImageURL(imageURL);
  }, 500);
  const handleAllowCommentingChange = debounce ((allowCommenting) => {
    setAllowCommenting(allowCommenting);
  }, 500);

  //Adds course to database after submission of form
  const handleSubmit = async (course) => {
    let doc = db.collection('posts').add({
        title : title,
        content: content,
        imageURL: imageURL,
        allowCommenting: allowCommenting,
        views: 0,
        timestamp: firestore.Timestamp.now()
    }).then(props.handleClose());
  };

return (
  <Dialog open = {props.open}>
    <DialogTitle>Create Blog Post</DialogTitle>
      <DialogContent className = {classes.content}>
        <TextField className = {classes.content} label='Title' fullWidth variant='outlined' required inputProps={{maxLength: 99}} onChange={e => handleTitleChange(e.target.value)}/>
        <TextField className = {classes.content} label='Content' multiline required fullWidth rows='15' variant='outlined' onChange={e => handleContentChange(e.target.value)}/>
        <TextField className = {classes.content} label='Image URL' fullWidth variant='outlined' required inputProps={{maxLength: 99}} onChange={e => handleImageURLChange(e.target.value)}/>
        <InputLabel className = {classes.content}>Allow Commenting</InputLabel>
        <Select className = {classes.content} variant = 'outlined' value = {allowCommenting} onChange = {event => handleAllowCommentingChange(event.target.value)} defaultValue = {allowCommenting}>
          <MenuItem value = {true}>Yes</MenuItem>
          <MenuItem value = {false}>No</MenuItem>
        </Select>
    </DialogContent>
    <DialogActions className = {classes.actions}>
      <Button variant='contained' color='primary' onClick = {course => props.handleClose()}>Cancel</Button>
      <Button variant='contained' color='primary' onClick = {course => handleSubmit(course)}>Submit</Button>
    </DialogActions>
  </Dialog>
);
}

export default CreateBlogPostDialog;
