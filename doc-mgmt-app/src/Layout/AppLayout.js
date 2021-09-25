import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { connect } from 'react-redux';


// sidebar nav config
import navigation from '../nav';
// routes config
import routes from '../routes';



const AppHeaderContent = React.lazy(() => import('./AppHeaderContent'));


class AppLayout extends Component {

  loading = () => <div>Loading...</div>
  
  render() {
    return (
		<div class="container-fluid">
			<div class="row" >
			  <Suspense  fallback={this.loading()}>
				<AppHeaderContent navConfig={navigation} {...this.props} router={router} />
			  </Suspense>
			</div>
			<div class="row ">
			{	
				this.props.uploadProgress && this.props.uploadProgress.length>0  && 
					<div className="d-flex align-items-center justify-content-center sticky">
					<div className="col-md-4 alert alert-danger padding-top-bottom-10  "  role="alert">
						
						{
							this.props.uploadProgress.map((item)=>{
								return <div className="row"  key={item.fileId}>

									<div className="col-md-1 spinner-border text-danger" role="status"></div>
									<div className="col-md-11"> {item.fileId} :  {item.progress}%</div>
									</div>
							})
						}
						
					</div>
					</div>
			}
			</div>
			<div class="row" >
				<div className="col-md-12">           
					<Suspense fallback={this.loading()}>
						<Switch>
						  {
							  routes.map((route, idx) => {
								return route.component ? (
									  <Route
										key={idx}
										path={route.path}
										exact={route.exact}
										name={route.name}						
										render={props => (
											this.props.authenticated ? (<route.component {...props} routes={route.routes}/>): (<Redirect to={{pathname: '/login'}}/>)
										 
										)} />
							) : (null);
						  })}
						  
						</Switch>
					</Suspense>      
				</div>
			</div>

			
			             
		</div>
    );
  }
}
const mapStateToProps = (state) => {
	return {
		authenticated : state.appState.authenticated,
		uploadProgress : state.appState.uploadProgress
	};
};

const mapDispatchToProps = (dispatch ) => {
	return {};
};
export default connect(mapStateToProps,mapDispatchToProps)(AppLayout);