const mssql = require('mssql');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    requestTimeout: 130000,
    options: {
        encrypt: false,
        enableArithAbort: false
    }
};


/**
 * @type {mssql.ConnectionPool}
 */
let pool = null;

const closePool = async () => {
    try {
        await pool.close();
        pool = null;
    } catch (err) {
        pool = null;
        console.log(err);
    }
};

/**
 * 
 * @returns {Promise<mssql.ConnectionPool>}
 */
const getConnection = async () => {
    try {
        if (pool) {
            return pool;
        }

        pool = await mssql.connect(config);
        pool.on('error', async (err) => {
            console.log(err);
            await closePool();
        });

        return pool;
    } catch (err) {
        console.log(err);
        pool = null;
    }
};

/**
 * 
 * @returns {Promise<mssql.Request>}
 */
const request = async () => {
    const connection = await getConnection();

    if (!connection) {
        throw new Error('No se pudo obtener la conexión');
    }
    
    return new mssql.Request()
};

module.exports = {
  closePool,
  getConnection,
  request
};
