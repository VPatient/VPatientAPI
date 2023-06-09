const jwt = require('jsonwebtoken');

// auth middleware
const auth = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');
    try {
        const verified = jwt.verify(token, process.env.SECRET);
        req.user = verified;
        next();
    }
    catch (err) {
        res.status(400).send('Invalid token')
    }
}

// verify token and authorization middleware
const verifyTokenAndAuthorization = (req, res, next) => {
    auth(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        }
        else {
            res.status(403).json("You are not authorized to do that!");
        }
    });
}

// verify token and admin middleware
const verifyTokenAndAdmin = (req, res, next) => {
    auth(req, res, () => {
        if (req.user.isAdmin) {
            next();
        }
        else {
            res.status(403).json("You are not authorized to do that!");
        }
    });
}

module.exports = { auth, verifyTokenAndAuthorization, verifyTokenAndAdmin };