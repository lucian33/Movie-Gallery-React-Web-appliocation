
import React, { Component } from 'react'
import { Label, Button } from 'semantic-ui-react'

class Filters extends Component{

  constructor(props){
    super(props);
    // official list of genres, need this because some api response returns genres id
    // instead of genres name
    console.log(this.props);
    this.genres =
    [
      {
        "id": 28,
        "name": "Action"
      },
      {
        "id": 12,
        "name": "Adventure"
      },
      {
        "id": 16,
        "name": "Animation"
      },
      {
        "id": 35,
        "name": "Comedy"
      },
      {
        "id": 80,
        "name": "Crime"
      },
      {
        "id": 99,
        "name": "Documentary"
      },
      {
        "id": 18,
        "name": "Drama"
      },
      {
        "id": 10751,
        "name": "Family"
      },
      {
        "id": 14,
        "name": "Fantasy"
      },
      {
        "id": 36,
        "name": "History"
      },
      {
        "id": 27,
        "name": "Horror"
      },
      {
        "id": 10402,
        "name": "Music"
      },
      {
        "id": 9648,
        "name": "Mystery"
      },
      {
        "id": 10749,
        "name": "Romance"
      },
      {
        "id": 878,
        "name": "Science Fiction"
      },
      {
        "id": 10770,
        "name": "TV Movie"
      },
      {
        "id": 53,
        "name": "Thriller"
      },
      {
        "id": 10752,
        "name": "War"
      },
      {
        "id": 37,
        "name": "Western"
      }
    ];
  }

  render(){

    return (
      <div>
      {
        this.genres.map((item)=>{
          return(
            <Label color='blue' as={Button} onClick={this.props.onClick} value={item.id}>
              {item.name}
            </Label>
          )
        })
      }
      </div>
    )
  }

}


export default Filters
