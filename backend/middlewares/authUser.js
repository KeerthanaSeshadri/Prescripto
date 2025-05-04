import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not Authenticated. Please log in again.' });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);


    if (!req.body) req.body = {};

    req.body.userId = token_decode.id;

    next();

  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: error.message });
  }
};

export default authUser;