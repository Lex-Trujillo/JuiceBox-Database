const { Client } = require('pg'); // imports the pg module

// supply the db name and location of the database
const client = new Client('postgres://localhost:5432/juicebox-dev');


async function getAllUsersForApi () {
  console.log('GET ALL USERS!');

  // in AWS querying the db times out when called from the API
    const rows = [
  { id: 1, username: 'albert', name: 'albert', location: 'USA' },
  { id: 2, username: 'sandra', name: 'albert', location: 'USA' },
  { id: 3, username: 'glamgal', name: 'albert', location: 'USA' }
];
        return rows
}

async function getAllUsers () {
  console.log('GET ALL USERS!');

    const {rows} = await client.query (
        `Select id, username, name, location
        From users;
        `);
        
        console.log(rows);

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

async function createUserForApi({ username, password, name, location }) {
  try {
       const user = [
  {
    id: 1,
    username: 'albert',
    password: 'bertie99',
    name: 'albert',
    location: 'USA',
    active: true,
    posts: [
    {
      id: 1,
      authorid: 1,
      title: 'abcd',
      content: 'albert',
      active: true
    }
  ]
  },
  
]
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

async function createTags(tagList) {
  
    if (tagList.length === 0) { 
      return; 
    }
    
    const insertValues = tagList.map(
    (tag, index) =>  
    { 
      return `$${index + 1}`
    }
    ).join('), (')
    
    const selectValues = tagList.map(
    (_, index) => `$${index + 1}`).join(', ');
    const tag = 'hello';
    const sqlString = `INSERT INTO tags(name) VALUES (${insertValues})  `;
    console.log('sql string', sqlString, insertValues);
    
  
  try {
    
      const { rows } = await client.query(sqlString, tagList)
    

//ON CONFLICT (name) DO NOTHING;
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
    console.log(user, "START OF CONSOLE LOG")
    const posts = await getPostsByUser(userId)
    user.posts = posts
    console.log(user, "CONSOLE LOG USER")
    return user
    } catch (error) {
    throw error;
  }
}

async function getUserByIdForApi(userId){
  try {
    // const {rows} = await client.query(`
    //   SELECT * FROM users
    //   WHERE "id"=${ userId } 
    // `)
    // const user = rows
    // delete user.password
    // const posts = await getPostsByUser(userId)
    // user.posts = posts
    const user = [
  {
    id: 1,
    username: 'albert',
    password: 'bertie99',
    name: 'albert',
    location: 'USA',
    active: true,
    posts: [
    {
      id: 1,
      authorid: 1,
      title: 'abcd',
      content: 'albert',
      active: true
    }
  ]
  },
  
]
    return user
    } catch (error) {
    throw error;
  }
}

async function getUserByUsernameForApi(username){
  try {
    // const {rows} = await client.query(`
    //   SELECT * FROM users
    //   WHERE "id"=${ userId } 
    // `)
    // const user = rows
    // delete user.password
    // const posts = await getPostsByUser(userId)
    // user.posts = posts
    const user = [
  {
    id: 1,
    username: 'albert',
    password: 'bertie99',
    name: 'albert',
    location: 'USA',
    active: true,
    posts: [
    {
      id: 1,
      authorid: 1,
      title: 'abcd',
      content: 'albert',
      active: true
    }
  ]
  },
  
]
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
  getUserById,
  createTags,
  getAllUsersForApi,
  getUserByUsernameForApi
}