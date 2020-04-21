import React, {useEffect, useState} from 'react';
import {Avatar, Container, Card, CardContent, Typography, Grid, Button} from '@material-ui/core'
import ProfileLink from '../components/ProfileLink.js'
import logo from '../assets/logo.png';
import background from '../assets/blogbg.jpg';
import postPic from '../assets/sampleBlogPic.jpg';
import Paper from '@material-ui/core/Paper';
import {db} from '../firebase/firebaseInit';

import BlogHeader from "../components/Blog/BlogHeader";
import BlogPostCard from "../components/Blog/BlogPostCard";
import BlogBody from "../components/BlogBody";

const Blog = () => {

    const styles = {
        background: {
            margin: 'auto',
            textAlign: 'center',
            backgroundAttachment: 'fixed',
            backgroundImage: `url(${background})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            height: '100%',
        }
    };

    return (
        <div style={styles.background}>
            <BlogHeader/>
            <BlogBody/>
        </div>
    );

};
//<div><ProfileLink uid={userID}/></div>
export default Blog;
