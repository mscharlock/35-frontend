import React from 'react';
import Navbar from '../navbar';
import {connect} from 'react-redux';
import * as utils from '../../lib/utils';
import HomeContainer from '../home-container';
import {tokenSet} from '../../action/auth-actions';
import LandingContainer from '../landing-container';
import SettingsContainer from '../settings-container';
import DashboardContainer from '../dashboard-container';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
// import appStoreCreate from '../../lib/app-create-store';

class App extends React.Component {
  componentDidMount() {
    let token = utils.cookieFetch('X-Sluggram-Token');
    if (token) this.props.tokenSet(token);
  }

  render() {
    return (
      <div className="application">
          <BrowserRouter>
            <div>
              <Navbar />
                <Route path="/welcome/:auth" component={LandingContainer}/>
                <Route exact path="/" component={HomeContainer}/>
                <Route exact path="/settings" component={() => this.props.auth ? <SettingsContainer/> : <Redirect to="/" />}/>
                <Route exact path="/dashboard" component={()=> this.props.auth ? <DashboardContainer/> : <Redirect to="/"/>}/>
            </div>
          </BrowserRouter>
      </div>
    );
  }
}

let mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

let mapDispatchToProps = dispatch => ({
  tokenSet: token => dispatch(tokenSet(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
