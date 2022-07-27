const client = require('../clients/pg');

module.exports = class CoreDattamapper {
    static async findAll() {
        const results = await client.query(`
            SELECT * FROM "${this.tableName}"
        `);
        return results.rows;
    }

    static async findByPk(id) {
        const sql = {
            text: `SELECT * FROM ${this.tableName}
                WHERE id=$1`,
            values: [id],
        };
        const results = await client.query(sql);
        return results.rows[0];
    }

    static async findSome(columnName, value) {
        const sql = {
            text: `SELECT * FROM ${this.tableName}
                WHERE ${columnName}=$1`,
            values: [value],
        };
        const results = await client.query(sql);
        return results.rows;
    }

    static async delete(id) {
        const sql = {
            text: `DELETE FROM ${this.tableName}
                WHERE id=$1`,
            values: [id],
        };
        await client.query(sql);
    }
};
