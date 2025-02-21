import jwt from 'jsonwebtoken';
import User from '../models/user.model';

export const protectRoute = async (req, res, next) => {
      try {
            const token = req.cookie.jwt;

            if(!token){
                  return res.status(401).json({ msg: 'Token not found' });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if(!decoded){
                  return res.status(401).json({ msg: 'Token is invalid' });
            }

            const user = await User.findById(decoded.id).select('-password');

            if(!user){
                  return res.status(401).json({ msg: 'User does not exist' });
            }

            req.user = user;
            next();
      } catch (error) {
            console.log("Error in protectRoute middleware: ", error);
            return res.status(500).json({ msg: 'Internal Server Error' });
      }
}