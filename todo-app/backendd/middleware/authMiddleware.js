const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.json({ message: "Unauthorized access. logIn again" });
  }
  try {
    const tokendecode =  jwt.verify(token, process.env.JWT_SECRET);
    if (tokendecode.id) {
      req.userId = tokendecode.id;
    } else {
      return res.json({ message: "Unauthorized acess. log In again" });
    }
    next()
  } catch (error) {
    res.json({ error: error.message });
  }
};
module.exports = userAuth;