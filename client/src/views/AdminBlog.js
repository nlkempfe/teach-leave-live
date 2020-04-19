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

function AdminBlog(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [width, setWidth] = useState({width: window.innerWidth});

  useEffect(() => {
    window.addEventListener('resize', setWidth(window.innerWidth));
  });

  const handleUpdate = () => {
    db.collection('courses').get().then(querySnapshot => {
      let tempCourses = [];
      querySnapshot.forEach(doc => {
        let course = {
            id: doc.id,
            name: doc.data().name,
            description: doc.data().description,
            link: doc.data().link,
            premium: doc.data().premium,
            views: doc.data().views,
        }
        tempCourses.push(course);
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
      name: 'link',
      label: 'Link',
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
          if(value) {
            return 'Premium';
          } else {
            return 'Free';
          }
        },
        filter: false,
        sort: true
      }
    },
    {
      name: 'views',
      label: 'Views',
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
              <IconButton onClick = {course => handleEdit(tableMeta)}>
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
              <IconButton onClick = {course => handleDelete(tableMeta)}>
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
        <IconButton onClick = {course => setOpen(true)}>
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
        <CreateCourseDialog open = {open && !isEditing} handleClose = {course => handleClose()}/>
        <UpdateCourseDialog open = {open && isEditing} data = {rowData} handleClose = {event => handleClose()}/>
      </Container>
    </div>
  );
}

export default AdminBlog;
