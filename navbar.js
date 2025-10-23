import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory, Router, Route, Link } from "react-router-dom";
import ComparisonPage from './compare.js';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const ButtonAppBar = (props) => {
  const classes = useStyles();
  const history = useHistory();

  this.handleClick = handleClick.bind(this);

  function handleClick() {
    history.push("/compare");
  }

  function renderCompare(showCompare) {
    if (window.location.pathname == "/") {
      if (showCompare) {
        return (<Button variant="contained" color="secondary" size="large" onClick={handleClick}>Compare</Button>)
      }
      else {
        return (<Typography variant="subtitle1"> SELECT TWO TO COMPARE</Typography>) 
      }

    }
  }

  function renderBack() {
    if (window.location.pathname == "/compare") {
      return (<Button variant="contained" color="secondary" size="large" onClick={history.goBack}>Back</Button>)
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            AI Showcase
          </Typography>
          {renderCompare(props.showCompare)}
          {renderBack()}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default ButtonAppBar;