import React, { Component } from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class Cards extends Component{
    constructor(props){
      super(props);
      // console.log(this.props.params.questionId);
      this.props = props;
      // set state
      this.state = {movie: this.props.movie}
      // console.log(this.props);
    }

    render(){

      return(
        <div className="cardWrapper">
          <Card as={Link} to={`/detail/${this.props.movie.id}`}>
            <Image src= {`https://image.tmdb.org/t/p/w500/${this.props.movie.poster_path}`} />
            <Card.Content>
              <Card.Header>
                {this.state.movie.title}
              </Card.Header>
              <Card.Meta>
                <span className='date'>
                  {this.state.movie.release_date}
                </span>
              </Card.Meta>
              <Card.Description>
                {this.state.movie.tagline}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='star' />
                Vote Average: {this.state.movie.vote_average}
              </a>
            </Card.Content>
          </Card>
        </div>
      )

    }
}

export default Cards

Cards.propTypes = {
  movie: PropTypes.object.isRequired
};
