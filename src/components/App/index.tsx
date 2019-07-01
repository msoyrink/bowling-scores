import React from 'react';
import './styles.css'
import HomePage from '../HomePage'
import Login from '../Login'
import Register from '../Register'
import Score from '../Score'
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