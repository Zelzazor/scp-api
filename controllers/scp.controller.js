require('dotenv').config();
const encodedKey = process.env.KEY;
const fs = require('fs');

const getAllSCPs = (req, res) => {
    if(!req.headers.authorization){
        return res.json({"error": "Not Authorized"});
     }
     else if(Buffer.from(req.headers.authorization.split(' ')[1]).toString('base64') != encodedKey){
        return res.json({"error": "Not Authorized"});
     }
     fs.readFile(`./scp/scp.json`, (err, data) => {
         if (err) throw err;
         let result = JSON.parse(data);
         res.json(result);
     });
}

const getSCP = (req, res) => {
    if(!req.headers.authorization){
        return res.json({"error": "Not Authorized"});
     }
     else if(Buffer.from(req.headers.authorization.split(' ')[1]).toString('base64') != encodedKey){
        return res.json({"error": "Not Authorized"});
     }
    fs.readFile(`./scp/scp.json`, (err, data) => {
        if (err) throw err;
        let result = JSON.parse(data);
        let filter = result.find(item => item.title === `SCP-${req.params.number}`)
        res.json(filter);
    });
}

const getRandomSCP = (req, res) => {
    if(!req.headers.authorization){
        return res.json({"error": "Not Authorized"});
     }
     else if(Buffer.from(req.headers.authorization.split(' ')[1]).toString('base64') != encodedKey){
        return res.json({"error": "Not Authorized"});
     }
    fs.readFile(`./scp/scp.json`, (err, data) => {
        if (err) throw err;
        let result = JSON.parse(data);
        let random = Math.floor(Math.random() * (result.length)) + 1
        if(random < 100){
            if(random < 10){
                random = "00"+random;
            }
            else{
                random = "0"+random;
            }
            
        }
        let filter = result.find(item => item.title === `SCP-${random}`)
        res.json(filter);
    });
}

module.exports = {
    getAllSCPs,
    getSCP,
    getRandomSCP
}