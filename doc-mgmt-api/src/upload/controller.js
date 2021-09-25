const uploadFile = require("./index");
const docService = require("./service");
const path = require('path')
const mime = require('mime');
const folderPath = path.join(__dirname, '../docs/');
const multer = require('multer');
const fs = require('fs');

const upload = async (req, res) => {
	let fileRef =null;
	try {		
		
		await uploadFile(req, res);		
		docService.saveDoc(req,req.file,"C");		
		res.status(200).send({ message: "Files uploaded successfully: " });
	} catch (err) {
		let fileId = req.headers['file-id']
		if (err instanceof multer.MulterError) {
			
			if(err.code=="LIMIT_UNEXPECTED_FILE"){
				docService.updateDoc(fileId,"Invalid file types");		
				res.status(500).send({ "fileId" :fileId, message: "Invalid file types" });
			}
			else if(err.code=="LIMIT_FILE_SIZE"){
				//docService.saveDoc(req,req.file,"F","File is too large");
				docService.updateDoc(fileId,"File is too large");		
				res.status(500).send({"fileId" :fileId, message: "File is too large" });
			}
		} else if (err) {
			//docService.saveDoc(req,req.file,"F",err.message);	
			docService.updateDoc(fileId,err.message);			
			res.status(500).send({"fileId" :fileId,message :err.message  });
		}

	}
};

const update = (req, res) => {	
	try {				
		docService.saveDoc(req,req.file,"F");
		res.status(200).send({ message: "File Status updated." });	
	} catch (err) {

	}
};

const getDocs = (req, res) => {	
	let docArray = docService.getAllDocs()
    res.send(docArray);
};

const download = (req, res) => {
	const fileName = req.params.name;
	res.download(folderPath + fileName, fileName, (err) => {
		if (err) {
			res.status(500).send({
				message: "Could not download the file. " + err,
			});
		}
	});
	/*let file = folderPath + fileName;

  let filename = path.basename(file);
  let mimetype = mime.lookup(file);

  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  res.setHeader('Content-type', mimetype);

  var filestream = fs.createReadStream(file);
  filestream.pipe(res);*/
};



module.exports = {
	upload,
	download,
	update,
	getDocs
};