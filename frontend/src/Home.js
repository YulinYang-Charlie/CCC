import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <>
    <div className='header'>
      <h1 className='title'>react-chartjs-2</h1>
      <h2 className='subtitle'>React wrapper for Chart.js</h2>
    </div>
    <hr />
    <div className='categories'>
      <div className='category'>
        <h3 className='title'>Other Charts</h3>
        <ul className='items'>
          <li className='entry'>
            <Link to='/doughnut'>Doughnut</Link>
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
      </div>
      <div className='category'>
        <h3 className='title'>Maps</h3>
        <ul className='items'>
          <li className='entry'>
            <Link to='/map'>Heat Map</Link>
          </li>
        </ul>
      </div>
    </div>
    <hr />
    <div className='footer'>
    </div>
  </>
);

export default Home;
