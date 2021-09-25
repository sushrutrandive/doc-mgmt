import { call } from 'redux-saga/effects';
import * as ActionTypes from './ActionTypes';

export const onApplicationStart  = () => { 
	return {
		type:ActionTypes.ON_APPLICATION_START,
			
	}	
}

export const showLoader  = () => { 
	return {
		type:ActionTypes.SHOW_LOADER,
			
	}	
}

export const hideLoader  = () => { 
	return {
		type:ActionTypes.HIDE_LOADER,
			
	}	
}

export const onLoginStart  = (loginInfo) => { 
	return {
		type:ActionTypes.ON_LOGIN_START,
		payLoad: loginInfo	
	}	
}

export const onLoginSuccess  = (userProfile) => { 
	return {
		type:ActionTypes.ON_LOGIN_SUCCESS,
		payLoad : userProfile
			
	}	
}

export const onLoginFail  = (error) => { 
	return {
		type:ActionTypes.ON_LOGIN_FAIL,
		payLoad: error
	}	
}

export const onDocsFetchStart  = () => { 
	return {
		type:ActionTypes.DOCS_FETCH_START
	}	
}

export const onDocsFetchSuccess  = (docList) => { 
	return {
		type:ActionTypes.DOCS_FETCH_SUCCESS,
		payLoad : docList
			
	}	
}

export const onDocsFetchFail  = (error) => { 
	return {
		type:ActionTypes.DOCS_FETCH_FAIL,
		payLoad: error
	}	
}

export const onFileUploadStart  = (uploadInfo,fileName,userId,callback) => { 
	return {
		type:ActionTypes.DOCS_UPLOAD_START,
		payLoad: uploadInfo,
		fileName:fileName,
		userId:userId,
		callback:callback
	}	
}

export const onFileUploadSuccess  = () => { 
	return {
		type:ActionTypes.DOCS_UPLOAD_SUCCESS	
			
	}	
}

export const onFileUploadFail  = (error) => { 
	return {
		type:ActionTypes.DOCS_UPLOAD_FAIL,
		payLoad: error
	}	
}

export const addError  = (error) => { 
	return {
		type:ActionTypes.ADD_ERROR,
		payLoad: error
	}	
}

export const clearError  = () => { 
	return {
		type:ActionTypes.CLEAR_ERROR
		
	}	
}

export const download  = (fileId) => { 
	return {
		type:ActionTypes.DOCS_DOWNLOAD_START,
		payLoad: fileId
		
	}	
}
export const uploadProgress  = (uploadProgressInfo) => { 
	return {
		type:ActionTypes.DOC_UPLOAD_PROGRESS,
		payLoad: uploadProgressInfo
		
	}	
}