import React, { useState, useEffect } from 'react';

import EmbeddedVideo from '../components/EmbeddedVideo.js'

import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { FixedSizeList } from 'react-window';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

//import firebase
import {auth, provider, db} from '../firebase/firebaseInit';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    height: 400,
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

function Courses(props) {
  const [searchCourse, setSearchCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [courseFilter, setCourseFilter] = useState('');

  const classes = useStyles();

  const filteredCourses = courses.filter(course => course.name.toLowerCase().includes(courseFilter.toLowerCase()));

  const simple_video_style = {
    width: '100'
  }

  const searchBarStyle = {
    paddingLeft: 10,
    width: '25%'
  };

  useEffect(() => {
    db.collection('courses').get().then(querySnapshot => {
      let tempCourses = [];
      querySnapshot.forEach(doc => {
        let course = {
            name: doc.data().name,
            description: doc.data().description,
            premium: doc.data().premium,
            link: doc.data().link
        }
        tempCourses.push(course);
      });
      setCourses(tempCourses);
    });
  }, []);

  const listElementStyle = {
      height: '100%',
      width: '20%',
      padding: 20
  }

  const courseList = filteredCourses.map(directory => {
      return (
        <GridListTile style={listElementStyle}>
          <EmbeddedVideo link={directory.link} 
                         name={directory.name} 
                         description={directory.description} 
                         premium={directory.premium} 
                         style = {simple_video_style}/>
        </GridListTile>
      );
  });

  const handleSearchChange = (event) => {
    setCourseFilter(event);
  }

//<EmbeddedVideo courseName='nXThNu12Bnp2V4dq6KCW' style = {simple_video_style}/>
  
return (
    <div>
      <h1>Courses</h1>
      <div style={searchBarStyle}>
        <TextField label='Search For Course' fullWidth variant='outlined' onChange={e => handleSearchChange(e.target.value)} defaultValue ={searchCourse}/>
      </div>
      <GridList className={classes.gridList}>
        {courseList}
      </GridList>
    </div>
  );
}

export default Courses;
