import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as Actions from './../../State/AppActions';
import { Redirect } from "react-router-dom";

class FileUpload extends Component {
	constructor(props){
		super(props);
		this.state={ "note" : undefined, "selectedFiles" : [], "redirect":false}
	} 

	componentDidMount(){
		this.props.clearError();
		this.setState({"redirect":false})
	}

	onNoteChange = (e) =>{

		this.setState({note:e.target.value});
	}

	onFileChange= (e) =>{
		this.setState({ selectedFiles: e.target.files }); 

	}

	callback = (obj)=>{
		this.props.uploadProgress(obj)
	}

	uploadFiles = (e) =>{

		if(this.state.selectedFiles && this.state.selectedFiles.length>0 && this.state.note){
			
			
			let totalSize =0;
			for(let i = 0;i < this.state.selectedFiles.length;i++){
				let fileItem = this.state.selectedFiles[i];
				totalSize =totalSize+ fileItem.size;
			}
			if(totalSize > (5*1024*1024*1024)){ // 5 GB
				this.props.addError({message: "Total file size exceeds allowd limit (5 GB)"});

			}else{
				for(let i = 0;i < this.state.selectedFiles.length;i++){
					let formData = new FormData();
					formData.append("note",this.state.note);
					let fileItem = this.state.selectedFiles[i];
					formData.append( 
						"file", 
						fileItem, 
						fileItem.name 
					); 
					this.props.uploadFilesToServer(formData,fileItem.name, this.props.userProfile.userId,this.callback);
					this.setState({"redirect":true})
				}
				
			}
			
		}else{
			this.props.addError({message: "Required fields are missing"});
		}
	}
	render(){
		if (this.state.redirect) {
			return <Redirect to="/docs" />
		  }
		return (			

			<div className="container margin-top-25">
			
			<nav>
				<ol className="breadcrumb">
					<li className="breadcrumb-item"><a href="#">Home</a></li>
					<li className="breadcrumb-item active" >File Upload</li>
				</ol>
			</nav>	
				
			<div className="d-flex align-items-center  margin-top-25">
				
				<form className="col-md-6 ">	
				<div className="row">
				{this.props.error && this.props.error.message && <div className="alert alert-danger padding-top-bottom-10" role="alert">
							{this.props.error.message}
						</div>}			
			</div>					
					<div class="mb-3">
						<label class="form-label required">Note</label>
						<input type="text" className="form-control form-control-sm" id="note" onChange={this.onNoteChange}/>						
					</div>
					<div class="mb-3">
						<label class="form-label required">Select Files</label>
						<input className="form-control form-control-sm" id="files" type="file" multiple  onChange={this.onFileChange}/>
					</div>
					
					<button type="button" className="btn btn-primary btn-sm" onClick={this.uploadFiles}>Upload</button>
				</form>
			</div>
			</div>
		
		);
	}
}

FileUpload.propTypes = {};

FileUpload.defaultProps = {};

const mapStateToProps = (state) => {
	return {
		error : state.appState.error,
		userProfile :  state.appState.userProfile
	};
};

const mapDispatchToProps = (dispatch ) => {
	return {
		uploadFilesToServer : (uploadInfo, fileName,userId,callback) => {dispatch(Actions.onFileUploadStart(uploadInfo,fileName,userId,callback))},
		addError : (errorMessage) => {dispatch(Actions.addError(errorMessage))},
		clearError : () => {dispatch(Actions.clearError())},
		uploadProgress : (item)=>{dispatch(Actions.uploadProgress(item))},
	};
};



export default connect(mapStateToProps,mapDispatchToProps)(FileUpload);