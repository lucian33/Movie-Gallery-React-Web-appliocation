import React, { Component } from 'react'
import { Image as ImageComponent, Button, Item, Label, Dimmer, Loader, Segment, Rating, Icon} from 'semantic-ui-react'
import { browserHistory, Link } from 'react-router-dom'
import styles from './List.scss'
import PropTypes from 'prop-types'

class ListItem extends Component {
  // constructor
  constructor(props) {
    super(props);
    console.log(props);
    // use state to store the response data
    this.data = props.movies;
    this.state = {
      movies: null
    };

  }

  componentWillReceiveProps(nextProps){
    this.setState({movies: nextProps.data});
  }

  render() {
    if (this.state.movies){
      return(
        <Item.Group>

          {
            this.state.movies.map((movie)=>{
              return(
                <Item size="massive" as={Link} to={`/detail/${movie.id}`} key={movie.id}>
                  <Item.Image size="medium" src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} />
                  <Item.Content verticalAlign='middle'>
                    <h1>{movie.title}</h1>
                    <h2>{movie.tagline}</h2>
                    <Item.Meta>

                    </Item.Meta>
                    <div><strong>Information:</strong></div>
                    <Item.Description>

                    </Item.Description>
                    <Item.Extra>
                      <div>
                        <div>
                          Relase Date: {movie.release_date}
                        </div>
                        <div>
                          Popularuty: {movie.popularity}

                        </div>
                        <div>
                          Rating: {movie.vote_average} <Rating defaultRating={movie.vote_average} maxRating={10} disabled />
                        </div>
                      </div>
                    </Item.Extra>
                  </Item.Content>
                </Item>
              )
            })
          }
        </Item.Group>
      )
    }
    else {
      return (<div></div>)
    }

  }
}

export default ListItem

// propTypes checking
ListItem.propTypes = {
  data: PropTypes.array.isRequired
};
