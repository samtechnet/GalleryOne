// import the necessary dependencies
import dotenv from 'dotenv';
import { Pool } from 'pg';

// initialize evnvironment variables
dotenv.config();

// reference the variables in the .env folder
const {
    POSTGRES_HOST, 
    POSTGRES_DB, 
    POSTGRES_TEST_DB,
    POSTGRES_USER, 
    POSTGRES_PASSWORD,
    DATABASE_URL,
    NODE_ENV,
    ENV,
} = process.env;

// create a connection to the database
let client: Pool;
console.log('ENV', NODE_ENV);
if (NODE_ENV === 'test' ) {
    client = new Pool({
      host: POSTGRES_HOST,
      database: POSTGRES_TEST_DB,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
    });
} 

if (NODE_ENV === 'dev') {
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}

if (ENV === 'prod') {
    client = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
}
client.connect();
client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  });

  export default client;
