import React, { Component } from 'react'
import { Segment, Input, List, Icon, Image, Card } from 'semantic-ui-react'
import { browserHistory, Link } from 'react-router-dom'
import Cards from './Cards.jsx'
import Filters from './Filters.jsx'
import styles from './Gallery.scss'
import axios from 'axios'


class Gallery extends Component{
  constructor(){
    super();
    this.baseUrl = "https://api.themoviedb.org/3/movie/top_rated";
    this.movies = null;
    this.state = {
      movies : null,
      selectedGenres: null
    };
    this.getTopRated();
    this.genreHandler = this.genreHandler.bind(this);
  }

  getTopRated(){
    let url = this.baseUrl;
    // the results holds multiple response from api call
    // since the TMDB api limited to one page per request
    let results = [];
    axios.get(url, {
      params: {
        api_key: '7a520151c160de59e84b46b677a15423',
        page: 1
      }
    })
    .then((response)=>{
      results = response.data.results;
      // this.setState({movies : response.data.results});
      // this.movies = response.data.results;
      // console.log(this.state.movies);

      // return the promise generated
      return axios.get(url, {
        params: {
          api_key: '7a520151c160de59e84b46b677a15423',
          page: 2
        }
      });
    })
    .then((response)=>{
      // return the promise generated
      return axios.get(url, {
        params: {
          api_key: '7a520151c160de59e84b46b677a15423',
          page: 3
        }
      });
    })
    .then((response)=>{
      results = results.concat(response.data.results);
      this.setState({movies : results});
      this.movies = results;
      console.log(results);
    });
  }

  // handler props passed to the filters child component
  // so when the children component clicked
  // the state of parent will change, then update the cards view
  genreHandler(e){
    e.preventDefault();
    //console.log(e.target.innerText);
    // set the current selected genre
    // filter the result
    this.setState({
      selectedGenres : e.target.value,
      movies : filterGenre(this.movies, parseInt(e.target.value))
      }
    )
  }

  render(){
    // check if the api call finished
    if (this.state.movies){
      return(
        <div>
          <div className="Filters">
            <Filters onClick={this.genreHandler}>
            </Filters>
          </div>
          <div className="Gallery">

            {
              this.state.movies.map((item)=>{
                return (
                  <div>
                    <Cards movie={item}>
                    </Cards>
                  </div>
                )
              })
            }

          </div>
        </div>
      )
    }
    else {
      return <div></div>
    }
  }
}

export default Gallery

// pass in a array of movies, and filter base on its genre
function filterGenre(movies, genre_id){
  let res = [];
  movies.map((movie)=>{
    if (movie.genre_ids.includes(genre_id)){
      res.push(movie);
    }
  });
  return res;
}
