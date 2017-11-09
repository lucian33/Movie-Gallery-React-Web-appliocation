import React, { Component } from 'react'
import { Segment, Input, List, Icon, Image, Item, Button } from 'semantic-ui-react'
import { browserHistory, Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import ListItem from './ListItem.jsx'
import styles from './List.scss'
import axios from 'axios'

class ListView extends Component {
  // constructor
  constructor() {
    super();
    // use state to store the response data
    this.state = {
      movies: []
    }
    // props
    this.baseUrl = 'https://api.themoviedb.org/3/search/movie';
    // bind function to this component
    this.inputChange = this.changeHandler.bind(this);

    this.toggleSort = this.toggleSort.bind(this);
  }

  changeHandler(e){
    let url = this.baseUrl;
    let searchText = e.target.value;

    // console.log(this.baseUrl);
    // console.log(e.target.value);

    axios.get(url, {
      params: {
        api_key: '7a520151c160de59e84b46b677a15423',
        query: searchText
      }
    })
    .then((response)=>{
      // change the state by the response data
      this.setState({
        // movies: this.forMatList(response.data.results)
        movies: response.data.results
      });
      // this.state.movies = ;
      // console.log(this.state.movies);
      this.render();
    });
  }

  toggleSort(attr){
    // console.log(attr);
    this.setState({
      movies: this.state.movies.sort(this.sortByAttr(attr))
    });
  }

  // format respnse obj
  // forMatList(array){
  //   let results = [];
  //
  //   array.forEach((data)=>{
  //     // create props for the list items
  //     let obj = {};
  //     // augmentation the list item as a <Link /> for reroute
  //     obj.as = Link;
  //     obj.to = '/detail/' + data.id;
  //     obj.description = data.overview;
  //     // obj.extra = data.release_date;
  //     obj.key = data.id;
  //     obj.header = data.title;
  //     obj.image = 'https://image.tmdb.org/t/p/w500' + data.poster_path;
  //     results.push(obj);
  //
  //   });
  //
  //   return results;
  // }

  // sort function
  // toggle ascend and descend by attr
  // reference
  // https://stackoverflow.com/questions/14493985/toggle-array-sort-in-javascript-ascending-to-descending-and-vice-versa
  sortByAttr(attr){
    let self=this;
    this.asc=!this.asc;
    return function (l, r) {
        return l[attr] > r[attr] ? (self.asc ? 1 : -1) : l[attr] < r[attr] ? (self.asc ? -1 : 1) : 0;
    }
  }

  render() {
    return(
      <div className="ListView">
        <div className="search">
          <Segment inverted>

            <Input
            fluid placeholder='Search...'
            onChange={this.inputChange}
            icon={<Icon name='search' inverted circular link />} >
            </Input>

          </Segment>
        </div>
        <div className="sortButtonGroup">
          <Button onClick={()=>this.toggleSort("popularity")}>
            <Icon name="sort"/>
            Sort By Popularity
          </Button>
          {/* bind function like this, otherwise this function will be called constantly */}
          <Button onClick={()=>this.toggleSort("vote_average")}>
            <Icon name="sort"/>
            Sort By Rating
          </Button>
        </div>

        <div className="listItems">
          <ListItem data={this.state.movies}/>
        </div>

      </div>
    )
  }
}

export default ListView
