import React, { useEffect, useState } from 'react';

/* Import firebase products */
import {db} from '../firebase/firebaseInit';

/* Import material-ui components */
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';

/* Import material-ui icons */
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

/* Import mui-datatables */
import MUIDataTable from 'mui-datatables';

function AdminUsers(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    db.collection('users').get().then(querySnapshot => {
      let tempUsers = [];
      querySnapshot.forEach(doc => {
        let user = {
            uid: doc.data().uid,
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            premium: doc.data().premium,
            role: doc.data().role
        }
        tempUsers.push(user);
        console.log(user);
      });
      setUsers(tempUsers);
    });
  }, []);

  const handleDelete = (tableMeta) => {
    /* TODO: ask client about the ability to delete users */
  }

  const handleEdit = (tableMeta) => {
    setIsEditing(true);
  }
  const handleSubmit = (tableMeta) => {
    /* TODO */
  }
  const columns = [
    {
      name: '',
      label: '',
      options: {
        empty: true,
        filter: false,
        sort: false,
        viewColumns: false
      }
    },
    {
      name: 'firstName',
      label: 'First Name',
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: 'lastName',
      label: 'Last Name',
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: 'premium',
      label: 'Subscription Plan',
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
      name: 'role',
      label: 'Role',
      options: {
        filter: true,
        sort: true
      }
    },
    {
        name: '',
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            if(isEditing) {
              return (
                <IconButton onClick = {event => handleEdit(tableMeta)}>
                  <EditIcon/>
                </IconButton>
              );
            } else {
              return (
                <IconButton onClick = {event => handleEdit(tableMeta)}>
                  <EditIcon/>
                </IconButton>
              );
            }
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
        <MUIDataTable title={'Manage Users'} data={users} columns={columns} options={options}/>
      </Container>
    </div>
  );
}

export default AdminUsers;
