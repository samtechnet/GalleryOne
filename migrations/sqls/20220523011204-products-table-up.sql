CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    price INTEGER NOT NULL,
    category text NOT NULL,
    description text NOT NULL
);