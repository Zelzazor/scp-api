const encryptedSecret = process.env.SECRET;
require('dotenv').config();
const bcrypt = require('bcrypt');

const { Pool } = require('pg');


const pool = new Pool({
    connectionString: process.env.DB_URI,
    ssl: {
        rejectUnauthorized: false
      }
  });

const isAuthenticated = async (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(401).json({"error": "Not Authorized"});
    }
    if(req.headers.authorization.split(' ')[0] !== 'Basic'){
        return res.status(401).json({"error": "Not Authorized"});
    }
    if(!req.headers.authorization.split(' ')[1].includes(':')){
        return res.status(401).json({"error": "Not Authorized"});
    }

    const [key, api_secret] = req.headers.authorization.split(' ')[1].split(':');


    const result = await pool.query('SELECT key, secret FROM "API_KEYS" WHERE key = $1', [key]);
    if(result.rows.length === 0){
        return res.status(401).json({"error": "Not Authorized"});
    }
    const secret = result.rows[0].secret;

    const isAuthenticated = await bcrypt.compare(req.headers.authorization.split(' ')[1].split(':')[1], secret);
    if(!isAuthenticated){
        return res.status(401).json({"error": "Not Authorized"});
    }
    next();
}

module.exports = isAuthenticated;