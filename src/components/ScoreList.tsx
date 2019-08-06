import React, { useState, useEffect } from 'react';

import { Container, Icon, Box } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import firebase from './firebase';
import { IScores } from '../ts/interfaces/score_interface';
import ScoreListDetails from './ScoreListdetails';
import { format } from 'date-fns';

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

const ExpansionPanelDetails = withStyles((theme: any) => ({
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
      {scoredata && scoredata.map((score: IScores, index: number) => {
        const ariacontrol = "d-content"
        const panelid = "d-header"
        const info = score.info ? score.info : ""
        return (

          <ExpansionPanel key={index} square expanded={expanded === score.id} onChange={handleChange(score.id)}>
            <ExpansionPanelSummary aria-controls={ariacontrol} id={panelid}>
              <div style={{ flexGrow: 1 }}>
                <Box display="flex" mr={1}>
                  <div style={{ flexGrow: 1 }}>
                    <Typography variant="h6">
                      {format(score.pvm, 'dd.MM.yyyy')}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="h6">
                      {score.result}
                    </Typography>
                  </div>
                </Box>
                <div>
                  <Typography variant="subtitle1">
                    {score.place}
                  </Typography>
                </div>

              </div>
              <Box ml={1}>
                <Link to={{
                  pathname: `/score/${score.id}`,

                }} >
                  <Icon color="secondary">
                    edit
                  </Icon>
                </Link>
              </Box>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography variant="body1">
                <ScoreListDetails
                  pvm={format(score.pvm, 'dd.MM.yyyy')}
                  series={score.series}
                  strikes={score.strikes}
                  info={info}
                />
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      }
      )
      }
      {!scoredata && <p></p>}

    </Container>
  )
}

export default Scorelist;