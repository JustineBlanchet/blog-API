const Post = require('../models/Post');
const PostError = require('../errors/postError');

module.exports = {
    async getPosts(req, res) {
        const posts = await Post.findAll();
        res.json(posts);
    },

    async addPost(req, res) {
        const post = new Post({ ...req.body });
        await post.insert();
        res.json();
    },

    async getOnePost(req, res) {
        const id = Number(req.params.id);
        const post = await Post.findByPk(id);
        if (!post) {
            throw new PostError(`Post id ${id} doesn't exist`);
        }
        res.json(post);
    },

    async getPostsByCategory(req, res) {
        const id = Number(req.params.id);
        const posts = await Post.findSome('category_id', id);
        if (!posts) {
            throw new PostError('No posts available in this category');
        }
        res.json(posts);
    },

    async updateOnePost(req, res) {
        const id = Number(req.params.id);
        const post = await Post.findByPk(id);
        if (!post) {
            throw new PostError(`Post id ${id} doesn't exist`);
        }
        const updatedPost = new Post({ ...post, ...req.body });
        await updatedPost.update(id);
        res.json(updatedPost);
    },

    async deleteOnePost(req, res) {
        const id = Number(req.params.id);
        const post = await Post.findByPk(id);
        if (!post) {
            throw new PostError(`Post id ${id} doesn't exist`);
        }
        await Post.delete(id);
        res.json({ message: 'Post deleted' });
    },
};
