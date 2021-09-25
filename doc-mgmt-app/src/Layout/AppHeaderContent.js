import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


class AppHeaderContent extends Component {
	constructor(props){
		super(props);
	}
	render(){
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<div className="container-fluid">
					<a className="navbar-brand" href="#">Document Mgmt App</a>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">

					
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">

						{
							this.props.navConfig.items.map((item, index) => {
								return (
									<li key={index} className="nav-item">
										<Link className="nav-link active" to={item.url}>{item.name}</Link>										
									</li>
								);
								
							})
						}
					</ul>
					{
						this.props.userProfile && <div class="d-flex nav-item">
							 <span class="navbar-text">{this.props.userProfile.firstName}</span>
							</div>
					}
					
					</div>
				</div>
				</nav>
		);
	}
}

AppHeaderContent.propTypes = {};

AppHeaderContent.defaultProps = {};

const mapStateToProps = (state) => {
	return {
		userProfile :  state.appState.userProfile
	};
};

const mapDispatchToProps = (dispatch ) => {
	return {
		
	};
};



export default connect(mapStateToProps,mapDispatchToProps)(AppHeaderContent);