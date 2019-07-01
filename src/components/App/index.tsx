import React from 'react';
import './styles.css'
import HomePage from '../Pages/HomePage'
import Login from '../Pages/Login'
import Register from '../Pages/Register'
import Score from '../Pages/Score'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { CssBaseline, CircularProgress } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const theme = createMuiTheme()

const App: React.FC = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/score" component={Score} />
                </Switch>
            </Router>
        </MuiThemeProvider>
    )
}

export default App;