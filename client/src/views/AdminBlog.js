import React, { useEffect, useState } from 'react';

/* Import custom components */
import CreateBlogPostDialog from '../components/CreateBlogPostDialog.js';
import UpdateBlogPostDialog from '../components/UpdateBlogPostDialog.js';

/* Import firebase products */
import {db} from '../firebase/firebaseInit';

/* Import material-ui components */
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

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
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [width, setWidth] = useState({width: window.innerWidth});

  useEffect(() => {
    window.addEventListener('resize', setWidth(window.innerWidth));
  });

  const handleUpdate = () => {
    db.collection('posts').get().then(querySnapshot => {
      let tempPosts = [];
      querySnapshot.forEach(doc => {
        let post = {
            id: doc.id,
            allowCommenting: doc.data().allowCommenting,
            title: doc.data().title,
            content: doc.data().content,
            imageURL: doc.data().imageURL,
            timestamp: doc.data().timestamp,
            views: doc.data().views,
        }
        tempPosts.push(post);
      });
      setPosts(tempPosts);
    });
    console.log('posts', posts);
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
    db.collection('posts').doc(posts[tableMeta.rowIndex].id).delete().then(handleUpdate());
  }
  const handleEdit = (tableMeta) => {
    setRowData(posts[tableMeta.rowIndex]);
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
      name: 'title',
      label: 'Title',
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
      name: 'timestamp',
      label: 'Timestamp',
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
      name: 'content',
      label: 'Content',
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
      name: 'imageURL',
      label: 'Image',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <img src = {value} alt = 'thumbnail' width = '50' height = '50'/>
          );
        },
        filter: false,
        sort: true
      }
    },
    {
      name: 'allowCommenting',
      label: 'Allow Commenting',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          if(value) return 'Yes';
          else return 'No';
        },
        filter: true,
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
              <IconButton onClick = {post => handleEdit(tableMeta)}>
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
              <IconButton onClick = {post => handleDelete(tableMeta)}>
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
        <IconButton onClick = {post => setOpen(true)}>
          <AddIcon/>
        </IconButton>
      );
    },
    disableToolbarSelect: true,
    download: false,
    elevation: 1,
    expandableRows: true,
    isRowExpandable: (dataIndex, expandedRows) => {
        // Prevent expand/collapse of any row if there are 4 rows expanded already (but allow those already expanded to be collapsed)
        if (expandedRows.data.length > 0 && expandedRows.data.filter(d => d.dataIndex === dataIndex).length === 0) return false;
        return true;
      },
    filter: false,
    print: false,
    responsive: 'scrollMaxHeight',
    renderExpandableRow: (rowData, rowMeta) => {
      const colSpan = rowData.length + 1;
      return (
        <TableRow>
          <TableCell colSpan={colSpan}>
            Custom expandable row option.
          </TableCell>
        </TableRow>
      );
    },
    onRowsExpand: (curExpanded, allExpanded) => console.log(curExpanded, allExpanded),
    selectableRows: 'none',
    selectableRowsHeader: false,
  };

  return (
    <div>
      <Container fluid style = {{marginLeft: props.drawerWidth + 50, marginRight: 50, marginTop: 20, maxWidth: (width - props.drawerWidth - 100)}}>
        <MUIDataTable title={'Manage Blog Posts'} data={posts} columns={columns} options={options}/>
        <CreateBlogPostDialog open = {open && !isEditing} handleClose = {post => handleClose()}/>
        <UpdateBlogPostDialog open = {open && isEditing} data = {rowData} handleClose = {event => handleClose()}/>
      </Container>
    </div>
  );
}

export default AdminBlog;
