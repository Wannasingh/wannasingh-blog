export const validateCreatePostData = (req, res, next) => {
    if (!req.body.title || !req.body.image || !req.body.category_id || !req.body.description || !req.body.content || !req.body.status_id) {
        return res.status(401).json({
            message: "Invalid request data. Please provide all required fields.",
        });
    }

    next();
};