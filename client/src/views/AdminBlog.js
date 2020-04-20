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
import Table from '@material-ui/core/Table';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

/* Import material-ui icons */
import { createMuiTheme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";


/* Import mui-datatables */
import MUIDataTable from 'mui-datatables';

function AdminBlog(props) {

  const [isEditing, setIsEditing] = useState(false);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [width, setWidth] = useState({width: window.innerWidth});

  const theme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#1C1C1C'
      },
    },
     overrides: {
       MUIDataTableSelectCell: {
         expandDisabled: {
           // Soft hide the button.
           visibility: 'hidden',
         },
       },
     },
   });

  useEffect(() => {
    window.addEventListener('resize', setWidth(window.innerWidth));
  });

  // Get collection of users to link user ids and names
  const handleUpdateUsers = () => {
    db.collection('users').get().then(querySnapshot => {
      let tempUsers = [];
      querySnapshot.forEach(doc => {
        let user = {
          id: doc.id,
          name: doc.data().firstName + ' ' + doc.data().lastName,
        }
        tempUsers.push(user);
      });
      setUsers(tempUsers);
    });
  }

  // Get collection of comments
  const handleUpdateComments = () => {
    db.collection('comments').get().then(querySnapshot => {
      let tempComments = [];
      querySnapshot.forEach(doc => {
        let name = '';
        if(users.find(user => user.id == doc.data().userId)) {
          name = users.find(user => user.id == doc.data().userId).name;
        }
        let comment = {
          id: doc.id,
          content: doc.data().content,
          postId: doc.data().postId,
          userId: doc.data().userId,
          timestamp: doc.data().timestamp,
          postTitle: '',
          name: name,
        }
        tempComments.push(comment);
      });
      setComments(tempComments);
    });
  }

  const handleUpdate = () => {
    // Get collection of posts
    db.collection('posts').get().then(querySnapshot => {
      let tempPosts = [];
      querySnapshot.forEach(doc => {
        let tempComments = [];
        comments.forEach(comment => {
          if(comment.postId == doc.id) {
            comment.postTitle = doc.data().title;
            tempComments.push(comment);
          }
        });
        let post = {
            id: doc.id,
            allowCommenting: doc.data().allowCommenting,
            title: doc.data().title,
            content: doc.data().content,
            imageURL: doc.data().imageURL,
            timestamp: doc.data().timestamp,
            views: doc.data().views,
            comments: tempComments,
            numComments: tempComments.length,
            isExpandable: tempComments.length > 0 ? true : false,
        }
        tempPosts.push(post);
      });
      setPosts(tempPosts);
    });
  }

  useEffect(() => {
    handleUpdateUsers();
  }, []);

  useEffect(() => {
    handleUpdateComments();
  }, [users]);

  useEffect(() => {
    handleUpdate();
  }, [comments]);

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    handleUpdate();
  }

  const handleCommentDelete = (tableMeta) => {
    db.collection('comments').doc(tableMeta.rowData[0]).delete();
    handleUpdateComments();
  }

  const handleDelete = (tableMeta) => {
    db.collection('posts').doc(posts[tableMeta.rowIndex].id).delete();
    db.collection('comments').where('postId', '==', posts[tableMeta.rowIndex].id).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.delete();
      });
    });
    handleUpdateComments();
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
      name: 'numComments',
      label: 'Comments',
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
        // Prevent expand/collapse of any row if there is a row expanded already (but allow those already expanded to be collapsed)
        if(posts[dataIndex].isExpandable) {
            if (expandedRows.data.length > 0 && expandedRows.data.filter(d => d.dataIndex === dataIndex).length === 0) return false;
            return true;
        }
        return false;
      },
    filter: false,
    print: false,
    responsive: 'scrollMaxHeight',
    renderExpandableRow: (rowData, rowMeta) => {
      return (
        <TableRow>
          <TableCell colSpan = {11}>
            <MUIDataTable data={posts[rowMeta.rowIndex].comments} columns={commentColumns} options={commentOptions}/>
          </TableCell>
        </TableRow>
      );
    },
    selectableRows: 'none',
    selectableRowsHeader: false,
  };

  const commentColumns = [
    {
      name: 'id',
      label: '',
      options: {
        display: false,
        filter: false,
        sort: false,
        viewColumns: false
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
      name: 'name',
      label: 'Name',
      options: {
        sort: true
      }
    },
    {
      name: 'postTitle',
      label: 'Blog Post Title',
      options: {
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
        name: '',
        label: '',
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <IconButton onClick = {post => handleCommentDelete(tableMeta)}>
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

  const commentOptions = {
    disableToolbarSelect: true,
    download: false,
    elevation: 1,
    expandableRows: false,
    filter: false,
    pagination: false,
    print: false,
    responsive: 'scrollMaxHeight',
    search: false,
    selectableRows: 'none',
    selectableRowsHeader: false,
    viewColumns: false,
  };

  return (
    <div>
      <Container fluid style = {{marginLeft: props.drawerWidth + 50, marginRight: 50, marginTop: 20, maxWidth: (width - props.drawerWidth - 100)}}>
        <MuiThemeProvider theme={theme}>
          <MUIDataTable title={'Manage Blog Posts'} data={posts} columns={columns} options={options}/>
        </MuiThemeProvider>
        <CreateBlogPostDialog open = {open && !isEditing} handleClose = {post => handleClose()}/>
        <UpdateBlogPostDialog open = {open && isEditing} data = {rowData} handleClose = {event => handleClose()}/>
      </Container>
    </div>
  );
}

export default AdminBlog;
