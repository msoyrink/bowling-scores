import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Scorelist from './ScoreList';


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

    }),
);


const Homepage: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolbarcontainer}>
                    <div className={classes.divTitle}>
                        <Typography variant="h6" className={classes.title}>
                        Keilaustulokset
                        </Typography>
                    </div>
                    <div className={classes.divAdd}>
                        <Fab href="/score" color="primary" aria-label="Add" className={classes.fab}>
                            <AddIcon />
                        </Fab>
                    </div>
                    <div className={classes.divLogout}>
                        <Button color="inherit">Logout</Button>
                    </div>
                </Toolbar>
            </AppBar>
            <Scorelist />
        </div>
    )
}

export default Homepage;