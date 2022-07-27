module.exports = class CategoryError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CategoryError';
    }
};
