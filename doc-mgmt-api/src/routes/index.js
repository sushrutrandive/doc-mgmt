const express = require('express');
const fs = require('fs');
const path = require('path')
const router = express.Router();
const docController = require('./../upload/controller');


router.get('/', (req, res) => res.send('doc-mgmt-api v1'));

router.get('/docs', docController.getDocs);
router.post('/docs', docController.upload);
router.put('/docs', docController.update);
router.get("/docs/:name", docController.download);

router.post('/login', (req, res) => {
   
    let loginInfo = req.body;
    if (loginInfo.userName == "user1" && loginInfo.pwd == "user1") {
        res.send({
            "firstName": "John",
            "lastName": "Doe",
            "userId": "user1"
        })
    } else if (loginInfo.userName == "user2" && loginInfo.pwd == "user2") {
        res.send({
            "firstName": "Max",
            "lastName": "Payne",
            "userId": "user2"
        });
    }
    else {
        res.status(401).send({ message: "Invalid credentials" });
    }
});

module.exports = router;