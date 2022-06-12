// import the client connection from the database file
// @ts-ignore
import client from "../../database";

// create and export a type for the transactions
export type Transactions = {
    id?: number,
    amount: number,
    account_id: number,
    balance_before: number,
    balance_after: number
}

// create and export a class for all CRUD actions
export class AllTransactions {
    // return all transactions
    async index(): Promise<Transactions[]> {
        try {
            // @ts-ignore
            let connection = await client.connect();
            const sql = "SELECT * FROM transactions";
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Cannot get transactions ${error}`);
        }
    }

    // get an item from the database
    async show(user_id: string): Promise<Transactions> {
        try {
            // @ts-ignore
            const connection = await client.connect();
            const sql = 'SELECT * FROM transactions WHERE user_id=($1)';
            const result = await connection.query(sql, [user_id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not find transactions ${user_id}, Error: ${error}`);
        }
    }

    // create new account
    async create(transactions: Transactions): Promise<Transactions> {
        try {
            // @ts-ignore
            const connection = await client.connect();
            const text = "UPDATE transactions SET balance_after = balance_before + amount WHERE account_id = $1 RETURNING *";
            
            const values = [transactions.balance_before, transactions.balance_after, transactions.amount, transactions.account_id];
            const res = await connection.query(text, values);
            console.log(res.rows[0]);
            return res.rows[0];
        } catch (error) {
            throw new Error(`could not create new account in the db ${error}`)
        }
    }

}
