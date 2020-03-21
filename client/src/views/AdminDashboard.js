import React, { useState } from 'react';

/* Import custom components */
import DashboardChart from '../components/DashboardChart.js';

/* Import material-ui components */
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function Admin(props) {
  console.log(props.drawerWidth);
  return (
    <div>
      <Container fluid style = {{marginLeft: props.drawerWidth + 50, marginRight: 50}}>
        <Card fluid style = {{marginTop: 20}}>
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
