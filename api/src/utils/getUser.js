import jwt from 'jsonwebtoken';

export const getUser = async (jwtToken) => {
    if (jwtToken) {
        try {
            return await jwt.verify(jwtToken, process.env.JWT_SECRET);
        } catch (error) {
            throw new Error('Session expired')
        }
    }
}