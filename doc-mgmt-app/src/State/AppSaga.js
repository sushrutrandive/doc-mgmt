import { put, takeLatest, all, call } from 'redux-saga/effects';
import * as Actions from './AppActions';
import * as ActionTypes from './ActionTypes';
import * as APIService from './../Services/APIService';
import download from 'js-file-download';

function* login(action) {
  
  yield put(Actions.showLoader());
  try{    
    let userProfile = yield call (APIService.doLogin,action.payLoad);    
    console.log(userProfile);
    yield put(Actions.onLoginSuccess(userProfile.data));
    
  }catch(error){
    console.log(error.response.data);
    yield put(Actions.onLoginFail(error.response.data));
  } 
  yield put(Actions.hideLoader());
}

function* fetchDocs(){

  yield put(Actions.showLoader());
  try{       
    let docs =  yield call(APIService.getDocuments);
    console.log(docs);
    yield put(Actions.onDocsFetchSuccess(docs.data));
    
  }catch(error){
    yield put(Actions.onDocsFetchFail(error.response.data));
  } 
  yield put(Actions.hideLoader());

}

function* uploadDocs(action){

  yield put(Actions.showLoader());
  try{       
    
     yield call(APIService.uploadDocs,action);
    //console.log(docs);
    //yield put(Actions.onDocsFetchSuccess(docs.data));
    
  }catch(error){   
    yield put(Actions.onFileUploadFail(error.response.data));
  } 
  yield put(Actions.hideLoader());

}

function* downloadDoc(action){
  try{      
         let response = yield call(APIService.downloadDocument,action.payLoad);  
         //var blob = new Blob([response.data]);
         const url = window.URL.createObjectURL(response.data);
         const link = document.createElement('a');
         link.href = url;
         link.setAttribute('download', 'file.pdf');
         document.body.appendChild(link);
         link.click();
         download(response.data,action.payLoad);

        
 }catch(error){   
   yield put(Actions.addError({message:"Error while downloding file : "+ action.payLoad}));
 } 
}
// Watcher Functions
function* loginWatcher() {
     yield takeLatest(ActionTypes.ON_LOGIN_START, login)
}

function* fetchDocsWatcher() {
  yield takeLatest(ActionTypes.DOCS_FETCH_START, fetchDocs)
}

function* uploadDocsWatcher() {
  yield takeLatest(ActionTypes.DOCS_UPLOAD_START, uploadDocs)
}

function* downloadDocWatcher() {
  yield takeLatest(ActionTypes.DOCS_DOWNLOAD_START, downloadDoc)
}
export default function* rootSaga() {
   yield all([
    loginWatcher(),
    fetchDocsWatcher(),
    uploadDocsWatcher(),
    downloadDocWatcher()
   ]);
}