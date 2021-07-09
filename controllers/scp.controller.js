require('dotenv').config();
const encodedKey = process.env.KEY;
const fs = require('fs');
const { Pool } = require('pg');


const pool = new Pool({
    connectionString: process.env.DB_URI,
    ssl: {
        rejectUnauthorized: false
      }
  });

const getAllSCPs =  async (req, res) => {
    if(!req.headers.authorization){
        return res.json({"error": "Not Authorized"});
     }
     else if(Buffer.from(req.headers.authorization.split(' ')[1]).toString('base64') != encodedKey){
        return res.json({"error": "Not Authorized"});
     }
        const data = await pool.query('SELECT item_number, object_class, series, name, description, link FROM SCP ORDER BY item_number ASC');
        let result = data.rows;
        return res.json(result);
     
}

const getSCP = async (req, res) => {
    if(!req.headers.authorization){
        return res.json({"error": "Not Authorized"});
     }
     else if(Buffer.from(req.headers.authorization.split(' ')[1]).toString('base64') != encodedKey){
        return res.json({"error": "Not Authorized"});
     }
                 
        const data = await pool.query('SELECT item_number, object_class, series, name, description, link FROM SCP WHERE item_number = $1', ['SCP-'+req.params.number])
        let result = data.rows;
        if(data.rows.length > 0){
            return res.json(result);
        }
        else{
            return res.status(404).json({"error": 'SCP was not found. Please check that you have put a correct query.'});
        }
        
    
}

const getRandomSCP = async (req, res) => {
    if(!req.headers.authorization){
        return res.json({"error": "Not Authorized"});
     }
     else if(Buffer.from(req.headers.authorization.split(' ')[1]).toString('base64') != encodedKey){
        return res.json({"error": "Not Authorized"});
     }
        
        const data = await pool.query('SELECT item_number, object_class, series, name, description, link FROM SCP ORDER BY RANDOM() LIMIT 1');
        const result = data.rows;
        
        res.json(result);
    
}

const get404 = (req, res) => {
    return res.status(404).json({"error": 'Resource was not found. Please check that you have put a correct query.'});
}

module.exports = {
    getAllSCPs,
    getSCP,
    getRandomSCP,
    get404
}