import axios from 'axios';
export const API_BASE_URL = "http://localhost:8080";


export  const doLogin  = (loginInfo) => { 
    const headers = {}; 
	headers['Content-Type']='application/json';	
	return axios.post(API_BASE_URL+"/login",loginInfo, { 'headers': headers })  
}

export const getDocuments = async () =>{
    const headers = {}; 
	headers['Content-Type']='application/json';	
	return await axios.get(API_BASE_URL+"/docs", { 'headers': headers })

}


export const uploadDocs = async (action) =>{
    const headers = {}; 
	headers['Content-Type']='multipart/form-data';	
    headers['user-name']=action.userId;
    headers['upload-time']=''+Date.now();	
	return axios.post(API_BASE_URL+"/docs", 
                        action.payLoad, 
                        { 
                            'headers': headers,
                            'onUploadProgress': (data) =>{                               
                                let percentage  = Math.round((100 * data.loaded) / data.total)
                                //console.log(action.fileName+" : ",percentage);
                                let obj = {"fileId" : action.fileName, progress:percentage};
                                action.callback(obj);
                            }
                         })
}

export const downloadDocument = (fileId) =>{
    const headers = {}; 
	headers['Content-Type']='application/json';  
    return axios.get(API_BASE_URL+"/docs/"+fileId,{ 'headers': headers });
	
}



