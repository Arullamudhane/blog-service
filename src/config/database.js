// Import necessary modules
const { Pool } = require("pg");

// Configure PostgreSQL connection pool
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "test1",
  password: "Qwertyuiop3@",
  port: 5432,
});

// Function to set up database and tables
const setupDatabase = async () => {
  try {
    // Ensure uuid-ossp extension is available
    await pool.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      
    `);

    // Check if jblog schema exists
    const schemaCheck = await pool.query(`
      SELECT schema_name FROM information_schema.schemata WHERE schema_name = 'public'
    `);

    // If schema doesn't exist, create it
    if (schemaCheck.rows.length === 0) {
      console.log(`Creating schema 'jblog'...`);
      await pool.query(`CREATE SCHEMA jblog;`);
    } else {
      console.log(`Schema 'public' already exists.`);
    }

    // Check if Users table exists
    const usersTableCheck = await pool.query(`
      SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'users'
    `);

    // const aa = await pool.query(`
    // `);

    // If Users table doesn't exist, create it
    if (usersTableCheck.rows.length === 0) {
      console.log(`Creating Users table...`);
      // await pool.query(`

      //   CREATE TABLE Roles (
      //     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      //     name VARCHAR(50) UNIQUE NOT NULL,
      //     description TEXT
      //   );

      //   CREATE TABLE Users (
      //     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      //     email VARCHAR(255) UNIQUE NOT NULL,
      //     password_hash VARCHAR(255),
      //     google_id VARCHAR(255),
      //     name VARCHAR(255) NOT NULL,
      //     profile_picture_url VARCHAR(255),
      //     role_id UUID REFERENCES Roles(id),
      //     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      //     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      //   );

      //   CREATE TABLE Subscriptions (
      //     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      //     user_id UUID REFERENCES Users(id),
      //     subscription_type VARCHAR(50) NOT NULL,
      //     start_date TIMESTAMP NOT NULL,
      //     end_date TIMESTAMP,
      //     status VARCHAR(50) NOT NULL,
      //     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      //     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      //   );

      //   CREATE TABLE Payments (
      //     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      //     user_id UUID REFERENCES Users(id),
      //     amount DECIMAL(10, 2) NOT NULL,
      //     currency VARCHAR(10) NOT NULL,
      //     payment_date TIMESTAMP NOT NULL,
      //     payment_method VARCHAR(50) NOT NULL,
      //     transaction_id VARCHAR(255) UNIQUE NOT NULL,
      //     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      //     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      //   );

      //   CREATE TABLE Blogs (
      //     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      //     user_id UUID REFERENCES Users(id),
      //     title VARCHAR(255) NOT NULL,
      //     content TEXT NOT NULL,
      //     read_duration INTEGER,
      //     posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      //     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      //     is_premium BOOLEAN DEFAULT FALSE
      //   );

      //   CREATE TABLE Tags (
      //     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      //     name VARCHAR(50) UNIQUE NOT NULL
      //   );

      //   CREATE TABLE BlogTags (
      //     blog_id UUID REFERENCES Blogs(id),
      //     tag_id UUID REFERENCES Tags(id),
      //     PRIMARY KEY (blog_id, tag_id)
      //   );

      //   CREATE TABLE Comments (
      //     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      //     blog_id UUID REFERENCES Blogs(id),
      //     user_id UUID REFERENCES Users(id),
      //     content TEXT NOT NULL,
      //     posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      //     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      //   );

      //   CREATE TABLE UserSubscriptions (
      //     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      //     subscriber_id UUID REFERENCES Users(id),
      //     subscribed_to_id UUID REFERENCES Users(id),
      //     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      //     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      //     UNIQUE (subscriber_id, subscribed_to_id)
      //   );

      //   INSERT INTO Roles (name, description)
      //   VALUES
      //     ('user', 'Default role for all new users'),
      //     ('author', 'Author role'),
      //     ('puser', 'Premium user role'),
      //     ('admin', 'Administrator role');
      // `);

      // console.log(`Users table created successfully.`);
    } else {
      console.log(`Users table already exists.`);
    }
  } catch (error) {
    console.error(`Error setting up database:`, error);
  }
};

// Call setupDatabase function to initialize database and tables
setupDatabase();

// CRUD operations for Users table
const getUsers = async (request, response) => {
  try {
    const users = await pool.query(`SELECT * FROM users ORDER BY id ASC`);
    response.status(200).json(users.rows);
  } catch (error) {
    console.error(`Error getting users:`, error);
    response.status(500).send(`Error getting users`);
  }
};

const getUserById = async (request, response) => {
  const id = request.params.id;
  try {
    const user = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
    if (user.rows.length > 0) {
      response.status(200).json(user.rows[0]);
    } else {
      response.status(404).send(`User not found`);
    }
  } catch (error) {
    console.error(`Error getting user with ID ${id}:`, error);
    response.status(500).send(`Error getting user`);
  }
};

const createUser = async (request, response) => {
  const {
    email,
    password_hash,
    google_id,
    name,
    profile_picture_url,
    role_id,
  } = request.body;
  try {
    const newUser = await pool.query(
      `
      INSERT INTO users (email, password_hash, google_id, name, profile_picture_url, role_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `,
      [email, password_hash, google_id, name, profile_picture_url, role_id]
    );

    response.status(201).json(newUser.rows[0]);
  } catch (error) {
    console.error(`Error creating user:`, error);
    response.status(500).send(`Error creating user`);
  }
};

const updateUser = async (request, response) => {
  const id = request.params.id;
  const {
    email,
    password_hash,
    google_id,
    name,
    profile_picture_url,
    role_id,
  } = request.body;
  try {
    const updatedUser = await pool.query(
      `
      UPDATE users
      SET email = $1, password_hash = $2, google_id = $3, name = $4, profile_picture_url = $5, role_id = $6, updated_at = CURRENT_TIMESTAMP
      WHERE id = $7
      RETURNING *
    `,
      [email, password_hash, google_id, name, profile_picture_url, role_id, id]
    );

    if (updatedUser.rows.length > 0) {
      response.status(200).json(updatedUser.rows[0]);
    } else {
      response.status(404).send(`User not found`);
    }
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error);
    response.status(500).send(`Error updating user`);
  }
};

const deleteUser = async (request, response) => {
  const id = request.params.id;
  try {
    const deletedUser = await pool.query(`DELETE FROM users WHERE id = $1`, [
      id,
    ]);
    if (deletedUser.rowCount > 0) {
      response.status(200).send(`User deleted with ID: ${id}`);
    } else {
      response.status(404).send(`User not found`);
    }
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
    response.status(500).send(`Error deleting user`);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  pool,
};
