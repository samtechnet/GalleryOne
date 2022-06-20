import dotenv from "dotenv";
import { Pool } from "pg";


dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_DB_TEST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  ENV,
} = process.env;

let client: Pool;
console.log("ENV", ENV)
if (ENV === "test") {
  console.log("I am in test mode");
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB_TEST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

if (ENV === "prode") {
  console.log("I am in Production mode");
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

if (ENV === "dev") {
  console.log("I am in dev mode");
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
};

if (ENV === "prod") {
  console.log("I am in production mode");
    client = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
};
client.connect();
client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  });
const dbConnection = async (sql: string):Promise<any> => {
  const conn = await client.connect();
  const res = await conn.query(sql);
  
  conn.release();
  return res
};
const dbConnectionWithId = async (sql: string, id:string
): Promise<any> => {
 
  const conn = await client.connect();
  const res = await conn.query(sql,[id] );
  
  conn.release();
  return res
};

const dbConnectionArrayOfValues = async (sql: string, []
  ): Promise<any> => {
   
    const conn = await client.connect();
    const res = await conn.query(sql,[] );
    console.log([])
    conn.release();
    return res
  };

  export { client, dbConnection, dbConnectionWithId, dbConnectionArrayOfValues };
