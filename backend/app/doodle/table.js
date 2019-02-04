const pool = require('../../databasePool');

class DoodleTable {
    /**
     * @argument doodle: The doodle object to be stored into the database
     * @return It returns the result of the query. Which is nothing here
     */
    static storeDoodle(doodle) {
        return new Promise((resolve, reject) => {
            const { postDate, title, filePath } = doodle;
            pool.query(
                `INSERT INTO doodle("postDate", title, "filePath")
                VALUES($1, $2, $3)`,
                [postDate, title, filePath],
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            )
        })
    }

    /**
     * @argument limit: The number of records to pull from the doodle table
     * @argument offset: The starting point w/in the DB to begin pulling records
     * @return The doodles within a json array
     */
    static getDoodles({ limit, offset }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT * FROM doodle
                 LIMIT $1 OFFSET $2`,
                 [limit, offset],
                 (error, result) => {
                     if (error) return reject(error);
                     resolve(result.rows);
                 }
            )
        })
    }
}


module.exports = DoodleTable;