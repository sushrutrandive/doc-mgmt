import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class Home extends Component {
	constructor(props){
		super(props);
	}
	render(){
		return (			

				<div className="container margin-top-25">
					<h1 className="text-success">Welcome {this.props.userProfile.firstName}, {this.props.userProfile.lastName}</h1>
					<p>Select Documents Menu from Menubar</p>
				</div>
				
		
		);
	}
}

Home.propTypes = {};

Home.defaultProps = {};

const mapStateToProps = (state) => {
	return {
		userProfile :  state.appState.userProfile
	};
};

const mapDispatchToProps = (dispatch ) => {
	return {};
};



export default connect(mapStateToProps,mapDispatchToProps)(Home);