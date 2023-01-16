const { client,
        getAllUsers,
        createUser,
        createPost,
        updatePost,
        getAllPosts,
        getPostsByUser,
        getUserById,
    } = require('./index');



// this function should call a query which drops all tables from our database
async function dropTables() {
  try {
    await client.query(`
        DROP TABLE IF EXISTS posts;
        DROP TABLE IF EXISTS users;
    `);
  } catch (error) {
    throw error; // we pass the error up to the function that calls dropTables
  }
}

// this function should call a query which creates all tables for our database 
async function createTables() {
  try {
    await client.query(`
        CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        active BOOLEAN DEFAULT true
      );`);
  } catch (error) {
    throw error; // we pass the error up to the function that calls createTables
  }
}

async function createInitialPosts(){
    const [albert, sandra, glamgal] = await getAllUsers();
    await createPost({ authorId: albert.id , title: 'abcd', content: 'albert'});
    
}

async function createPostTable() {
    try {
        await client.query(`
        CREATE TABLE posts (
        id SERIAL PRIMARY KEY,
        authorid INTEGER,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        active BOOLEAN DEFAULT true
        )
        `)
    }
    catch (error) {
    throw error; // we pass the error up to the function that calls createTables
  }
}
async function createInitialUsers() {
  try {
    await createUser({ username: 'albert', password: 'bertie99', name: 'albert', location: 'USA' });
    await createUser({ username: 'sandra', password: '2sandy4me', name: 'albert', location: 'USA' });
    await createUser({ username: 'glamgal', password: 'soglam', name: 'albert', location: 'USA' });

  } catch(error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function updateUser(id, fields = {}) {
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
    const { rows: [user]} = await client.query(`
      UPDATE users
      SET ${ setString }
      WHERE id=${ id }
      RETURNING *;
    `, Object.values(fields));
    
    return user;
  } catch (error) {
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();

    await dropTables();
    await createTables();
    await createPostTable();
    await createInitialUsers();
    await createInitialPosts();
    await getUserById(1);
  } catch (error) {
    console.error(error);
  }
}

async function testDB() {
  try {
    console.log("Starting to test database...");

    console.log("Calling getAllUsers");
    const users = await getAllUsers();
    console.log("Result1:", users);

    console.log("Calling updateUser on users[0]");
    const updateUserResult = await updateUser(users[0].id, {
      name: "Newname Sogood",
      location: "Lesterville, KY"
    });
    console.log("Result2:", updateUserResult);

    console.log("Calling getAllPosts");
    const posts = await getAllPosts();
    console.log("Result3:", posts);

    console.log("Calling updatePost on posts[0]");
    const updatePostResult = await updatePost(posts[0].id, {
      title: "New Title",
      content: "Updated Content"
    });
    console.log("Result4:", updatePostResult);
 
    console.log("Calling getUserById with 1");
    const albert = await getUserById(1);
    console.log("Result5:", albert);

    console.log("Finished database tests!");
  } catch (error) {
    console.log("Error during testDB");
    throw error;
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());