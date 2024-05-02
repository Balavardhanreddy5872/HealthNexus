import JWT from 'jsonwebtoken'
import User from '../models/UserModels.js'

// Verifying the token 
export const requireSignIn = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const token2 = req.headers.authorization
    try {
        const decode = JWT.verify(
            token2,
            process.env.JWT_SECRET
        );
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
    }
}

//admin acceess
export const isAdmin = async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id);
      if (user.role !== 1) {
        return res.status(401).send({
          success: false,
          message: "UnAuthorized Access",
        });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({
        success: false,
        error,
        message: "Error in admin middelware",
      });
    }
  };
