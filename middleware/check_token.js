const jwt = require('jsonwebtoken');
require('dotenv').config();
const cookieParser = require('cookie-parser');


const setAuthorizationHeader = (req, res, next) => {
    // Handle CORS preflight request
    if (req.method === 'OPTIONS') {
        setCorsHeaders(res);
        return res.status(200).json('OK');
    }

    // Get the JWT token from cookies
    const token = req.cookies.jwt_token;
    console.log('Token:', token);
    
    if (token) {
        // Set the Authorization header
        req.headers.authorization = `Bearer ${token}`;

        try {
            // Verify the token and attach the decoded user data to the request
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
        } catch (err) {
            console.log(err);
            return unauthorizedResponse(req, res);
        }
    } else {
        return unauthorizedResponse(req, res);
    }

    // Add CORS headers to the response
    setCorsHeaders(res);

    // Proceed with the request
    return next();
};

// Handle unauthorized responses
const unauthorizedResponse = (req, res) => {
    // Redirect to login or return an unauthorized response
    const loginUrl = '/login'; 
    setCorsHeaders(res);
    return res.redirect(loginUrl);
};

// Set CORS headers
const setCorsHeaders = (res) => {
    if (res && res.set) {
        res.set({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Credentials': 'true',
        });
    } else {
        console.error('Response object is not defined or invalid');
    }
};

module.exports = setAuthorizationHeader;
