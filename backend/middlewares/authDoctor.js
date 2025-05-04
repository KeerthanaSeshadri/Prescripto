import jwt from 'jsonwebtoken';

const authDoctor = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;

    if (!dtoken) {
      return res.status(401).json({ success: false, message: 'Not Authenticated. Please log in again.' });
    }

    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);


    if (!req.body) req.body = {};

    req.body.docId = token_decode.id;

    next();

  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: error.message });
  }
};

export default authDoctor;