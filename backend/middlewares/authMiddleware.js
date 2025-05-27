const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (token && token.startsWith("Bearer")) {
            token = token.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } else {
            res.status(401).json({ message: "Not autorized ,token failed" });
        }

    } catch (error) {
        res.status(401).json({ message: "Token failed", error: error.message });
    }
};

exports.adminOnly = async (req, res, next) => {
    try {
        if (req.user && req.user.role === "admin") {
            next()
        } else {
            res.status(403).json({ message: "Access define, Admin only" })
        }
    } catch (error) {

    }
}