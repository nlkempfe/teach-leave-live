import React, {useEffect, useState} from 'react';
import Box from "@material-ui/core/Box";
import {makeStyles, withStyles} from '@material-ui/core/styles';
import {Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from "@material-ui/core";
import {db} from "../firebase/firebaseInit";
import BlogPostCard from "./Blog/BlogPostCard";
import Container from "@material-ui/core/Container";
import AddNewBlogButton from "./Blog/AddNewBlogButton";
import {readUser} from "../firebase/controllers";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import CreateBlogPostDialog from "./CreateBlogPostDialog";
import BlogComments from './BlogComments';


const BlogBody = () => {

    const [posts, setPosts] = useState([]);
    const [expanded, setExpanded] = useState('');
    const [open, setOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [users, setUsers] = useState([]);
    let currUser = readUser();
    let canPost;

    //signed in, field exists, and its true
    if(currUser.allowPosting){
        canPost = true;
        console.log("TRUE")
    }
    else {
        canPost = false;
        console.log(currUser);
    };


    let retrievePosts = () => {
        db.collection('posts').get().then(querySnapshot => {
            let tempPosts = [];
            querySnapshot.forEach(doc => {
                let tempComments = [];
                comments.forEach(comment => {
                    if(comment.postId == doc.id) {
                        comment.postTitle = doc.data().title;
                        tempComments.push(comment);
                    }
                });
                let post = {
                    id: doc.id,
                    allowCommenting: doc.data().allowCommenting,
                    title: doc.data().title,
                    content: doc.data().content,
                    imageURL: doc.data().imageURL,
                    timestamp: doc.data().timestamp,
                    views: doc.data().views,
                    comments: tempComments,
                    numComments: tempComments.length,
                    isExpandable: tempComments.length > 0 ? true : false,
                }
                tempPosts.push(post);
            });
            setPosts(tempPosts);
        });
    };

    const handleUpdateUsers = () => {
        db.collection('users').get().then(querySnapshot => {
            let tempUsers = [];
            querySnapshot.forEach(doc => {
                let user = {
                    id: doc.id,
                    name: doc.data().firstName + ' ' + doc.data().lastName,
                }
                tempUsers.push(user);
            });
            setUsers(tempUsers);
        });
    };

    const handleUpdateComments = () => {
        db.collection('comments').get().then(querySnapshot => {
            let tempComments = [];
            querySnapshot.forEach(doc => {
                let name = '';
                if(users.find(user => user.id == doc.data().userId)) {
                    name = users.find(user => user.id == doc.data().userId).name;
                }
                let comment = {
                    id: doc.id,
                    content: doc.data().content,
                    postId: doc.data().postId,
                    userId: doc.data().userId,
                    timestamp: doc.data().timestamp,
                    postTitle: '',
                    name: name,
                }
                tempComments.push(comment);
            });
            setComments(tempComments);
        });
    }
     useEffect( () => {
         handleUpdateUsers();
     }, []);

    useEffect(() => {
        handleUpdateComments();
    }, [users]);

    useEffect(() => {
       retrievePosts();
    }, [comments]);

     let handleChange = (panel) => {
       if(panel == expanded)
           setExpanded('');
       else
           setExpanded(panel)
     };


    const handleClose = () => {
        setOpen(false);
        retrievePosts();

    }

    return (<div>
        <Container>
            <Grid container spacing={3}>
                {canPost && (<Grid item xs={12} sm={4}>
                    <AddNewBlogButton setOpen={setOpen}/>
                </Grid>)}
                {posts.map((post, index) => {
                    return (<Grid item xs={12} sm={4}>
                        <ExpansionPanel expanded={expanded === `panel${index}`} style={{margin: '0'}}>
                            <Grid container justify="center">
                                <ExpansionPanelSummary
                                    aria-controls={`panel${index}bh-content`}
                                    id={`panel${index}bh-header`}
                                    style={{padding: '0', width: '100%'}}
                                >
                                    <BlogPostCard  post={post} buttonClicked={handleChange} panel={`panel${index}`}/>
                                </ExpansionPanelSummary>
                            </Grid>
                            <ExpansionPanelDetails>
                                <Grid container>
                                  <Typography variant="h6">
                                      {post.content}
                                  </Typography>
                                  <BlogComments postId={post.id}/>
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                </Grid>
                    )
                })}
            </Grid>
        </Container>
        <CreateBlogPostDialog open = {open} handleClose = {post => handleClose()}/>
    </div>)
};
export default BlogBody;
