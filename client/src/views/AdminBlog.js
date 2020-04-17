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
    name: 'title',
    label: 'Title'
},{
    name: 'content',
    label: 'Content'
}, {
    name: 'date',
    label: 'Date'
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
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    window.addEventListener('resize', setWidth(window.innerWidth));
  });

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

  return (
    <div>
      <Container fluid style = {{marginLeft: props.drawerWidth + 50, marginRight: 50, marginTop: 20, maxWidth: (width - props.drawerWidth - 100)}}>
      <div style={{marginBottom: 16}}>
          <Chip label={`Blog posts: ${posts.length}`}/>
          <div style={{width:16,height:16}}/>
          <Chip label={`Post total comments: ${comments.length}`}/>
          </div>
        <Card fluid>
          <CardContent>
            <MUIDataTable title={`Blog Posts`} data={posts} columns={columns} options={options}/>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </Container>
    </div>
  );
}

export default Admin;
