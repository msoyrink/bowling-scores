import React, { useState, useEffect } from 'react';

// import scores from './dev-Scores';
import { Container, Icon } from '@material-ui/core';
import { withStyles, makeStyles} from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import firebase from './firebase';

const useStyles = makeStyles({
    container: {
      marginTop: 60,
    },
  });

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {

  },
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);



const Scorelist: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>('panel1')
  const [scoredata, setScoreData] = useState<any[]>()

  const classes = useStyles()

  useEffect(() => {
    const fetchData = async () => {
      const result = await firebase.getAllScores()
      setScoreData(result)
    }
    fetchData()
  }, []);

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  }
  return (
    <Container className={classes.container}>
      {scoredata && scoredata.map((score: any, index: number) => {
        const ariacontrol = "d-content"
        const panelid = "d-header"
        return (

          <ExpansionPanel key={index} square expanded={expanded === score.id} onChange={handleChange(score.id)}>
            <ExpansionPanelSummary aria-controls={ariacontrol} id={panelid}>
              <Typography style={{ flexGrow: 1 }}>{score.place} {score.result}</Typography>
              <Link to={{
                pathname: `/score/${score.id}`,

              }} >
                <Icon>
                  edit
                  </Icon>
              </Link>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                {score.info}
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      }
      )
      }
      {!scoredata && <p>EI TULOKSIA</p>}
      
    </Container>
  )
}

export default Scorelist;