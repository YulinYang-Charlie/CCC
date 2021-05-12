import './reset.css'
import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import VerticalBar from './charts/VerticalBar'
import HorizontalBar from './charts/HorizontalBar'
import StackedBar from './charts/StackedBar'
import GroupedBar from './charts/GroupedBar'
import Line from './charts/Line'
import MultiAxisLine from './charts/MultiAxisLine'
import Scatter from './charts/Scatter'
import Doughnut from './charts/Doughnut'
import Pie from './charts/Pie'
import Polar from './charts/Polar'
import Radar from './charts/Radar'
import Dynamic from './charts/Dynamic'
import MultiType from './charts/MultiType'
import Crazy from './charts/Crazy'
import ClickEvents from './charts/ClickEvents'
import GoogleApiWrapper from './charts/Map'
import { Link } from 'react-router-dom'

const App = () => (
  <Router>
    <div className='content'>
      <div className='header'>
        <h1 className='title'>TITLE</h1>
        <h2 className='subtitle'>Seize to none.</h2>
      </div>
      <hr />
      <div className='categories'>
        {/* <div className='category'>
          <h3 className='title'>Bar Charts</h3>
          <ul className='items'>
            <li className='entry'>
              <Link to='/vertical-bar'>Vertical</Link>
            </li>
            <li className='entry'>
              <Link to='/horizontal-bar'>Horizontal</Link>
            </li>
            <li className='entry'>
              <Link to='/grouped-bar'>Grouped</Link>
            </li>
            <li className='entry'>
              <Link to='/stacked-bar'>Stacked</Link>
            </li>
          </ul>
        </div>
        <div className='category'>
          <h3 className='title'>Line Charts</h3>
          <ul className='items'>
            <li className='entry'>
              <Link to='/line'>Basic</Link>
            </li>
            <li className='entry'>
              <Link to='/multi-axis-line'>Multi Axis</Link>
            </li>
          </ul>
        </div>
        <div className='category'>
          <h3 className='title'>Other Charts</h3>
          <ul className='items'>
            <li className='entry'>
              <Link to='/scatter'>Scatter</Link>
            </li>
            <li className='entry'>
              <Link to='/doughnut'>Doughnut</Link>
            </li>
            <li className='entry'>
              <Link to='/pie'>Pie</Link>
            </li>
            <li className='entry'>
              <Link to='/polar'>Polar</Link>
            </li>
            <li className='entry'>
              <Link to='/radar'>Radar</Link>
            </li>
          </ul>
        </div>
        <div className='category'>
          <h3 className='title'>Advanced Charts</h3>
          <ul className='items'>
            <li className='entry'>
              <Link to='/dynamic-bar'>Dynamic</Link>
            </li>
            <li className='entry'>
              <Link to='/multi'>Multi Type</Link>
            </li>
            <li className='entry'>
              <Link to='/crazy'>Crazy</Link>
            </li>
          </ul>
        </div>
        <div className='category'>
          <h3 className='title'>Events</h3>
          <ul className='items'>
            <li className='entry'>
              <Link to='/click-events'>Click Events</Link>
            </li>
          </ul>
        </div> */}
      <div className='category'>
        <h3 className='title'>
            <Link to='/doughnut'>Doughnut</Link>
        </h3>
      </div> 
      <div className='category'>
        <h3 className='title'>
            <Link to='/map'>Heat Map</Link>
        </h3>
      </div>
    </div>
    <hr />
    <div className='footer'>
    </div>
      <Switch>
        <Route exact path='/vertical-bar' component={VerticalBar} />
        <Route exact path='/horizontal-bar' component={HorizontalBar} />
        <Route exact path='/stacked-bar' component={StackedBar} />
        <Route exact path='/grouped-bar' component={GroupedBar} />
        <Route exact path='/line' component={Line} />
        <Route exact path='/multi-axis-line' component={MultiAxisLine} />
        <Route exact path='/scatter' component={Scatter} />
        <Route exact path='/doughnut' component={Doughnut} />
        <Route exact path='/pie' component={Pie} />
        <Route exact path='/polar' component={Polar} />
        <Route exact path='/radar' component={Radar} />
        <Route exact path='/dynamic-bar' component={Dynamic} />
        <Route exact path='/multi' component={MultiType} />
        <Route exact path='/crazy' component={Crazy} />
        <Route exact path='/click-events' component={ClickEvents} />
        <Route exact path='/map' component={GoogleApiWrapper} />
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(<App />, document.getElementById('root'))