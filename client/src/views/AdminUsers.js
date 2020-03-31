import React, { useState } from 'react';

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
  const rows = [
  createData('Cupcake', 305, 3.7),
  createData('Donut', 452, 25.0),
  createData('Eclair', 262, 16.0),
  createData('Frozen yoghurt', 159, 6.0),
  createData('Gingerbread', 356, 16.0),
  createData('Honeycomb', 408, 3.2),
  createData('Ice cream sandwich', 237, 9.0),
  createData('Jelly Bean', 375, 0.0),
  createData('KitKat', 518, 26.0),
  createData('Lollipop', 392, 0.2),
  createData('Marshmallow', 318, 0),
  createData('Nougat', 360, 19.0),
  createData('Oreo', 437, 18.0),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

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
