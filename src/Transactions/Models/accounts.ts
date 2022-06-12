// import the client connection from the database file
// @ts-ignore
import client from "../../database";
import accounts from "../Controllers/accounts";

// create and export a type for the accounts
export type Accounts = {
    id?: number,
    user_id: number,
    accounts_number: number,
    amount?: number,
    balance: number
}


// create and export a class for all CRUD actions
export class AllAccounts {
    // return all accounts
    async index(): Promise<Accounts[]> {
           // @ts-ignore
        const connection = await client.connect();

        try {
            const sql = "SELECT * FROM accounts";
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Cannot get accounts ${error}`);
        }
    }

     // get an item from the database
    async show(user_id: string): Promise<Accounts> {
           // @ts-ignore
        const connection = await client.connect();

        try {
            const sql = 'SELECT * FROM accounts WHERE user_id=($1)';
            const result = await connection.query(sql, [user_id]);
            connection.release();
            console.log(result.rows[0].balance);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not find accounts ${user_id}, Error: ${error}`);
        }
    }

         // get the balance from the database
    async showBalance(user_id: string): Promise<Accounts> {
           // @ts-ignore
        const connection = await client.connect();

        try {
            const sql = 'SELECT * FROM accounts WHERE user_id=($1)';
            const result = await connection.query(sql, [user_id]);
            connection.release();
            return result.rows[0].balance;
        } catch (error) {
            throw new Error(`Could not get balance ${user_id}, Error: ${error}`);
        }
    }

        // create new account
    async create(accounts: Accounts): Promise<Accounts> {
       // @ts-ignore
    const connection = await client.connect();

        try {
            const text = "INSERT INTO accounts(accounts_number, balance, amount, user_id) VALUES($1, $2, $3, $4) RETURNING *";
            const values = [accounts.accounts_number, accounts.balance, accounts.amount, accounts.user_id];
            const res = await connection.query(text, values);
            console.log(res.rows[0]);
            return res.rows[0];
        } catch (error) {
            throw new Error(`could not create new account in the db ${error}`)
        }
    }

        // debit an item in the database by id
        async debitAccount(accounts: Accounts): Promise<Accounts> {
               // @ts-ignore
            const connection = await client.connect();

            try { 
                const begin = await connection.query('BEGIN');
                const sql = "UPDATE accounts SET balance = $1, amount = $2, user_id = $3 WHERE accounts_number = $4 RETURNING *";
                const values = [accounts.balance, accounts.amount, accounts.user_id, accounts.accounts_number];
                const result = await connection.query(sql, values);
                const commit = await connection.query('COMMIT');
                connection.release();
                return result.rows[0];
            } catch (error) {
                const rollback = await connection.query('ROLLBACK');
                throw new Error(`Could not update account ${accounts.accounts_number}. Error: ${error}`);        
            }
        }

        // credit an account in the database by id
        async creditAccount(accounts: Accounts): Promise<Accounts> {
            // @ts-ignore
        const connection = await client.connect();

        try { 
            const begin = await connection.query('BEGIN');
            const sql = "UPDATE accounts SET balance = $1, amount = $2, user_id = $3 WHERE accounts_number = $4 RETURNING *";
            const values = [accounts.balance, accounts.amount, accounts.user_id, accounts.accounts_number];
            const result = await connection.query(sql, values);
            const commit = await connection.query('COMMIT');
            connection.release();
            return result.rows[0];
        } catch (error) {
            const rollback = await connection.query('ROLLBACK');
            throw new Error(`Could not update account ${accounts.accounts_number}. Error: ${error}`);        
        }
    }

           // delete from the database
    async delete(user_id: string): Promise<Accounts> {
        try {
            // @ts-ignore
            const connection = await client.connect();
            const sql = 'DELETE FROM accounts WHERE user_id=($1) RETURNING *';
            const result = await connection.query(sql, [user_id]);
            const books = result.rows[0];
            connection.release();
            return books;
        } catch (err) {
            throw new Error(`Could not delete product ${user_id}. Error: ${err}`)
        }
    }
}