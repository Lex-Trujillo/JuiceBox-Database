const { Client } = require('pg'); // imports the pg module

// supply the db name and location of the database
const client = new Client('postgres://localhost/juicebox-dev');
console.log("check")

async function getAllUsers () {
    const {rows} = await client.query (
        `Select id, username
        From users;
        `);
        
        return rows
}



module.exports = {
  client,
  getAllUsers
    
}