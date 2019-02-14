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
     * @return The doodles within a json array
     */
    static getAllDoodles() {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT * 
                 FROM doodle
                 ORDER BY "postDate" DESC`,
                 [],
                 (error, result) => {
                     if (error) return reject(error);
                     console.log(result.rows)
                     resolve(result.rows);
                 }
            )
        })
    }

    static getDoodleById(id) {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT *
                 FROM doodle
                 WHERE id = $1`,
                 [id],
                 (error, result) => {
                     if(error) return reject(error);
                     resolve(result.rows[0]);
                 }
            )
        })
    }

    /** 
     * @summary: Deletes the row in the doodle table whose id matches
     * the id sent in the arguments. Returns the details of the deleted row 
     */
    static deleteDoodleById(id) {
        return new Promise((resolve, reject) => {
            pool.query(
                `DELETE FROM doodle
                 WHERE id = $1
                 RETURNING *`,
                 [id],
                 (error, result) => {
                     console.log('db result: ', result.rows[0])
                     if(error) return reject(error);
                     resolve(result.rows[0]);
                 }
            )
        })
    }

    /**
     * @summary This will retrieve the most recent doodle from
     * the doodle table.
     */
    static getMostRecent() {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT * FROM doodle a
                 WHERE NOT EXISTS (
                     SELECT * FROM doodle b
                     WHERE a.id <> b.id AND a."postDate" < b."postDate"
                 )`,
                 [],
                 (error, result) => {
                     if (error) return reject(error);
                     resolve(result.rows[0]);
                 }
            )
        })
    }
}


module.exports = DoodleTable;




    /**
     * @argument limit: The number of records to pull from the doodle table
     * @argument offset: The starting point w/in the DB to begin pulling records
     * @return The doodles within a json array
     */
    // static getDoodles({ limit, offset }) {
    //     return new Promise((resolve, reject) => {
    //         pool.query(
    //             `SELECT * 
    //              FROM doodle
    //              ORDER BY "postDate" DESC
    //              LIMIT $1 OFFSET $2`,
    //              [limit, offset],
    //              (error, result) => {
    //                  if (error) return reject(error);
    //                  console.log(result.rows);
    //                  resolve(result.rows);
    //              }
    //         )
    //     })
    // }
