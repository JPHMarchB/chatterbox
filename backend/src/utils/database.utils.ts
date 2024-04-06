import postgres from 'postgres'
import path from "path";

require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

export const sql = postgres({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT as string),
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: true,
    transform: {
        column: {
            from: postgres.toCamel, to: postgres.fromCamel
        }
    }
})
