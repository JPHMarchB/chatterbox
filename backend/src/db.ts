import {neonConfig, Pool} from '@neondatabase/serverless'
import ws from 'ws'
import path from "path";

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
neonConfig.webSocketConstructor = ws

// Create a database pool instance
const db = new Pool({
    ssl: true,
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
});

// Connect to the database
db.connect()
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Error connecting to the database:', err));

export default db;
