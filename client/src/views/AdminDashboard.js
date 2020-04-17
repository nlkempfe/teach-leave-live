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

// const tracker = new Tracker();

function Admin(props) {
  const [width, setWidth] = useState({width: window.innerWidth});

  useEffect(() => {
    window.addEventListener('resize', setWidth(window.innerWidth));
  });

  return (
    <div>
      <Container fluid style = {{marginLeft: props.drawerWidth + 50, marginRight: 50, marginTop: 20, maxWidth: (width - props.drawerWidth - 100)}}>
        <Card fluid>
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
