import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as Actions from './../../State/AppActions';
import { Link } from 'react-router-dom';
import { downloadDocument } from './../../Services/APIService';


class Documents extends Component {
	constructor(props){
		super(props);
	}
	componentDidMount(){

		this.props.fetchDocuments();

	}
	getFileStatus(item){
		let status = "Uploading"
		switch (item.status) {
			case "P":
				status = "Uploading"
				break;
			case "C":
				status = "Complete"
				break;
			case "F":
				status = "Fail"
				break;	
			default:
				break;
		}
		return status;

	}
	download = async (id)=>{		
		 let response = await downloadDocument(id);
		 let contentHeader = response.headers['content-type']
		 const url = URL.createObjectURL(new Blob([response.data], {type: contentHeader}));
		 window.open(url);
	}
	render(){
		return (
			<div className="conatiner-fluid margin-top-25" >

			<nav>
				<ol className="breadcrumb">
					<li className="breadcrumb-item"><a href="#">Home</a></li>
					<li className="breadcrumb-item active" >Document List</li>
				</ol>
			</nav>				
				<Link className="btn btn-sm btn-success" to="docs/upload">Upload Files</Link>
				<table className="table table-sm table-bordered margin-top-25 table-striped">
					<thead>
						<tr className="table-dark">
						<th>File Name</th>
						<th>Created By</th>						
						<th>Create Time</th>
						<th>Remark</th>
						<th>Status</th>
						<th>Error</th>
						<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{
							this.props.docs && this.props.docs.length >0 && this.props.docs.map((item)=>{
								return (
									<tr key={item.id}>
										<td>{item.fileName}</td>
										<td>{item.user}</td>
										<td>{new Date(item.createTime).toLocaleString()}</td>
										<td>{item.note}</td>
										<td>{this.getFileStatus(item) }</td>
										<td>{item.error}</td>
										
										<td>{item.status == "C" ? (<a className="btn btn-sm btn-danger" onClick={() =>this.download(item.id)}>Preview</a>): "" }</td>
									</tr>
								)
							})

							
						}
						{
							this.props.docs && this.props.docs.length ==0 && (
									<tr>
										<td colSpan="7">No Records Available</td>
										
									</tr>
								)
							

							
						}
					</tbody>
				</table>				
			</div>
		);
	}
}

Documents.propTypes = {};

Documents.defaultProps = {};

const mapStateToProps = (state) => {
	return {
		docs: state.appState.docs 
	};
};

const mapDispatchToProps = (dispatch ) => {
	return {
		fetchDocuments : () => {dispatch(Actions.onDocsFetchStart())}
		
	};
};



export default connect(mapStateToProps,mapDispatchToProps)(Documents);