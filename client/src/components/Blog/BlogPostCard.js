import React, {useEffect, useState} from 'react';
import {Avatar, Container, Card, CardContent, CardActionArea, CardMedia, Typography, CardActions, Grid, Button} from '@material-ui/core';
import image from '../../assets/sampleBlogPic.jpg';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';


let BlogPostCard = (props) => {
    const d = props.post.timestamp.toDate();
    const date = ("0"+(d.getMonth()+1)).slice(-2)  + "/" + ("0" + d.getDate()).slice(-2) + "/" + d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)

    //Blog post is passed in props as a JSON object
    return (
        <Card style={{textAlign: 'left'}}>
            <CardActionArea onClick={() => props.buttonClicked(props.panel)}>
                <CardMedia
                    component="img"
                    alt="Teach. Leave. Blog."
                    height="400"
                    image={image}
                    title={props.post.title}
                />
                <CardContent>
                    <Typography variant="h4">
                        {props.post.title}
                    </Typography>
                    <Typography variant="subtitle1">
                        Author
                    </Typography>
                    <Typography variant="body1" gutterBottom paragraph>
                        {props.post.content.substring(0, 120) + "..."}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <Grid container style={{height: '10vh'}}>
                <Grid container xs={5} alignItems="center" justify="center" style={{paddingLeft: '2'}}>
                    <Typography variant="subtitle1" >
                        {date}
                    </Typography>
                </Grid>
                <Grid container xs={7} direction="row-reverse">
                    <Button onClick={() => props.buttonClicked(props.panel)} ><KeyboardArrowDownIcon/></Button>
                    <Button><ChatBubbleOutlineIcon fontSize="large"/></Button>
                </Grid>
            </Grid>
        </Card>
    );

};

export default BlogPostCard;
