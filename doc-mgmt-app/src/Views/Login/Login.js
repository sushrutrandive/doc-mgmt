import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as Actions from './../../State/AppActions';

const Loading = () => <div ><h3>Loading...</h3></div>
class Login extends Component {
	constructor(props){
		super(props);
		this.state={ "userName" : "", "pwd": ""}
	}
	
	onLogin=()=>{
		
		if(this.state.userName =="" || this.state.pwd=="")
			this.props.addError({message: "Required fields are missing"});
		else
			this.props.doLogin({userName: this.state.userName, pwd: this.state.pwd});			
	}

	onUserNameChange=(e)=>{
		let value = e.target.value;
		this.setState({userName : value});

	}

	onPasswordChange=(e)=>{
		let value = e.target.value;
		this.setState({pwd : value});
	}
	render(){
		if(this.props.authenticated===true)
			return <Redirect to={{
				pathname: "/",
				state: { from: this.props.location }
			}}/>; 
		else if(this.props.loader)
			return <Loading />
		else
		return (
			
			<div className="container ">
				
				<div className="d-flex align-items-center justify-content-center margin-top-25">
				
				<form className="col-md-6 ">
					<h3>Document Management App</h3>
					
					{this.props.error && this.props.error.message && <div className="alert alert-danger padding-top-bottom-10" role="alert">
						{this.props.error.message}
					</div>}
					<div className="mb-3">
						<label className="form-label">User Name</label>
						<input type="text" className="form-control form-control-sm" id="userName" onChange={this.onUserNameChange}/>						
					</div>
					<div className="mb-3">
						<label className="form-label">Password</label>
						<input type="password" className="form-control form-control-sm" id="pwd" onChange={this.onPasswordChange} />
					</div>
					
					<button type="button" className="btn btn-primary" onClick={this.onLogin}>Login</button>
					</form>
				</div>
			</div>
		);
	}
}

Login.propTypes = {};

Login.defaultProps = {};

const mapStateToProps = (state) => {
	return {
		authenticated : state.appState.authenticated,
		error : state.appState.error,
		loader : state.appState.loader
	};
};

const mapDispatchToProps = (dispatch ) => {
	return {
		doLogin : (loginInfo)=> dispatch(Actions.onLoginStart(loginInfo)),
		addError : (errorMessage) => {dispatch(Actions.addError(errorMessage))},
		clearError : () => {dispatch(Actions.clearError())}
	};
};



export default connect(mapStateToProps,mapDispatchToProps)(Login);