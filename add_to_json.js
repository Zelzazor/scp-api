const fs = require('fs');
const readline = require("readline-sync");

let scp = {
    title: "",
    class: "",
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

scp.title = "SCP-"+number;
scp.class = scp_class;
scp.name = name;
scp.description = description;
scp.link = "http://scp-wiki.wikidot.com/scp-"+number;

console.log(scp);



fs.readFile(`./scp/scp.json`, (err, data) => {
    if (err) throw err;
    let result = JSON.parse(data);
    result.push(scp);
    let strData = JSON.stringify(result, null, 2);

    fs.writeFile('./scp/scp.json', strData, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
});



