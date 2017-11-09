import React, { Component } from 'react'
import styles from './Detail.scss'
import axios from 'axios'
import { Image as ImageComponent, Button, Item, Label, Dimmer, Loader, Segment, Rating, Icon} from 'semantic-ui-react'
import { browserHistory, Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class Detial extends Component{
    constructor(props){
      super(props);
      // the id of the detail view element
      this.id = parseInt(this.props.match.params.id);
      this.baseUrl = 'https://api.themoviedb.org/3/movie/';
      // console.log(this.props.match.params);

      // state of detail component
      // contains information of the movie
      this.state = {
        movie : null
      };


    }

    // before component mount, load data
    componentWillMount(){
      this.getMovie(this.id);
    }

    // triggers when route params changed
    componentWillReceiveProps(nextProps){
      if (nextProps.match.params.id != this.id){
        this.id = parseInt(nextProps.match.params.id);
        this.getMovie(this.id);
      }

    }

    getMovie(id){
      let url = this.baseUrl;
      url += id;
      console.log(url);
      axios.get(url, {
        params: {
          api_key: '7a520151c160de59e84b46b677a15423'
        }
      })
      .then((response)=>{
        // change the state by the response data
        this.setState({
          movie: response.data
        });
        // this.state.movies = ;
        console.log(this.state.movie.genres);
        //this.render();
      });
    }

    render(){
      // if state loaded
      if (this.state.movie){
        return(
          <div className="detailView">
            {/* render two button at each side*/}

            <div className="prev">
              <Link to={"/detail/" + (this.id - 1)}>
                <Icon size='big' name="chevron left"/>
              </Link>
            </div>

            <Item.Group>
              <Item key={this.id}>
                <Item.Image size="medium" src={'https://image.tmdb.org/t/p/w500' + this.state.movie.poster_path} />
                <Item.Content verticalAlign='middle'>
                  <h1>{this.state.movie.title}</h1>
                  <h2>{this.state.movie.tagline}</h2>
                  <Item.Meta>
                    <div>
                      Relase Date: {this.state.movie.release_date}
                    </div>
                    <div>
                      Popularuty: {this.state.movie.popularity}

                    </div>
                    <div>
                      Rating: <Rating defaultRating={this.state.movie.vote_average} maxRating={10} disabled />
                    </div>
                  </Item.Meta>
                  <div><strong>Description</strong></div>
                  <Item.Description>{this.state.movie.overview}</Item.Description>
                  <Item.Extra>
                    <div>
                    {
                      this.state.movie.genres.map((item)=>{
                        return <Label key={item.id}>{item.name}</Label>
                      })
                    }
                    </div>
                  </Item.Extra>
                </Item.Content>
              </Item>
            </Item.Group>

            <div className="next">
              <Link to={"/detail/" + (this.id + 1)}>
                <Icon size='big' name="chevron right"/>
              </Link>
            </div>
          </div>
        )
      }
      // if state not loaded
      else {
        return (

            <Dimmer active>
              <Loader />
            </Dimmer>

        )
      }
    }
}

export default Detial


// check route parameter is number and required
Detial.propTypes = {
  match:{
    params :{
      id: PropTypes.number.isRequired
    }
  }
};
