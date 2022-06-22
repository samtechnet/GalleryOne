CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_digest VARCHAR(255) NOT NULL,
    phone_number BIGINT NOT NULL UNIQUE,
    home_address VARCHAR(255),
    NIN_number int,
    date_of_birth DATE 
)