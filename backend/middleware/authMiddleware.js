const jwt = require('jsonwebtoken');

const protectRoute = (allowedRoles) => {
    return async (req, res, next) => {
        try {
            // Get token from header
            const token = req.headers.authorization?.split(' ')[1];
            
            if (!token) {
                return res.status(401).json({ message: 'No token provided' });
            }

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Check if user's role is allowed
            if (!allowedRoles.includes(decoded.role)) {
                return res.status(403).json({ 
                    message: 'Access denied: insufficient permissions' 
                });
            }

            // Add user info to request
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ message: 'Invalid token' });
        }
    };
};

module.exports = { protectRoute }; 