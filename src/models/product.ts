import { client,dbConnection, dbConnectionWithId,dbConnectionArrayOfValues } from "../services/database/database";
import AppError from "../services/errorHandlers/errors";


// create and export a type for the products
export type Product = {
    id?: number,
    name: string,
    price: number,
    category: string,
    description: string,
    avater: string|undefined
}

export class AllProducts{
    // return all products 
    async index(): Promise<Product[]>{
      
        const result=  await  dbConnection("SELECT * FROM products")
        if (!result) {
            throw new AppError("Can not get products", 404)
        }
        return result.rows
    }

    async show(id: string): Promise<Product>{
        const result =await dbConnectionWithId('SELECT * FROM products WHERE id=($1)', id);
        if (!result) {
            throw new AppError(`Can not find product with ${id}`, 404) 
        }
        return result.rows
    }
    async create(product: Product): Promise<Product>{
        console.log(product.avater, product.category, product.description, product.name, product.price)
        // const { name,price, category, description, avater } = product;
        // const productArr = [];
        // productArr.push({ Name: 'name', Value: name });
        // productArr.push({ Name: 'price', Value: price });
        // productArr.push({ Name: 'category', Value: category });
        // productArr.push({ Name: 'description', Value: description });
        // productArr.push({ Name: 'avater', Value: avater });
        // const data = await dbConnectionArrayOfValues("INSERT INTO products (name,price, category, description, avater) VALUES($1, $2, $3, $4, $5) RETURNING *", productArr);
        // console.log(data)
        const sql = "INSERT INTO products (name,price, category, description, avater) VALUES($1, $2, $3, $4, $5) RETURNING *";
        const conn = await client.connect();
        const res = await conn.query(sql, [product.name,product.price,product.category,product.description,product.avater]);
        conn.release();
        if (!res) {
            throw new AppError("Can not create new data in db", 404);
        }
        return res.rows[0]
    }
    async update(id: string, name: string, price: number, category: string, description: string, avater: string): Promise<Product>{
        const data = await dbConnectionArrayOfValues('UPDATE products SET name = $1, price = $2, category = $3, description = $4, avater=$5 WHERE id=($6) RETURNING *', [name, price, category, description, avater, id]);
        if (!data) {
            throw new AppError(`Can not update product with ${id}`, 404)
        }
        return data
    }
    async delete(id: string): Promise<Product>{
        const data = await dbConnectionWithId('DELETE FROM products WHERE id=($1) RETURNING *', id);
        if (!data) {
            throw new AppError(`Can not find product with ${id}`, 404)
        }
        return data
    }
}