const path = require('path')
const filePath = path.join(__dirname, '../docs/data.json');
const fs = require('fs');

const saveDoc = (req, file, status, error) =>{
    let note = req.body.note;
	let data = {
			"id": getFileId(req,file),
			"fileName": file.originalname,
			"createTime": Date.now(),
			"user": req.headers['user-name'],
			"status": status,
			"note": note,
			"error" :  error
			
		}
   
    const appJson = fs.readFileSync(filePath).toString();

    let docArray = JSON.parse(appJson);
    docArray.push(data);
    fs.writeFileSync(filePath,JSON.stringify(docArray,null,4));
}

const getFileId = (req,file) => {
    //let file = req.file;
	//og(console.lfile.originalname)
	let uploadTime = req.headers['upload-time'];
	let fileName = path.parse(file.originalname).name;
	let extn = path.parse(file.originalname).ext;
	let id =  fileName + '-' + uploadTime + extn;
    req.headers['file-id'] = id;
    return id;
}

const updateDoc = (fileId,error) =>{
    const appJson = fs.readFileSync(filePath).toString();
    let docArray = JSON.parse(appJson);
    
    docArray.forEach((item)=>{
        if(item.id ==fileId){
            let obj  =  { ...item, ...{ status: "F" , error: error, createTime:Date.now()}};
            docArray.push(obj);
        }
    });
    fs.writeFileSync(filePath,JSON.stringify(docArray,null,4));
   
}

const getAllDocs = () =>{  
    const appJson = fs.readFileSync(filePath).toString();
    let docArray = JSON.parse(appJson);
    let retArray=[];
    let map = {};
    docArray.forEach((item)=>{

        if(map[item.id]){
            let previous = map[item.id];
            if(item.createTime > previous.createTime)
                map[item.id] = item;

        }else{
            map[item.id] = item;
        }

    });

    for (let key in map){
        retArray.push(map[key])
    }

    return retArray;

}


module.exports = {
	saveDoc,
    updateDoc,
    getAllDocs
};