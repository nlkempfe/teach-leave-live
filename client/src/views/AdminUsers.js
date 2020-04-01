import React, { useEffect, useState } from 'react';

/* Import firebase products */
import {db} from '../firebase/firebaseInit';

/* Import material-ui components */
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


/* Import material-ui icons */
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';

/* Import mui-datatables */
import MUIDataTable from 'mui-datatables';

function AdminUsers(props) {
  const [isEditing, setIsEditing] = useState(false);

  const [isPremium, setIsPremium] = useState(false);
  const [rowIndex, setRowIndex] = useState(null);
  const [role, setRole] = useState('user');
  const [users, setUsers] = useState([]);
  const [width, setWidth] = useState({width: window.innerWidth});

  useEffect(() => {
    window.addEventListener('resize', setWidth(window.innerWidth));
  });

  const handleUpdate = () => {
    db.collection('users').get().then(querySnapshot => {
      let tempUsers = [];
      querySnapshot.forEach(doc => {
        let user = {
            uid: doc.data().uid,
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            email: doc.data().email,
            premium: doc.data().premium,
            role: doc.data().role
        }
        tempUsers.push(user);
      });
      setUsers(tempUsers);
    });
  }

  useEffect(() => {
    handleUpdate();
  }, []);


  const handleDelete = (tableMeta) => {
    /* TODO */
  }
  const handleEdit = (tableMeta) => {
    setIsEditing(true);
    setRowIndex(tableMeta.rowIndex);
    setIsPremium(tableMeta.rowData[4]);
    setRole(tableMeta.rowData[5]);
  }
  const handleRoleChange = (role) => {
    setRole(role);
  }

  const handleSubmit = (tableMeta) => {
    setIsEditing(false);
    db.collection('users').doc(users[tableMeta.rowIndex].uid).update({premium: isPremium, role: role}).then(handleUpdate());
  }
  const handleSubscriptionPlanChange = (isPremium) => {
    setIsPremium(isPremium);
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
        customBodyRender: (value, tableMeta, updateValue) => {
          return value;
        },
        filter: false,
        sort: true
      }
    },
    {
      name: 'lastName',
      label: 'Last Name',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value;
        },
        filter: false,
        sort: true
      }
    },
    {
      name: 'email',
      label: 'E-Mail Address',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value;
        },
        filter: false,
        sort: true
      }
    },
    {
      name: 'premium',
      label: 'Subscription Plan',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          if(isEditing && tableMeta.rowIndex === rowIndex ) {
            return (
              <Select variant = 'outlined' value = {isPremium} onChange = {event => handleSubscriptionPlanChange(event.target.value)}>
                <MenuItem value = {true}>Premium</MenuItem>
                <MenuItem value = {false}>Free</MenuItem>
              </Select>
            );
          } else {
            if(value) return 'Premium';
            else return 'Free';
          }
        },
        filter: true,
        sort: true
      }
    },
    {
      name: 'role',
      label: 'Role',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          if(isEditing && tableMeta.rowIndex === rowIndex ) {
            return (
              <Select variant = 'outlined' value = {role} onChange = {event => handleRoleChange(event.target.value)}>
                <MenuItem value = {'admin'}>Admin</MenuItem>
                <MenuItem value = {'user'}>User</MenuItem>
              </Select>
            );
          } else {
            if(value === 'admin') {
              return 'Admin';
            } else {
              return 'User';
            }
          }
        },
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
                <IconButton onClick = {event => handleSubmit(tableMeta)}>
                  <DoneIcon/>
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
        label: '',
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            if(isEditing) {
              return (
                <IconButton onClick = {event => setIsEditing(false)}>
                  <CloseIcon/>
                </IconButton>
              );
            } else {
              return (
                <IconButton onClick = {event => handleDelete(tableMeta)}>
                  <DeleteIcon/>
                </IconButton>
              );
            }
          },
          filter: false,
          sort: false,
          viewColumns: false
        }
      },
  ];
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

  return (
    <div>
      <Container fluid style = {{marginLeft: props.drawerWidth + 50, marginRight: 50, marginTop: 20, maxWidth: (width - props.drawerWidth - 100)}}>
          <MUIDataTable title={'Manage Users'} data={users} columns={columns} options={options}/>
      </Container>
    </div>
  );
}

export default AdminUsers;
