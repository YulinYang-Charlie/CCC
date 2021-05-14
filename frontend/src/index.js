import './reset.css'
import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import VerticalBar from './charts/VerticalBar'
import GroupedBar from './charts/GroupedBar'
import Line from './charts/Line'
import Doughnut from './charts/Doughnut'
import Pie from './charts/Pie'
import Radar from './charts/Radar'
import MultiType from './charts/MultiType'
import ClickEvents from './charts/ClickEvents'
import GoogleApiWrapper from './charts/Map'
import { Link } from 'react-router-dom'

const App = () => (
  <Router>
    <div className='content'>
      <div className='header'>
        <h1 className='title'>TITLE</h1>
        <h2 className='subtitle'>SUB.</h2>
      </div>
      <hr />
      <div className='categories'>
        <div className='category'>
          <h3 className='title'> Section 1
            <ul className='items'>
              <li className='entry'>
                <Link to='/pie'>Pie Chart</Link>
              </li>
              <li className='entry'>
                <Link to='/doughnut'>Doughnut</Link>
              </li>
              <li className='entry'>
                <Link to='/vertical-bar'>Vertical Bar</Link>
              </li>
              <li className='entry'>
                <Link to='/map'>Heat Map</Link>
              </li>
            </ul>
          </h3>
        </div>
        <div className='category'>
          <h3 className='title'> Section 2
            <ul className='items'>
              <li className='entry'>
                <Link to='/grouped-bar'>Grouped Bar</Link>
              </li>
              <li className='entry'>
                <Link to='/line'>Line</Link>
              </li>
              <li className='entry'>
                <Link to='/radar'>Radar</Link>
              </li>
              <li className='entry'>
                <Link to='/multi'>Multitypes</Link>
              </li>
            </ul>
          </h3>
        </div>
      </div>
      <hr />
      <div className='footer'>
      </div>
      <Switch>
        <Route exact path='/vertical-bar' component={VerticalBar} />
        <Route exact path='/grouped-bar' component={GroupedBar} />
        <Route exact path='/line' component={Line} />
        <Route exact path='/doughnut' component={Doughnut} />
        <Route exact path='/pie' component={Pie} />
        <Route exact path='/radar' component={Radar} />
        <Route exact path='/multi' component={MultiType} />
        <Route exact path='/click-events' component={ClickEvents} />
        <Route exact path='/map' component={GoogleApiWrapper} />
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(<App />, document.getElementById('root'))