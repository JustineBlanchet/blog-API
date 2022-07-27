const client = require('../clients/pg');
const CoreDatamapper = require('./coreDatamapper');

/**
 * "Category" Model Object
 * @typedef {object} CategoryModel
 * @property {string} route - Path of the category
 * @property {string} label - Name of the category
 */

module.exports = class Category extends CoreDatamapper {
    static tableName = 'category';

    constructor(category) {
        super();
        this.route = category.route;
        this.label = category.label;
    }

    async insert() {
        const sql = {
            text: `INSERT INTO category ("route", "label")
            VALUES ($1, $2)`,
            values: [this.route, this.label],
        };
        const result = await client.query(sql);
        return result.rows[0];
    }

    async update(id) {
        const sql = {
            text: `UPDATE category SET route=$1, label=$2
            WHERE id=$3`,
            values: [this.route, this.label, id],
        };
        const result = await client.query(sql);
        return result.rows[0];
    }
};
