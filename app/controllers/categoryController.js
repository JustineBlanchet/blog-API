const Category = require('../models/Category');
const CategoryError = require('../errors/categoryError');

module.exports = {
    async getCategories(req, res) {
        const categories = await Category.findAll();
        res.json(categories);
    },

    async addCategory(req, res) {
        const category = new Category({ ...req.body });
        await category.insert();
        res.json(category);
    },

    async getOneCategory(req, res) {
        const id = Number(req.params.id);
        const category = await Category.findByPk(id);
        if (!category) {
            throw new CategoryError(`Category id ${id} doesn't exist`);
        }
        res.json(category);
    },

    async updateOneCategory(req, res) {
        const id = Number(req.params.id);
        const category = await Category.findByPk(id);
        if (!category) {
            throw new CategoryError(`Category id ${id} doesn't exist`);
        }
        const updatedCategory = new Category({ ...category, ...req.body });
        await updatedCategory.update(id);
        res.json(updatedCategory);
    },

    async deleteOneCategory(req, res) {
        const id = Number(req.params.id);
        const category = await Category.findByPk(id);
        if (!category) {
            throw new CategoryError(`Category id ${id} doesn't exist`);
        }
        await Category.delete(id);
        res.json({ message: 'Category deleted' });
    },
};
