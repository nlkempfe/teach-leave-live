import React, { useState } from 'react';

/* Import controllers */
import {getUsers} from "../firebase/controllers";

/* Import custom components */
import PagedTable from '../components/PagedTable.js';

/* Import material-ui components */
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function createData(name, calories, fat) {
  return { name, calories, fat };
}

function AdminUsers(props) {
  console.log('user function called');

  const rows = [{name: 'test', premium: true, role: 'user'}];

  return (
    <div>
      <Container fluid style = {{marginLeft: props.drawerWidth + 50, marginRight: 50}}>
        <Card fluid style = {{marginTop: 20}}>
          <CardContent>
            <Typography variant = 'h6'>Manage Users</Typography>
            <PagedTable data = {rows} />
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </Container>
    </div>
  );
}

export default AdminUsers;
