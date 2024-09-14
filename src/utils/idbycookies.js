var jwt = require("jsonwebtoken");

const idbycookies = (req) => {
  try {
    const token = req.cookies.get("token").value || "";

    const decodetoken = jwt.verify(token, process.env.JWT_SECRET);
    if (decodetoken) {
      return decodetoken.userId;
    }
  } catch (error) {
    console.error("Error decoding token: ", error);
    return null;
  }
};

export default idbycookies;
