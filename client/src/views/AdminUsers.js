import React, { useState } from 'react';

/* Import custom components */
import EditUserDialog from '../components/EditUserDialog.js';

/* Import firebase products */
import {db} from '../firebase/firebaseInit';

/* Import material-ui components */
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';

/* Import material-ui icons */
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

/* Import mui-datatables */
import MUIDataTable from 'mui-datatables';

function AdminUsers(props) {
  const [isEditing, setIsEditing] = useState(false);
  const handleDelete = (tableMeta) => {
    /* TODO */
  }

  const handleEdit = (tableMeta) => {
    /* TODO */
    setIsEditing(true);
  }

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
          if(value) return 'Premium';
          else return 'Free';
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
            return (
              <IconButton onClick = {event => handleEdit(tableMeta)}>
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
              return (
                <IconButton onClick = {event => handleDelete(tableMeta)}>
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
   ['test', 'test', true, 'admin'],
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
        <EditUserDialog open = {isEditing}/>
      </Container>
    </div>
  );
}

export default AdminUsers;
