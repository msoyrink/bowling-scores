import React from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import fiLocale from "date-fns/locale/fi";
import DateFnsUtils from '@date-io/date-fns';
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
            margin: theme.spacing(1),
        },
    }),
);

const Score: React.FC = (props: undefined|any) => {
    const classes = useStyles();
    const id: string = props.match.params.id ? props.match.params.id : ""
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={fiLocale}>
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
            <ScoreFields id={id} />
        </div>
        </MuiPickersUtilsProvider>
    )
}

export default Score;