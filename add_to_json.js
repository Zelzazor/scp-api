//const fs = require('fs');
const { Pool } = require('pg');
const readline = require("readline-sync");


const pool = new Pool({
    host: 'ec2-3-224-7-166.compute-1.amazonaws.com',
    user: 'anpanqpgsldhlp',
    password: 'e0462cceec4d9aef4d5f43a887debe70f01c545b5c85d91c9e2e083c97c86f7d',
    database: 'd4g71th70ep9ls',
    port: '5432',
    ssl: true
  })

let scp = {
    item_number: "",
    object_class: "",
    series: 1,
    name: "",
    description: "",
    link: ""
}




console.log("Write SCP Number: ");
let number = readline.question();
console.log("Write SCP name: ");
let name = readline.question();
console.log("Write SCP Class: ")
let scp_class = readline.question();
console.log("Write SCP description: ");
let description = readline.question();

scp.item_number = number;
scp.object_class = scp_class;
scp.name = name;
scp.description = description;
scp.link = "http://scp-wiki.wikidot.com/scp-"+number;

 console.log(scp);

pool.query('INSERT INTO SCP (item_number, object_class, series, name, description, link) VALUES($1, $2, $3, $4, $5, $6)',[scp.item_number, scp.object_class, scp.series, scp.name, scp.description, scp.link]).then(res => console.log('SCP ADDED!'))



// fs.readFile(`./scp/scp.json`, (err, data) => {
//     if (err) throw err;
//     let result = JSON.parse(data);
//     result.push(scp);
//     let strData = JSON.stringify(result, null, 2);

//     fs.writeFile('./scp/scp.json', strData, (err) => {
//         if (err) throw err;
//         console.log('Data written to file');
//     });
// });



