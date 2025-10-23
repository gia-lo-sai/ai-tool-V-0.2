import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ButtonAppBar from './navbar.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class ComparisonPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider>
      <div style={{'padding':'50px 20px 50px 20px'}}>
        <Typography variant="h4" component="h2" align="center" gutterBottom="true">
          Score Comparison
        </Typography>
        {renderComparison(this.props.comparison)}
      </div>
      </MuiThemeProvider>
    )
  }
}


function renderComparison(data){
  const categories = Object.keys(data[0]['scores']);
  return (
      <TableContainer>
      <Table minwidth = "650" aria-label="simple table">
        <colgroup>
          <col style={{width:'10%'}}/>
          <col style={{width:'45%'}}/>
          <col style={{width:'45%'}}/>
        </colgroup>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>
              <Typography variant="h5" component="h2" align="center">
                {data[0]['name']}
              </Typography>
              <Typography color="textSecondary" align="center">
                {data[0]['description']}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5" component="h2" align="center">
                {data[1]['name']}
              </Typography>
              <Typography color="textSecondary" align="center">
                {data[1]['description']}
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map(key => (
            <TableRow key={key}>
              <TableCell component="th" scope="row">
                {key}
              </TableCell>
              <TableCell align="center">{data[0]['scores'][key]}</TableCell>
              <TableCell align="center">{data[1]['scores'][key]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default ComparisonPage;