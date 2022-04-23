const encryptedSecret = process.env.SECRET;
require('dotenv').config();
const bcrypt = require('bcrypt');
const genAPIKey = require('generate-api-key');

const { Pool } = require('pg');


const pool = new Pool({
    connectionString: process.env.DB_URI,
    ssl: {
        rejectUnauthorized: false
      }
  });

const generateKeyAndSecret = async (req, res) => {
    const { secret } = req.body;

    if(!secret){
        return res.status(400).json({"error": "Please provide a secret"});
    }
    const isCorrectSecret = await bcrypt.compare(secret, encryptedSecret);
    if(!isCorrectSecret){
        return res.status(401).json({"error": "Not Authorized"});
    }

    const key = genAPIKey();
    const secretKey = genAPIKey();

    const secretHash = await bcrypt.hash(secretKey, 10);

    const insert = await pool.query('INSERT INTO "API_KEYS" (key, secret) VALUES ($1, $2) RETURNING key', [key,secretHash]);

    return res.json({
        key: insert.rows[0].key,
        secret: secretKey
    });
}

module.exports = {
    generateKeyAndSecret
}