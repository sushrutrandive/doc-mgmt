const util = require("util");
const multer = require("multer");
const maxFileSize = 200 * 1024 * 1024;
const path = require('path');
const docService = require("./service");


const folderPath = path.join(__dirname, '../docs/');
console.log("-----------------------------------------------------------------------------------------------------\n");
console.log(  "Document Storgae Location : " +folderPath+"\n")
console.log("-----------------------------------------------------------------------------------------------------\n");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    let uploadTime = req.headers['upload-time'];
    let fileName = path.parse(file.originalname).name;
    let extn = path.parse(file.originalname).ext;
    cb(null, fileName + '-' + uploadTime + extn)
  },
});


let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxFileSize },
  fileFilter(req, file, cb) {   
    //console.log(req.body);
    //console.log(req.file);
    docService.saveDoc(req,file,"P");
    if (!file.originalname.match(/\.(docx|pdf|zip|xlsx|xlsm)$/)) {      
      return cb(new Error('Invalid File Format'))
    }
    cb(undefined, true)
  }
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;