
import JWT from 'jsonwebtoken';

export default function auth(req, res, next) {
    const token = req.cookies.token;

    try {   
        const payload = JWT.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        return next();
    } catch(err) {
        return next();
    }
}

