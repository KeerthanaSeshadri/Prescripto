import jwt from 'jsonwebtoken';

const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;

    if (!atoken) {
      return res.json({ success: false, message: 'Not Authenticated. Please log in again' });
    }

    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);

    // Assuming you store the email in the token, compare with environment variable
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, message: "Not Authenticated. Please log in again" });
    }

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authAdmin;
