import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom'

// page components
import List from '../List/List.jsx'
import Detail from '../Detail/Detail.jsx'
import Gallery from '../Gallery/Gallery.jsx'

import styles from './Home.scss'

class Home extends Component {
    render() {
        return(
          <Router>
            <div>

              <div className="Home">
                <div>
                  <h1>Movie Gallery</h1>
                </div>
                <div>
                  <div className="search">
                    <Icon name="list" size="big"></Icon>
                    <h2><Link to="/list">Search</Link></h2>
                  </div>
                  <div className="gallery">
                    <Icon name="film" size="big"></Icon>
                    <h2><Link to="/gallery">Gallery</Link></h2>
                  </div>
                </div>
              </div>

              <Switch>
                {/* route to list view */}
                <Route exact path="/list" component={ List } />
                {/* route to detail view */}
                <Route exact path="/detail/:id" component={ Detail } />
                {/* route to detail view */}
                <Route exact path="/gallery" component={ Gallery } />

              </Switch>
            </div>
          </Router>
      )
    }
}

export default Home
