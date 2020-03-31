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
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';

/* Import mui-datatables */
import MUIDataTable from 'mui-datatables';

function AdminEvent(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [rowIndex, setRowIndex] = useState(null);
  const [events, setEvents] = useState([]);

  const handleUpdate = () => {
    db.collection('events').get().then(querySnapshot => {
      let tempEvents = [];
      querySnapshot.forEach(doc => {
        let event = {
            id: doc.data().id,
            name: doc.data().name,
            dateAndTime: doc.data().dateAndTime,
            description: doc.data().description,
            address: doc.data().address,
            city: doc.data().city,
            state: doc.data().city,
            zip: doc.data().zip,
        }
        tempEvents.push(event);
      });
      setEvents(tempEvents);
    });
  }

  useEffect(() => {
    handleUpdate();
  }, []);

  const handleAdd = () => {
    /* TODO */
  }
  const handleDelete = (tableMeta) => {
    /* TODO */
  }
  const handleEdit = (tableMeta) => {
    setIsEditing(true);
    setRowIndex(tableMeta.rowIndex);
  }
  const handleSubmit = (tableMeta) => {
    setIsEditing(false);
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
      name: 'name',
      label: 'Event Name',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value;
        },
        filter: false,
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
    customToolbar: () => {
      return (
        <IconButton onClick = {event => handleAdd()}>
          <AddIcon/>
        </IconButton>
      );
    },
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
      <Container fluid style = {{marginLeft: props.drawerWidth + 50, marginRight: 50, marginTop: 20}}>
        <MUIDataTable title={'Manage Events'} data={events} columns={columns} options={options}/>
      </Container>
    </div>
  );
}

export default AdminEvent;
