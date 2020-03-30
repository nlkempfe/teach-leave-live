import React, { useState } from 'react';

/* Import firebase products */
import {db} from '../firebase/firebaseInit';

/* Import material-ui components */
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

/* Import material-ui icons */
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

/* Import mui-datatables */
import MUIDataTable from 'mui-datatables';

function AdminUsers(props) {
  const [isEditing, setIsEditing] = useState(false);
  const columns = [
    {name: '',
      options: {
        empty: true,
        filter: false,
        sort: false,
        viewColumns: false
      }
    },
    {
      name: 'First Name',
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: 'Last Name',
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: 'Subscription Plan',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          if (isEditing)
            return (
              <Select autoWidth = {true} value={value} variant = 'outlined'>
                <MenuItem value={true}>Premium</MenuItem>
                <MenuItem value={false}>Free</MenuItem>
              </Select>
            );
          else {
            if(value) return 'Premium';
            else return 'Free';
          }
        },
        filter: true,
        sort: true
      }
    },
    {
      name: 'Role',
      options: {
        filter: true,
        sort: true
      }
    },
    {
        name: '',
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            if (isEditing)
              return (
                <IconButton onClick = {() => setIsEditing(false)}>
                  <ClearIcon/>
                </IconButton>
              );
            else
              return (
                <IconButton onClick = {() => setIsEditing(true)}>
                  <EditIcon/>
                </IconButton>
              );
          },
          filter: false,
          sort: false,
          viewColumns: false
        }
      },
      {
          name: '',
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              if (isEditing)
                return (
                  <IconButton onClick = {() => setIsEditing(false)}>
                    <CheckIcon/>
                  </IconButton>
                );
              else
                return (
                  <IconButton onClick = {() => setIsEditing(true)}>
                    <DeleteIcon/>
                  </IconButton>
                );
            },
            filter: false,
            sort: false,
            viewColumns: false
          }
        }
  ];

  const data = [
   ['Natascha', 'Kempfe', true, 'admin'],
  ];

  const options = {
    disableToolbarSelect: true,
    download: false,
    elevation: 1,
    filterType: 'checkbox',
    print: false,
    selectableRows: 'none',
    selectableRowsHeader: false,
  };

  return (
    <div>
      <Container fluid style = {{marginLeft: props.drawerWidth + 50, marginRight: 50, marginTop: 20}}>
        <MUIDataTable
          title={'Manage Users'}
          data={data}
          columns={columns}
          options={options}
        />
      </Container>
    </div>
  );
}

export default AdminUsers;
