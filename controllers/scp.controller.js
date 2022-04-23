require('dotenv').config();

const { Pool } = require('pg');


const pool = new Pool({
    connectionString: process.env.DB_URI,
    ssl: {
        rejectUnauthorized: false
      }
  });

const getAllSCPs =  async (_req, res) => {
        const data = await pool.query('SELECT item_number, object_class, series, name, description, link FROM SCP ORDER BY item_number ASC');
        let result = data.rows;
        return res.json(result);
     
}

const getSCP = async (req, res) => {      
        const data = await pool.query('SELECT item_number, object_class, series, name, description, link FROM SCP WHERE item_number = $1', ['SCP-'+req.params.number])
        let result = data.rows;
        if(data.rows.length > 0){
            return res.json(result);
        }
        else{
            return res.status(404).json({"error": 'SCP was not found. Please check that you have put a correct query.'});
        }
        
    
}

const getRandomSCP = async (_req, res) => {
        const data = await pool.query('SELECT item_number, object_class, series, name, description, link FROM SCP ORDER BY RANDOM() LIMIT 1');
        const result = data.rows;
        
        res.json(result);
    
}

const get404 = (_req, res) => {
    return res.status(404).json({"error": 'Resource was not found. Please check that you have put a correct query.'});
}

module.exports = {
    getAllSCPs,
    getSCP,
    getRandomSCP,
    get404
}