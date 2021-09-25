import * as Actions from './ActionTypes';

const initialState = { 
						appLoaded: false, 
						loader:false,
						authenticated: false,
						userProfile: undefined,
						error : undefined,
						docs: [],
						uploadProgress:[]

						
					};

function appReducer(state = initialState, action) {
  switch (action.type) {
		case Actions.ON_APPLICATION_START:
			return Object.assign({},state,{appLoaded: true});
		case Actions.SHOW_LOADER:
			return {...state, loader:true}
		case Actions.HIDE_LOADER:
			return {...state, loader:false}
		case Actions.ON_LOGIN_SUCCESS:
			return {...state, authenticated:true, userProfile:action.payLoad,error:undefined}
		case Actions.ON_LOGIN_FAIL:
			return {...state, authenticated:false, userProfile:undefined,error:action.payLoad}
		case Actions.DOCS_FETCH_SUCCESS:
			return {...state, docs:action.payLoad}
		case Actions.DOCS_FETCH_FAIL:
			return {...state,error:action.payLoad}
		case Actions.ADD_ERROR:
			return {...state,error:action.payLoad}
		case Actions.CLEAR_ERROR:
			return {...state,error:undefined}
		case Actions.DOCS_UPLOAD_FAIL:
			return {...state,error:action.payLoad}
		case Actions.DOC_UPLOAD_PROGRESS:
			let array   = state.uploadProgress;
			let newArray = [];
			let map ={};
			
			for(let i=0;i<array.length;i++){
				let prg = array[i];
				map[prg.fileId] = prg;
			}
			map[action.payLoad.fileId] = action.payLoad;
			for(let key in map){
				newArray.push(map[key])
			}
			
			newArray = newArray.filter((item)=>{
				return item.progress !=100;
			})

			


			
			return Object.assign({},state, {uploadProgress:newArray});
		default:
			return state;
	}
}
export default appReducer;