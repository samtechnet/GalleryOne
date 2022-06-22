import  bcrypt from "bcrypt";
import { client, dbConnection } from "../services/database/database";
import AppError from "../services/errorHandlers/errors";



const saltRounds = Number(process.env.SALT_ROUNDS);
const pepper = String(process.env.BCRYPT_PASSWORD);

export type User = {
  id?: string;
  first_name: string;
  last_name: string;
  password_digest: string;
    phone_number: number;
    date_of_birth: number;
    email: string;
    NIN_number?: number;
    home_address: string
};
export class UserTable {
  async index(): Promise<User[]> {
    
    const result = await dbConnection("SELECT * FROM Users");
    if (!result.rows) {
      throw new AppError('unable to fetch user from database', 500);
    }
    return  result.rows;

  }

  // async create(user: User): Promise<User> {
  //   try {
  //     let loginDetails = {
  //       firstName: user.first_name,
  //       lastName: user.last_name,
  //       email: user.email,
  //       password: user.password,
  //       phoneNumber: user.phone_number,
  //       dateOfBirth: user.date_of_birth,
  //       homeAddress: user.home_address
  //     };
      
  //     const hash = await bcrypt.hash(
  //       loginDetails.password + pepper,
  //       saltRounds
  //     );
      // const res = await dbConnections("INSERT INTO users (first_name,last_name,email,phone_number,date_of_birth, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [
      //   loginDetails.email,
      //   hash,
      // ] );
      // return res.rows[0];
  //   } catch (error) {
  //     throw new Error(
  //       `unable to create user ${
  //         (user.first_name, user.last_name)
  //       }. Error: ${error}`
  //     );
  //   }
  // }
  
  async create(user: User): Promise<User> {
    try {
      let loginDetails = {
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phoneNumber: user.phone_number,
        dateOfBirth: user.date_of_birth,
        homeAddress: user.home_address,
        password: user.password_digest,
        nin: user.NIN_number
      };
      const conn = await client.connect();
      const sql =
        "INSERT INTO users (first_name,last_name,email,phone_number,date_of_birth,home_address, password_digest) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
      const hash = await bcrypt.hash(
        loginDetails.password + pepper,
        saltRounds
      );
      const result = await conn.query(sql, [
        loginDetails.firstName,
        loginDetails.lastName,
        loginDetails.email,
        loginDetails.phoneNumber,
        loginDetails.dateOfBirth,
        loginDetails.homeAddress,
        hash,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `unable to create user ${
          (user.first_name, user.last_name)
        }. Error: ${error}`
      );
    }
  }
  async show(id: string): Promise<User> {
  
    const sql = "SELECT * FROM users WHERE id=($1)";
    const conn = await client.connect();
    const result = await conn.query(sql, [id]);
  conn.release();
  if (!result.rows[0]) {
    throw new AppError('Could not find user with id ${id}.', 500);
  }
    return result.rows[0];
    

}


  async authenticate(
    email: string,
    password: string
  ): Promise<User | null> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users WHERE email = $1";
      const result = await conn.query(sql, [email]);
      if (result.rows.length) {
        const user = result.rows[0];
        if (await bcrypt.compare(password + pepper, user.password)) {
          return user.password;
        }
      }
      conn.release();
      return null;
    } catch (error) {
      throw new Error(`Cannot authenticate user ${error}`);
    }
  }
}