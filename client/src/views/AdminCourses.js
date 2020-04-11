import React, { useEffect, useState } from 'react';

/* Import custom components */
import CreateCourseDialog from '../components/CreateCourseDialog.js';
import UpdateCourseDialog from '../components/UpdateCourseDialog.js';

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

function AdminCourses(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [width, setWidth] = useState({width: window.innerWidth});

  useEffect(() => {
    window.addCourseListener('resize', setWidth(window.innerWidth));
  });

  const handleUpdate = () => {
    db.collection('courses').get().then(querySnapshot => {
      let tempCourses = [];
      querySnapshot.forEach(doc => {
        let course = {
            id: doc.id,
            name: doc.data().name,
            description: doc.data().description.join(),
            link: doc.data().link,
            premium: doc.data().premium,
        }
        tempCourses.push(event);
      });
      setCourses(tempCourses);
    });
  }

  useEffect(() => {
    handleUpdate();
  }, []);

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    handleUpdate();
  }

  const handleDelete = (tableMeta) => {
    db.collection('courses').doc(courses[tableMeta.rowIndex].id).delete().then(handleUpdate());
  }
  const handleEdit = (tableMeta) => {
    setRowData(courses[tableMeta.rowIndex]);
    setIsEditing(true);
    setOpen(true);
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
      label: 'Course Name',
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: 'dateAndTime',
      label: 'Date & Time',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const d = value.toDate();
          const date = ("0"+(d.getMonth()+1)).slice(-2)  + "/" + ("0" + d.getDate()).slice(-2) + "/" + d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)
          return (date);
        },
        filter: false,
        sort: true
      }
    },
    {
      name: 'description',
      label: 'Description',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          if(value.length > 30) {
            return (value.substring(0, 30) + '...');
          } else {
            return (value);

          }
        },
        filter: false,
        sort: true
      }
    },
    {
      name: 'address',
      label: 'Address',
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: 'city',
      label: 'City',
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: 'state',
      label: 'State',
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: 'zip',
      label: 'Zipcode',
      options: {
        filter: false,
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
        label: '',
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
      },
  ];
  const options = {
    customToolbar: () => {
      return (
        <IconButton onClick = {event => setOpen(true)}>
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
      <Container fluid style = {{marginLeft: props.drawerWidth + 50, marginRight: 50, marginTop: 20, maxWidth: (width - props.drawerWidth - 100)}}>
        <MUIDataTable title={'Manage Courses'} data={courses} columns={columns} options={options}/>
        // <CreateCourseDialog open = {open && !isEditing} handleClose = {event => handleClose()}/>
        // <UpdateCourseDialog open = {open && isEditing} data = {rowData} handleClose = {event => handleClose()}/>
      </Container>
    </div>
  );
}

export default AdminCourses;
