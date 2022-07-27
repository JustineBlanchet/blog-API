const client = require('../clients/pg');
const CoreDatamapper = require('./coreDatamapper');

/**
 * "Post" Model Object
 * @typedef {object} PostModel
 * @property {string} title - Title of the post
 * @property {string} slug - Unique identifier of the post
 * @property {string} excerpt - Excerpt of the post
 * @property {string} content - Content of the post
 * @property {number} category_id - Category id in DB
 */

module.exports = class Post extends CoreDatamapper {
    static tableName = 'post';

    constructor(post) {
        super();
        this.title = post.title;
        this.slug = post.slug;
        this.excerpt = post.excerpt;
        this.content = post.content;
        this.category_id = post.category_id;
    }

    async insert() {
        const sql = {
            text: `INSERT INTO post ("title", "slug", "excerpt", "content", "category_id")
            VALUES ($1, $2, $3, $4, $5)`,
            values: [this.title, this.slug, this.excerpt, this.content, this.category_id],
        };
        const result = await client.query(sql);
        return result;
    }

    async update(id) {
        const sql = {
            text: `UPDATE post SET title=$1, slug=$2, excerpt=$3, content=$4, category_id=$5
            WHERE id=$6`,
            values: [this.title, this.slug, this.excerpt, this.content, this.category_id, id],
        };
        const result = await client.query(sql);
        return result.rows[0];
    }
};
