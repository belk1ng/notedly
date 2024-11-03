import jwt from 'jsonwebtoken';

export const getUser = async (jwtToken) => {
    if (!jwtToken) {
        throw new Error('No JWT token provided');
    }

    try {
        return await jwt.verify(jwtToken, process.env.JWT_SECRET);
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new Error('Session expired');
        } else {
            throw new Error('Invalid JWT token');
        }
    }
};