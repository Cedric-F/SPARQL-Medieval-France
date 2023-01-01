import React, { Component } from 'react';
// import { Route, BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import MapStyle from './map-style.json'; // A home-made "paper" map style to fit in the "medieval" theme.
/*
 * A list of places to render in the application.
 * It consists of an array of 3 categories (Cities, Cathedrals, Castles) and a total of 39 locations.
 */
import axios from 'axios';

import locations from './locations.json';
import Map from './Components/Map';
import Filter from './Components/Filter';
import Fact from './Components/Fact';

import { Route } from 'react-router-dom';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      toggled: true,
      query: '',
      isClicked: false,
      locations: {
        Castle: []
      }
    };
  }

  handleQuery(e, isClicked) {
    this.setState({query: e, isClicked: isClicked})
  }

  toggle() {
    this.setState({toggled: !this.state.toggled});
  }

  fetchData() {
    const endpoint = "http://dbpedia.org/sparql";
    const query = `PREFIX dct: <http://purl.org/dc/terms/>
                    PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>
                    PREFIX dbo: <http://dbpedia.org/ontology/>
                    PREFIX dbc: <http://dbpedia.org/resource/Category:>
                    PREFIX gold: <http://purl.org/linguistics/gold/>
                    SELECT DISTINCT *
                    WHERE
                    {
                       ?building dct:subject dbc:Châteaux_in_France ;
                                 dbo:wikiPageWikiLink ?castles .
                       ?castles  dbo:abstract ?abstract ;
                                 gold:hypernym ?hypernym .
                       ?castles  dbo:thumbnail ?thumbnail .
                       ?castles  geo:lat ?lat .
                       ?castles  geo:long ?long
                       FILTER (  LANG (?abstract) = 'en')
                     }`
    axios.get(endpoint, {
      params: {
        query: query
      }
    }).then(response => {
      const locations = this.state.locations;
      locations.Castle = response.data.results.bindings.filter(triple =>
        triple.hypernym.value.endsWith("/Castle") ||
        triple.hypernym.value.endsWith("/Standing") ||
        triple.hypernym.value.endsWith("/Château")
      ).map(triple => {
        if (triple.castles)
        {
          let tokens = triple.castles.value.split('/');
          const ret = {
            name: tokens[tokens.length - 1],
            abstract: triple.abstract.value,
            thumbnail: triple.thumbnail.value,
            coordinates: {
              lat: triple.lat.value,
              lng: triple.long.value
            }
          };
          return ret;
        }
      }).filter((castle, index, self) => castle && self.findIndex(o => o.name === castle.name) === index)
      this.setState({locations: locations});
    }).catch(error => {
      console.error(error);
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div className="app">
        <Route exact path={`${process.env.PUBLIC_URL}/:Place`} render={({location, history}) => {console.log(location, history); return <Fact locations={this.state.locations} resetQuery={this.handleQuery.bind(this)} history={history} data={{location}} />}}/>
          {/*
            * Filter is the Side Panel containing the search input field and the list view.
            * We pass the handleQuery method as a prop so it can update the app state with the query value
            * and then pass this value to both the list-view AND the map
            * so it can render the corresponding list items and markers
            */}
        <Filter toggled={this.state.toggled} filter={this.state.query} isClicked={this.state.isClicked} query={this.handleQuery.bind(this)} locations={this.state.locations}/>
          {/*
            * Holds the Google Map, provided by google-map-react package.
            * Pass down the query value, map style and location list to it.
            */}
        <Map onToggle={this.toggle.bind(this)} filter={this.state.query} isClicked={this.state.isClicked} style={MapStyle} locations={this.state.locations}/>
      </div>
    );
  }
}

export default App;
