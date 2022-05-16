import bcrypt from "bcrypt";
import client from "../utilities/database/database";



const saltRounds = Number(process.env.SALT_ROUNDS);
const pepper = String(process.env.BCRYPT_PASSWORD);

export type User = {
  id?: string;
  first_name: string;
  last_name: string;
    password: string;
    phone_number: number;
    date_of_birth: number;
    email: string;
    NIN_number: number;
    home_address: string
};
export class UserTable {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM Users";
      const res = await conn.query(sql);
      conn.release();
      return res.rows;
    } catch (error) {
      throw new Error(`unable to fetch user from database ${error}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      let loginDetails = {
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        password: user.password,
          phoneNumber: user.phone_number,
        dateOfBirth: user.date_of_birth
      };
      const conn = await client.connect();
      const sql =
        "INSERT INTO users (first_name,last_name,email,phone_number,date_of_birth, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
      const hash = await bcrypt.hash(
        loginDetails.password + pepper,
        saltRounds
      );
      const result = await conn.query(sql, [
        loginDetails.firstName,
        loginDetails.lastName,
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
    try {
      const sql = "SELECT * FROM Users WHERE id=($1)";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not find user with id ${id}. Error: ${error}`);
    }
  }
  async authenticate(
    first_name: string,
    password: string
  ): Promise<User | null> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users WHERE first_name = $1";
      const result = await conn.query(sql, [first_name]);
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
    };