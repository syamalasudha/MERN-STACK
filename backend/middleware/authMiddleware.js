const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "teaching-secret";

const authenticate = (req, res, next) => {

    const token = req.cookies.mytoken;

    if (!token) {
        return res.status(401).json({
            message: "Please login"
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

module.exports = authenticate;