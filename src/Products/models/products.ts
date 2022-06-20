// import the client connection from the database file
// @ts-ignore
import client from "../../database";
import { catchErrors } from "../../Error/catchAsync";

// create and export a type for the products
export type Product = {
    id?: number,
    name: string,
    price: number,
    category: string,
    description: string
}

// create and export a class for all CRUD actions
export class AllProducts {
    // return all products
    async index(): Promise<Product[]> {
        try {
            // @ts-ignore
            let connection = await client.connect();
            const sql = "SELECT * FROM products";
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Cannot get products ${error}`);
        }
    }

     // get a item from the database
    async show(id: string): Promise<Product> {
        try {
            // @ts-ignore
            const connection = await client.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not find products ${id}, Error: ${error}`);
        }
    }

    // create new product
    async create(product: Product): Promise<Product> {
        try {
            // @ts-ignore
            const connection = await client.connect();
            const text = "INSERT INTO products(name, price, category, description) VALUES($1, $2, $3, $4) RETURNING *";
            const values = [product.name, product.price, product.category, product.description];
            const res = await connection.query(text, values);
            console.log(res.rows[0]);
            return res.rows[0];
        } catch (error) {
            throw new Error(`could not create new data in the db ${error}`)
        }
    }

         // update an item in the database by id
    async update(id: string, name: string, price: number, category: string, description: string): Promise<Product> {
        try {
            // @ts-ignore
            const connection = await client.connect();
            const sql = 'UPDATE products SET name = $1, price = $2, category = $3, description = $4 WHERE id=($5) RETURNING *';
            const values = [name, price, category, description, id];
            const result = await connection.query(sql, values);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not update product ${id}. Error: ${error}`);        
        }
    }
    
       // delete from the database
   async delete(id: string): Promise<Product> {
        try {
            // @ts-ignore
            const connection = await client.connect();
            const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';
            const result = await connection.query(sql, [id]);
            const books = result.rows[0];
            connection.release();
            return books;
        } catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`)
        }
    }
}