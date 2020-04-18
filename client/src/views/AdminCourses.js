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
import { db } from '../firebase/firebaseInit.js';
import Chip from '@material-ui/core/Chip';
import MUIDataTable from 'mui-datatables';

// const tracker = new Tracker();

const columns = [{
    name: 'name',
    label: 'Name'
},{
    name: 'description',
    label: 'Description'
},{
    name: 'clickedCount',
    label: 'Views'
}];

const options = {
    disableToolbarSelect: true,
    download: false,
    elevation: 1,
    filterType: 'checkbox',
    print: false,
    responsive: 'scrollMaxHeight',
    selectableRows: 'none',
    selectableRowsHeader: false,
  };

function Admin(props) {
  const [width, setWidth] = useState({width: window.innerWidth});
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    window.addEventListener('resize', setWidth(window.innerWidth));
  });

  useEffect(() => {
    db.collection('courses').get().then(s => {
        const newCourses = s.docs.map(d => d.data());
        setCourses(newCourses);
    });
  }, []);

  return (
    <div>
      <Container fluid style = {{marginLeft: props.drawerWidth + 50, marginRight: 50, marginTop: 20, maxWidth: (width - props.drawerWidth - 100)}}>
      <div style={{marginBottom: 16}}>
          <Chip label={`Courses: ${courses.length}`}/>
          </div>
        <Card fluid>
          <CardContent>
            <MUIDataTable title={`Courses`} data={courses} columns={columns} options={options}/>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </Container>
    </div>
  );
}

export default Admin;
