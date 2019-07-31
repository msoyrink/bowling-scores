import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Scorelist from '../ScoreList';
import { withRouter } from 'react-router-dom'
import firebase from '../firebase'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,

        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {

        },
        toolbarcontainer: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
        },
        fab: {
            margin: theme.spacing(1),
        },
        divTitle: {

        },
        divAdd: {
            display: "flex",
            justifyContent: "center",
        },
        divLogout: {
            display: "flex",
            justifyContent: "flex-end",
        },
        submit: {
            marginTop: theme.spacing(0),
        },

    }),
);


const Homepage: React.FC = (props: undefined | any) => {
    const classes = useStyles();


    if (!firebase.getCurrentUsername()) {
        // not logged in
        // alert('Please login first')
        props.history.replace('/login')
        return null
    }


    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar className={classes.toolbarcontainer}>
                    <div className={classes.divTitle}>
                        <Typography variant="h6" className={classes.title}>
                            Keilatulokset
                        </Typography>
                    </div>
                    <div className={classes.divAdd}>
                        <Fab href="/score" size="small" color="primary" aria-label="Add" className={classes.fab}>
                            <AddIcon />
                        </Fab>
                    </div>
                    {firebase.getCurrentUsername() && (
                        <div className={classes.divLogout}>
                            <p>{firebase.getCurrentUsername()}</p>
                            <Button
                                size="small"
                                variant="contained"
                                color="secondary"
                                onClick={logout}
                                className={classes.submit}>
                                Logout
          		                </Button>
                        </div>
                    )
                    }

                </Toolbar>
            </AppBar>
            <Scorelist />
        </div>
    )

    async function logout() {
        await firebase.logout()
        props.history.push('/')
    }
}

export default withRouter((Homepage) as any);