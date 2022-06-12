CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    amount DECIMAL NOT NULL,
    account_id bigint REFERENCES accounts(id) NOT NULL,
    balance_before DECIMAL NOT NULL,
    balance_after DECIMAL NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
)