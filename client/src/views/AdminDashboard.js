import React, { useEffect, useState } from 'react';
// import { Tracker } from 'react-tracker';
/* Import custom components */
import DashboardChart from '../components/DashboardChart.js';

/* Import material-ui components */

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import MUIDataTable from 'mui-datatables';
import {db} from '../firebase/firebaseInit';
// const tracker = new Tracker();

function Admin(props) {
  const [width, setWidth] = useState({width: window.innerWidth});
  const [courses, setCourses] = useState([]);
  const [isPremium, setIsPremium] = useState(false);
  const [rowIndex, setRowIndex] = useState(null);
  const [role, setRole] = useState('user');
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);



  useEffect(() => {
    db.collection('courses').get().then(s => {
        const newCourses = s.docs.map(d => d.data());
        setCourses(newCourses);
    });
  }, []);
  useEffect(() => {
    window.addEventListener('resize', setWidth(window.innerWidth));
  });

  const handleUpdate = () => {
    db.collection('users').get().then(querySnapshot => {
      let tempUsers = [];
      querySnapshot.forEach(doc => {
        let user = {
            uid: doc.data().uid,
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            email: doc.data().email,
            premium: doc.data().premium,
            role: doc.data().role
        }
        tempUsers.push(user);
      });
      setUsers(tempUsers);
    });
  }

  useEffect(() => {
    handleUpdate();
  }, []);

  useEffect(() => {
    db.collection('posts').orderBy('date', 'desc').get().then(s => {
        const newPosts = s.docs.map(d => ({
            ...d.data(),
            date: String(new Date(d.data().date.seconds * 1000))
        }));
        setPosts(newPosts);
    });
    db.collection('comments').get().then(s => {
        const newComments = s.docs.map(d => d.data());
        console.log(newComments);
        setComments(newComments);
    });
  }, []);

  const premiumUsers = users.filter(u => u.premium);

  return (
    <div>
      <Container fluid style = {{marginLeft: props.drawerWidth + 50, marginRight: 50, marginTop: 20, maxWidth: (width - props.drawerWidth - 100)}}>
        <Card fluid>
          <div style={{marginBottom: 16}}>
        <Chip label={`Courses: ${courses.length}`}/>
        </div>
        <div style={{marginBottom: 16}}>
          <Chip label={`Premium users: ${premiumUsers.length}`}/>
          <div style={{width:16,height:16}}/>
          <Chip label={`Non-Premium users: ${users.length - premiumUsers.length}`}/>
          </div>
          <div style={{marginBottom: 16}}>
          <Chip label={`Blog posts: ${posts.length}`}/>
          <div style={{width:16,height:16}}/>
          <Chip label={`Post total comments: ${comments.length}`}/>
          </div>
          <CardContent>
            <Typography variant = 'h6'>User Activity</Typography>
            <DashboardChart/>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </Container>
    </div>
  );
}

export default Admin;

//<Chip label={`Courses: ${courses.length}`}/>

