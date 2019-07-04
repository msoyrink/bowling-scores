import React from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ScoreFields from '../ScoreFields';
import { withRouter } from 'react-router-dom';

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
            margin: theme.spacing(1),
        },
    }),
);

const Score: React.FC = (props: any) => {
    const classes = useStyles();
    const id = props.match.params.id
    console.log(id)
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Button size="small" color="inherit" href="/" >
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

export default withRouter((Score) as any);