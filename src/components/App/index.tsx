import React, { useEffect, useState } from 'react';
import './styles.css'
import firebase from '../firebase';
import HomePage from '../Pages/HomePage'
import Login from '../Pages/Login'
import Register from '../Pages/Register'
import Reports from '../Pages/Reports';
import Score from '../Pages/Score'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { CssBaseline, CircularProgress } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'



const theme = createMuiTheme({
    palette: {
        type: 'light',
    },
})

const App: React.FC = () => {

    const [firebaseInitialized, setFirebaseInitialized] = useState(false)

    useEffect(() => {
        firebase.isInitialized().then(val => {
            setFirebaseInitialized(val)
        })
    })

    return firebaseInitialized !== false ? (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/reports" component={Reports} />
                    <Route exact path={["/score/:id", "/score"]} component={Score} />
                </Switch>
            </Router>
        </MuiThemeProvider>
    ) : <div id="loader"><CircularProgress /></div>
}

export default App;