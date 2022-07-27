const validation = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync(req.body);
        next();
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.details[0].message });
    }
};

module.exports = validation;
