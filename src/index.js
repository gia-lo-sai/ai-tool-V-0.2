import React, { Component, lazy} from 'react';
import { render } from 'react-dom';
import './style.css';
import {AgentsApi} from './api.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ButtonAppBar from './navbar.js';
import OutlinedCard from './card.js';
import ComparisonPage from './comparisonpage.js';
import { BrowserRouter as Router, Route, Redirect, Switch, useHistory } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'AI Showcase',
      currentData: [],
      checkCount: 0,
      listings: {},
      sub: false
    }
    this.resetPage = resetPage.bind(this);
    this.handleCheckCount = handleCheckCount.bind(this);
    this.setParentState = setParentState.bind(this);
    this.generateComparison = generateComparison.bind(this);
  }

  render() {
    return (
      <MuiThemeProvider>          
        <Router> 
            <Route path="/" component={(props) => <ButtonAppBar {...props} showCompare={this.state.checkCount == 2}/>}/>
            <Route exact path="/" render={(props) => <ListingContainer {...props} currentData={this.state.currentData} handleCheckCount={this.handleCheckCount} setParentState={this.setParentState} resetPage={this.resetPage}/>}/>
            <Route path="/compare" render={(props) => <ComparisonPage {...props} comparison={this.generateComparison()} />}/>        
        </Router>
     </MuiThemeProvider>     
    );
  }
}

function resetPage() {
  this.setState(() => 
    ({checkCount: 0, currentData: []})
  )
}

function generateComparison() {
  const compareIds = this.state.currentData;
  const listings = this.state.listings;
  return [listings[compareIds[0]], listings[compareIds[1]]]; 
}

function setParentState(inputListings) {
  this.setState(() => 
    ({ listings: inputListings})
  )
}

function handleCheckCount(checkState, id) {
  if (checkState) {
    if (this.state.checkCount<2) {
      this.state.currentData.push(id);
      this.setState({checkCount: this.state.checkCount+1});
      return true;
    }
  }
  else {
    this.state.currentData.splice(this.state.currentData.indexOf(id), 1 );
    this.setState({checkCount: this.state.checkCount-1});
  }
  return false;
}

class ListingContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: {},
    }
    this.renderBody = renderBody.bind(this);
    this.createListings = createListings.bind(this);
    this.props.resetPage();
  }
  render() {
    return(
      <div> {this.renderBody()} </div>
    )
  } 
}

function renderBody() {
  if (Object.keys(this.state.listings).length == 0) {
    this.createListings();
  }
  const listings = this.state.listings;
  if (Object.keys(listings).length > 0) {
    return (Object.keys(listings).map((id) => {
      let listing = listings[id];
      return <OutlinedCard listing={listing} handleCheckCount={this.props.handleCheckCount} id={id}/>
      }
    ))
  }

}

function createListings() {
  var agentListing = {};
  const newAgent = new AgentsApi();
  newAgent.listAgents().then((v) => {
    for (var agentKey in v) {
      const agent = v[agentKey];
      const key = agent['id'];
      agentListing[key] = {name: agent['name'], description: agent['description'],scores: averageScores(agent)};
    }
    this.setState({
        listings: agentListing
    }, () => {
      this.props.setParentState(agentListing)
    })
    return agentListing;
  }, function(e) {
    // not called
  });
  return agentListing;
}

function averageScores(agent) {
  var tasks = agent['tasks'];
  var scoresPerCategory = {'memory':[],'logic':[],'planning':[]};
  var averages = {'memory':0,'logic':0,'planning':0}
  var numTasks = tasks.length;
  for (var i = 0; i < numTasks; i++) {
    var task = tasks[i];
    scoresPerCategory[task['category']].push(task['score']);
  }
  for (var category in scoresPerCategory) {
    const sum = scoresPerCategory[category].reduce((a, b) => a + b, 0);
    const avg = (sum / scoresPerCategory[category].length) || 0;
    averages[category] = roundToTwoDecimals(avg);
  }
  return averages;
}

function roundToTwoDecimals(number) {    
    return +(Math.round(number + "e+2")  + "e-2");
}

render(<App />, document.getElementById('root'));