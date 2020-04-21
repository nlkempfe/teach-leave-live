import React, {useEffect, useState} from 'react';
import {Grid, Typography, TextField, Button, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {db} from "../firebase/firebaseInit";
import {readUser, createComment} from '../firebase/controllers'

import ProfileLink from './ProfileLink';


function BlogComments(props){
  const postId = props.postId;
  const currUser = readUser();
  const allowCommenting = currUser && currUser.allowCommenting;
  const [comments, setComments] = useState([]);
  const [proposedComment, setProposedComment] = useState('');

  const retrieveComments = () => {
    db.collection('comments').where('postId', '==', postId).get().then(querySnapshot => {
      let tempComments = [];
      const insert = (c) => {
        for(let i = 0; i < tempComments.length; i++){
          if(c.timestamp > tempComments[i].timestamp){
            tempComments.splice(i, 0, c);
            return;
          }
        }
        tempComments.push(c);
      };
      querySnapshot.forEach(doc => {
        const data = doc.data();
        let comment = {
            id: doc.id,
            content: data.content,
            postId: data.postId,
            timestamp: data.timestamp,
            userId: data.userId
        }
        insert(comment);
      });
      setComments(tempComments);
    });
  };

  useEffect(() => {
    retrieveComments();
  }, []);

  let commentComponents = [];
  for(let i = 0; i < comments.length; i++){
    commentComponents.push(
        <ListItem>
          <ListItemIcon>
            <ProfileLink uid={comments[i].userId} />
          </ListItemIcon>
          <ListItemText>
            {comments[i].content}
          </ListItemText>
        </ListItem>
    );
  }

  return(

    <List>
      <ListItem>
        <TextField
          disabled={!allowCommenting}
          multiline
          onChange={(event) => {setProposedComment(event.target.value);}}
        />
        <Button
          disabled={!allowCommenting}
          onClick={() => {
            if(allowCommenting && proposedComment){
              let comment = {
                content: proposedComment,
                postId: postId,
                userId: currUser.uid,
                timestamp: new Date() //now
              };
              createComment(comment);
              retrieveComments();
            }
          }}
        >
          {"Submit"}
        </Button>
      </ListItem>
      {commentComponents}
    </List>
  );
}

export default BlogComments;
