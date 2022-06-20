// import the client connection from the database file
// @ts-ignore
import client from "../../database";

// create and export a type for the products
export type Wallet = {
    id?: number,
    balance: number,
    user_id: number
}

// create and export a class for all CRUD actions
export class TheWallet {
    // return users balance
    async show(user_id: string): Promise<Wallet> {
        try {
          // @ts-ignore
            const connection = await client.connect();
            const sql = "SELECT balance FROM wallets WHERE user_id=($1)";
            const result = await connection.query(sql, [user_id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not get balance ${user_id}, Error: ${error}`);
        }
    }

    // create new product
    async create(wallet: Wallet): Promise<Wallet> {
        try {
         // @ts-ignore
            const connection = await client.connect();
            const sql = 'INSERT INTO wallets (balance, user_id) VALUES($1, $2) RETURNING *';
            const values = [wallet.balance, wallet.user_id];
            const result = await connection.query(sql, values);
            connection.release();
            return result.row[0];
        } catch (error) {
            throw new Error(`could not create new wallet in the db ${error}`)
        }
    }
}