import React from 'react';
import { AppBar, Toolbar, Fab, Button } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ScoreFields from '../ScoreFields';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        fab: {
            margin: theme.spacing(1),
        },
        title: {
            flexGrow: 1,
        },
        icon: {
            margin: theme.spacing(2),
        },
    }),
);

const Score: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" href="/" >
                        <Icon className={classes.icon}  >
                            keyboard_backspace
                    </Icon>
                    </Button>
                </Toolbar>
            </AppBar>
            <ScoreFields />
        </div>
    )
}

export default Score;