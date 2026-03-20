
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export const query = async (text, params) => {
  //console.log(text);
  //console.log(params);
  const res = await pool.query(text, params);
  //console.log(res);
  return res;
}



