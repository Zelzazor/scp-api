const express = require('express');
const helmet = require('helmet');
const app = express();
const fs = require('fs');
require('dotenv').config();
const port = process.env.PORT;
const encodedKey = process.env.KEY;

app.use(helmet());

app.get('/scp/', (req, res)=>{
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
    
});

app.get('^/scp/:number([0-9]{3,4})', (req,res)=>{
    if(!req.headers.authorization){
        return res.json({"error": "Not Authorized"});
     }
     else if(Buffer.from(req.headers.authorization.split(' ')[1]).toString('base64') != encodedKey){
        return res.json({"error": "Not Authorized"});
     }
    fs.readFile(`./scp/scp.json`, (err, data) => {
        if (err) throw err;
        let result = JSON.parse(data);
        let filter = result.filter(item => item.title === `SCP-${req.params.number}`)
        res.json(filter);
    });
    
});

app.get('/scp/random', (req,res)=>{
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
        let filter = result.filter(item => item.title === `SCP-${random}`)
        res.json(filter);
    });
    
});




app.listen(port, ()=>{
    console.log(`Listening at port ${port}`)
})