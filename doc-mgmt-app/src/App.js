import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

const loading = () => <div>Loading...</div>;
const AppLayout = React.lazy(() => import('./Layout/AppLayout'));
const Page404 = React.lazy(() => import('./Views/Pages/Page404'));
const Page500 = React.lazy(() => import('./Views/Pages/Page500'));
const Login = React.lazy(() => import('./Views/Login'));

class App extends Component {	
	render() {
		return (
		  <React.Fragment>			  
			  <HashRouter>
				<React.Suspense fallback={loading()}>
					<Switch>
					  <Route exact path="/login" name="Login" render={props => <Login {...props}/>} />
					  <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
					  <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
					  <Route path="/" name="Home" render={props => <AppLayout {...props}/>} />					  
					</Switch>
				  </React.Suspense>
			  </HashRouter>
		   </React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch ) => {
	return {};
};

export default connect(mapStateToProps,mapDispatchToProps)(App);
