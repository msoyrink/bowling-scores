import React from 'react';
import { Link } from 'react-router-dom'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RepIcon from '@material-ui/icons/Assessment';
import Scorelist from '../ScoreList';
import { withRouter } from 'react-router-dom'
import firebase from '../firebase'
import { IconButton, Menu, MenuItem, Box, Divider } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';



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
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);


    if (!firebase.getCurrentUsername()) {
        // not logged in
        // alert('Please login first')
        props.history.replace('/login')
        return null
    }

    function handleMenu(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
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
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                                <Box component="span" display={{ xs: 'none', sm: 'block' }}>
                                    {firebase.getCurrentUsername()}
                                </Box>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={logout}>{firebase.getCurrentUsername()}</MenuItem>
                                <Divider />
                                <MenuItem component={Link} to="/reports">
                                    <RepIcon color="action"/>Tilastot
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={logout}>Kirjaudu ulos</MenuItem>
                            </Menu>

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