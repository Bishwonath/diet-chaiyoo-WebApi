const jwt = require('jsonwebtoken');
const SECRET_KEY = '4fb876242331584a793776ad67394d0ee00290f140fd9ab047456d54fdff0bd1';

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified;
        next();
    } catch (error) {
        return res.status(400).json({ error: 'Invalid token' });
    }
};

module.exports = authMiddleware;
