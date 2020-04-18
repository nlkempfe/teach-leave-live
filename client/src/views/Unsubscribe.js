import React, {useState} from 'react';
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {db} from "../firebase/firebaseInit";
import Alert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {debounce} from 'lodash';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";


const useStyles = makeStyles({
    root: {
        maxWidth: '100%',
    },
    media: {
        height: '100%',
    },
});

let Unsubscribe = () => {

    const [email, setEmail] = useState('');
    const [errorText, setErrorText] = useState('');
    const [showSuccessSnackBar, setShowSuccessSnackBar] = useState(false);
    const [showNotFoundSnackBar, setShowNotFoundSnackBar] = useState(false);
    const [isError, setIsError] = useState(false);
    const [reRender, setRerender] = useState(false);


    //style for div around entire newsletter card
    const newsletterStyle = {
        width: '25%',
        float: 'left'
    };

    const classes = useStyles();

    const handleSubmit = () => {
        if (email.match(/\S+@\S+\.\S+/))
        {
            //Delete from db then show success snackbar
            let deleteEmail = db.collection('subscribers').where('email', '==', email).get()
                .then((query) => {
                    if(query.empty){
                        setShowNotFoundSnackBar(true);
                    }
                    else{
                        query.forEach((doc) => {
                            let docRef = doc.ref;
                            docRef.delete().then(() => {
                                setShowSuccessSnackBar(true);
                            })
                        })
                    }
                })
        }
        else
        {
            setErrorText('Invalid Email');
            setIsError(true);
        }
    };

    //Handles change in email textfield but debounce prevents it from updating too often. Reset any errors.
    const handleEmailChange = debounce ((tempEmail) => {
        setEmail(tempEmail);
        setErrorText('');
        setIsError(false);
    }, 500);

    //Close success message 'snack bar'
    let handleSuccessClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowSuccessSnackBar(false);
    };

    //Close success message 'snack bar'
    let handleNotFoundClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowNotFoundSnackBar(false);
    };

    return(<div >
        <Container>
            <h1>We're sorry to see you go!</h1>
            <Card className={classes.root}>
                <CardContent>
                    <h3>Unsubscribe from our newsletter below</h3>
                    <TextField error={isError} helperText={errorText} label='Email' fullWidth variant='outlined' required onChange={e => handleEmailChange(e.target.value)}/>
                </CardContent>
                <CardActions>
                    <Button variant='contained' color='primary' onClick = {e => handleSubmit()}>Submit</Button>
                </CardActions>
            </Card>
            <Snackbar open={showSuccessSnackBar} autoHideDuration={6000} onClose={handleSuccessClose}>
                <Alert onClose={handleSuccessClose} severity="success">
                    Successfully unsubscribed from our newsletter!
                </Alert>
            </Snackbar>
            <Snackbar open={showNotFoundSnackBar} autoHideDuration={6000} onClose={handleNotFoundClose}>
                <Alert onClose={handleNotFoundClose} severity="error">
                    That email isn't subscribed to our newsletter!
                </Alert>
            </Snackbar>
        </Container>
    </div>);

};

export default Unsubscribe;
