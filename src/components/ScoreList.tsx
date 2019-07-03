import React, { useState } from 'react';

import scores from './dev-Scores';
import { Container, Icon } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';


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

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  }
  return (
    <Container>
      {scores.map((score, index) => {
        const ariacontrol = "d-content"
        const panelid = "d-header"
        return (

          <ExpansionPanel key={index} square expanded={expanded === score.uid} onChange={handleChange(score.uid)}>
            <ExpansionPanelSummary aria-controls={ariacontrol} id={panelid}>
              <Typography style={{ flexGrow: 1 }}>{score.Place} {score.Score}</Typography>
              <Link to={{
                pathname: '/score/',

              }} >
                <Icon>
                  edit
                  </Icon>
              </Link>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                {score.Info}
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      }
      )
      }
    </Container>
  )
}

export default Scorelist;