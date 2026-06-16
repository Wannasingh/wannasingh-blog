import oracledb from "oracledb";

// Enable Thin mode by default (pure JS, no Oracle Client binaries needed)
oracledb.initOracleClient({}); 

// Force results to be returned as JS objects instead of arrays
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.autoCommit = true;

let pool;

/**
 * Initializes the Oracle Database connection pool.
 */
export async function initializePool() {
  if (!pool) {
    try {
      pool = await oracledb.createPool({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        connectString: process.env.DB_CONNECTION_STRING, // host:port/service_name
        poolMin: 2,
        poolMax: 10,
        poolIncrement: 1,
      });
      console.log("Oracle Connection Pool initialized successfully.");
    } catch (err) {
      console.error("Failed to initialize Oracle Connection Pool:", err);
      throw err;
    }
  }
  return pool;
}

/**
 * Executes a single SQL query against the connection pool.
 * 
 * @param {string} sql - The SQL query string (using bind variables like :1 or :name).
 * @param {Object|Array} binds - The bind variables.
 * @param {Object} options - Oracle execution options.
 */
export async function execute(sql, binds = [], options = {}) {
  let connection;
  try {
    await initializePool();
    connection = await pool.getConnection();
    const result = await connection.execute(sql, binds, options);
    return result;
  } catch (err) {
    console.error(`Database Query Error: ${err.message}\nSQL: ${sql}`);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing database connection:", err);
      }
    }
  }
}

/**
 * Runs multiple queries in a single database transaction.
 * 
 * @param {function(connection): Promise} transactionCallback - Async callback that uses the connection.
 */
export async function executeTransaction(transactionCallback) {
  let connection;
  try {
    await initializePool();
    connection = await pool.getConnection();
    
    // Temporarily turn off autoCommit for transactions
    const result = await transactionCallback(connection);
    
    await connection.commit();
    return result;
  } catch (err) {
    if (connection) {
      try {
        await connection.rollback();
      } catch (rollErr) {
        console.error("Transaction Rollback Error:", rollErr);
      }
    }
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing transaction connection:", err);
      }
    }
  }
}

export default {
  execute,
  executeTransaction,
  initializePool
};
