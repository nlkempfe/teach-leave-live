import React from 'react';
import Box from "@material-ui/core/Box";
import {Grid, Typography} from "@material-ui/core";

let BlogHeader = () => {

    let styles = {
        headerGrid: {
            height: '45vh',
            width: '100%'
        },
        headerBox: {
            width: '50%'
        }
    };


    return (<div>
        <Grid container spacing={0} justify='center' alignItems='center' style={styles.headerGrid}>
            <Box bgcolor="#424242DF" mx="auto" style={styles.headerBox} py={5}>
                <Typography variant="h1">Blog</Typography>
            </Box>
        </Grid>
    </div>);
};

export default BlogHeader;
