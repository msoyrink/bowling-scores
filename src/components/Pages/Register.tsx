import React, { useState } from 'react'
import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom'
import firebase from '../firebase'

const useStyles = makeStyles((theme: Theme) => createStyles({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        marginTop: theme.spacing(3),
    },
}),
);

const Register: React.FC = (props: any) => {
    const classes = useStyles()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleFormSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<boolean> => {
        e.preventDefault();
        return false
    };

    return (
        <main className={classes.main}>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Tunnusten rekisteröinti
       			</Typography>
                <form className={classes.form} onSubmit={handleFormSubmit}>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="name">Nimi</InputLabel>
                        <Input id="name" name="name" autoComplete="off" autoFocus value={name} onChange={e => setName(e.target.value)} />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Sähköpostiosoite</InputLabel>
                        <Input id="email" name="email" autoComplete="off" value={email} onChange={e => setEmail(e.target.value)} />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">Salasana</InputLabel>
                        <Input name="password" type="password" id="password" autoComplete="off" value={password} onChange={e => setPassword(e.target.value)} />
                    </FormControl>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={onRegister}
                        className={classes.submit}>
                        Rekisteröi
          			</Button>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        component={Link}
                        to="/login"
                        className={classes.submit}>
                        Takaisin kirjautumiseen
          			</Button>
                </form>
            </Paper>
        </main>
    )

    async function onRegister() {
        try {
            await firebase.register(name, email, password)
            props.history.replace('/')
        } catch (error) {
            alert(error.message)
        }
    }
}

export default withRouter((Register) as any)