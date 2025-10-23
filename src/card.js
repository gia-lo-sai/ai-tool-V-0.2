import React, {Component, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import ToggleButton from '@material-ui/lab/ToggleButton';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    display: 'flex',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  pos: {
    marginBottom: 12,
  },
  check: {
    marginLeft: 'auto',
    padding: '15px 15px 15px 15px',
  },
});

const OutlinedCard = (props) => {
  let listing = props.listing;
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const [status, setState] = React.useState(false);

  //const [selected, setSelected] = React.useState(false);
  function handleChange() {
    var newStatus = props.handleCheckCount(!status, props.id);
    setState(newStatus);
    
  }

  return (
    <Card className={classes.card} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {listing['name']}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        {listing['description']}
        </Typography>
        <Typography variant="h6" component="h6">
        Scores
        </Typography>
          {Object.entries(listing['scores']).map(([key, value]) =>
          <Typography variant="body2" component="p"> 
          {key}: {value}
          </Typography>
          )}
      </CardContent>
      <div className={classes.check}>
        <ToggleButton value="check" selected={status} onChange={() => {handleChange()}}
        >
          <CheckIcon />
        </ToggleButton>
      </div>
    </Card>
  )
}

export default OutlinedCard;