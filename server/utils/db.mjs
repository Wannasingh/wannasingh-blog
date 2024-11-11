import * as pg from "pg";
const { Pool } = pg.default;
import dotenv from "dotenv";

const connectionPool = new Pool({
  connectionString: process.env.CONNECTION_STRING,
});

export default connectionPool;