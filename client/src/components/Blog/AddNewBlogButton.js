import React, {useEffect, useState} from 'react';
import {Avatar, Container, Card, CardContent, CardActionArea, CardMedia, Typography, CardActions, Grid, Button} from '@material-ui/core';
import image from "../../assets/BlogImg.png";
import AddIcon from '@material-ui/icons/Add';
import {readUser} from "../../firebase/controllers";

let AddNewBlogButton = (props) => {

    let currUser = readUser();

    return (
        <Card style={{textAlign: 'left'}}>
            <CardActionArea style={{height: '100%'}} onClick={() => props.setOpen(true)}>
                <CardMedia
                    component="img"
                    alt="Teach. Leave. Blog."
                    height="400"
                    image={image}
                    title="Add your own post!"
                />
                <CardContent>
                    <Typography variant="h4">
                        Add your own post!
                    </Typography>
                    <Typography variant="subtitle1">
                        {currUser.name}
                    </Typography>
                    <Typography variant="body1" gutterBottom paragraph>
                        You are signed in and are able to make your own blog post!
                    </Typography>
                </CardContent>
            </CardActionArea>
                <Grid container style={{height: '10vh'}}>
                    <Button onClick={() => props.setOpen(true)}><AddIcon fontSize="large" style={{alignItems: "flex-end"}}/></Button>
                </Grid>
        </Card>
    );

};
export default AddNewBlogButton;
