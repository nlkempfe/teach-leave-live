import React, { useState, useEffect } from 'react';

//import components
import EmbeddedVideo from '../components/EmbeddedVideo.js'

//import material-ui
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

//import firebase
import {auth, provider, db} from '../firebase/firebaseInit';


//Style for GridList
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
    width: '100%',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    height: '100%',
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
  const [activeName, setActiveName] = useState('');
  const [activeDescription, setActiveDescription] = useState('')
  const [activePremium, setActivePremium] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [courseActive, setCourseActive] = useState(false);
  const [courses, setCourses] = useState([]);
  const [courseFilter, setCourseFilter] = useState('');

  const classes = useStyles();

  //removes courses whose names don't containt the characters in the search bar
  const filteredCourses = courses.filter(course => course.name.toLowerCase().includes(courseFilter.toLowerCase()));

  //style for the video in the EmbeddedVideo component
  const simple_video_style = {
    width: '100'
  }

  //Style for search bar
  const searchBarStyle = {
    paddingLeft: '2.5%',
    width: '25%',
    paddingTop: 30
  };

  //gets list of courses
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

  //Styles each element in the GridList
  const listElementStyle = {
      height: '100%',
      width: '20%',
      paddingRight: '2%'
  }

  //Styles the Courses header
  const headerStyle = {
    position: 'fixed',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    paddingTop: 20
  }

  //Creates the list of courses by making each course into an EmbeddedVideo
  const courseList = filteredCourses.map(directory => {
      return (
        <GridListTile style={listElementStyle}>
          <EmbeddedVideo link={directory.link} 
                         name={directory.name} 
                         description={directory.description} 
                         premium={directory.premium} 
                         style={simple_video_style}
                         setFilter={setCourseFilter}
                         shouldDisplay={false}
                         setActive={setCourseActive}
                         setPremium={setActivePremium}
                         setLink={setActiveLink}
                         setName={setActiveName}
                         setDescription={setActiveDescription}/>
        </GridListTile>
      );
  });

  //sets course filter
  const handleSearchChange = (event) => {
    setCourseFilter(event);
  }

  //Styles div around GridList
  const listStyle = {
    padding: '2.5%'
  }

  //If course is active only display that youtube video otherwise display the list of courses
  const chooseDisplay = () => {
    console.log(courseActive);
    if (courseActive)
    {
      return (
      <EmbeddedVideo link={activeLink} 
      name={activeName} 
      description={activeDescription} 
      premium={activePremium} 
      style={simple_video_style}
      setFilter={setCourseFilter}
      shouldDisplay={true}
      setActive={setCourseActive}
      setPremium={setActivePremium}
      setLink={setActiveLink}
      setName={setActiveName}
      setDescription={setActiveDescription}/>)
    }
    else
    {
      return (
      <div>
        <h1 style={headerStyle}>Courses</h1>
        <div style={searchBarStyle}>
        <TextField label='Search For Course' fullWidth variant='outlined' onChange={e => handleSearchChange(e.target.value)} defaultValue ={courseFilter}/>
        </div>
        <div style={listStyle}>
          <GridList className={classes.gridList}>
            {courseList}
          </GridList>
        </div> 
      </div>
      )
    }
  }
  
return (
    <div>
      {chooseDisplay()}
    </div>
  );
}

export default Courses;
