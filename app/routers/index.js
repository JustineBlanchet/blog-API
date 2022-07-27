const express = require('express');

const router = express.Router();

const controllerHandler = require('../helpers/controllerHandler');
const postController = require('../controllers/postController');
const categoriesController = require('../controllers/categoryController');
const mainController = require('../controllers/mainController');
const validation = require('../validation/validator');
const categorySchema = require('../validation/schemas/category');
const postSchema = require('../validation/schemas/post');

router.get('/', mainController.getHomePage);

router.route('/posts')
    /**
     * GET /posts
     * @summary Get all posts in blog
     * @tags Posts
     * @return {PostModel} 200 - success response - application/json
     */
    .get(controllerHandler(postController.getPosts))
    /**
     * POST /posts
     * @summary Insert post in DB
     * @tags Posts
     * @param {PostModel} request.body.required - post data to add to DB
     * @return {PostModel} 200 - success response - application/json
     * @return {string} 400 - user error response - application/json
     */
    .post(validation(postSchema), controllerHandler(postController.addPost));

router.route('/posts/:id(\\d+)')
    /**
     * GET /posts/:id
     * @summary Display one post with his DB id
     * @tags Posts
     * @return {PostModel} 200 - success response - application/json
     * @return {string} 400 - Wrong id - application/json
     */
    .get(controllerHandler(postController.getOnePost))
    /**
     * PATCH /posts/:id
     * @summary Update one post with id
     * @tags Posts
     * @return {PostModel} 200 - success response - application/json
     * @return {string} 400 - Wrong id - application/json
     */
    .patch(validation(postSchema), controllerHandler(postController.updateOnePost))
    /**
     * DELETE /posts/:id
     * @summary Display one post with his DB id
     * @tags Posts
     * @return {string} 200 - success response - application/json
     * @return {string} 400 - Wrong id - application/json
     */
    .delete(controllerHandler(postController.deleteOnePost));

/**
 * GET /posts/category/:id
 * @summary Display all posts by category id
 * @tags Posts
 * @return {PostModel} 200 - success response - application/json
 * @return {string} 400 - Wrong id - application/json
 */
router.get('/posts/category/:id(\\d+)', controllerHandler(postController.getPostsByCategory));

router.route('/categories')
    /**
     * GET /categories
     * @summary Display all categories
     * @tags Categories
     * @return {CategoryModel} 200 - success response - application/json
     */
    .get(controllerHandler(categoriesController.getCategories))
    /**
     * POST /categories
     * @summary Add one category in DB
     * @tags Categories
     * @param {CategoryModel} request.body.required - category data to add to DB
     * @return {CategoryModel} 200 - success response - application/json
     * @return {string} 400 - user error response - application/json
     */
    .post(validation(categorySchema), controllerHandler(categoriesController.addCategory));

router.route('/categories/:id(\\d+)')
    /**
     * GET /categories/:id
     * @summary Display one category with his DB id
     * @tags Categories
     * @return {CategoryModel} 200 - success response - application/json
     * @return {string} 400 - Wrong id - application/json
     */
    .get(controllerHandler(categoriesController.getOneCategory))
    /**
     * PATCH /categories/:id
     * @summary Update one category with his DB id
     * @tags Categories
     * @return {CategoryModel} 200 - success response - application/json
     * @return {string} 400 - Wrong id - application/json
     */
    .patch(validation(categorySchema), controllerHandler(categoriesController.updateOneCategory))
    /**
     * DELETE /categories/:id
     * @summary Delete one category with his DB id
     * @tags Categories
     * @return {string} 200 - success response - application/json
     * @return {string} 400 - Wrong id - application/json
     */
    .delete(controllerHandler(categoriesController.deleteOneCategory));

module.exports = router;
