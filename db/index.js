const { Client } = require('pg'); // imports the pg module

// supply the db name and location of the database
const client = new Client('postgres://localhost/juicebox-dev');


async function getAllUsers () {
    const {rows} = await client.query (
        `Select id, username, name, location
        From users;
        `);
        return rows
}

async function createUser({ username, password, name, location }) {
  try {
   const { rows: [user] } = await client.query(`
      INSERT INTO users(username, password, name, location) 
      VALUES($1, $2, $3, $4) ;
    `, [username, password, name, location]);

    return user
  } catch (error) {
    throw error;
  }
}

async function createPost({
  authorId,
  title,
  content
}) {
  try {
    const { rows } = await client.query(`
      INSERT INTO posts(authorId, title, content) 
      VALUES($1, $2, $3) ;
    `, [authorId, title, content])
  } catch (error) {
    throw error;
  }
}
async function updatePost(id, fields = {}) {
  // build the set string
  const setString = Object.keys(fields).map(
    (key, index) => `"${ key }"=$${ index + 1 }`
  ).join(', ');
    console.log(Object.values(fields), "ASDKFJASKLDFJ")
  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }

  try {
    const { rows: [post]} = await client.query(`
      UPDATE posts
      SET ${ setString }
      WHERE id=${ id }
      RETURNING *;
    `, Object.values(fields));
    
    return post;
  } catch (error) {
    throw error;
  }
}


async function getAllPosts() {
  try {
    const { rows } = await client.query(`
      SELECT * FROM posts
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getPostsByUser(userId) {
  try {
    const { rows } = await client.query(`
      SELECT * FROM posts
      WHERE "authorid"=${ userId };
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getUserById(userId){
  try {
    const {rows} = await client.query(`
      SELECT * FROM users
      WHERE "id"=${ userId } 
    `)
    const user = rows
    delete user.password
    const posts = await getPostsByUser(userId)
    user.posts = posts
    return user
    } catch (error) {
    throw error;
  }
}


module.exports = {
  client,
  getAllUsers,
  createUser,
  createPost,
  updatePost,
  getAllPosts,
  getPostsByUser,
  getUserById
  
}