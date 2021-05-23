import './App.css';
import Sidebar from './Sidebar/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Team from './pages/Team';
import VerticalBar from "./charts/VerticalBar";
import GroupedBar from "./charts/GroupedBar";
import Line from "./charts/Line";
import Radar from "./charts/Radar";
import MultiType from "./charts/MultiType";
import ClickEvents from "./charts/ClickEvents";
import GoogleApiWrapper from "./charts/Map";
import Dashboard from "./pages/Dashboard";
import PiePage from "./pages/PiePage";
import EmotionBar from "./charts/EmotionBar";

function App() {
  return (
    <Router>
      <Sidebar />
      <Switch>
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/vertical-bar' component={VerticalBar} />
        <Route exact path='/grouped-bar' component={GroupedBar} />
        <Route exact path='/line' component={Line} />
        <Route exact path='/doughnut' component={EmotionBar} />
        <Route exact path='/pie' component={PiePage} />
        <Route exact path='/radar' component={Radar} />
        <Route exact path='/multi' component={MultiType} />
        <Route exact path='/click-events' component={ClickEvents} />
        <Route exact path='/map' component={GoogleApiWrapper} />
        <Route exact path='/team' component={Team} />
      </Switch>
    </Router>
  );
}

export default App;
