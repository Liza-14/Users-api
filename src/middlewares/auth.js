const jwt = require("jsonwebtoken");
const JsonWebTokenError = require("jsonwebtoken/lib/JsonWebTokenError");

const secret = "8Zz5tw0Ionm3XPZZfN0NOml3z9FMfmpgXwovR9fp6ryDIoGRM8EPHAB6iHsc0fb";

function verifyRole(req, res, next, roles) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send("Access is denied due to invalid credentials");
  }

  try {
    const payload = jwt.verify(token, secret);

    if (payload.exp > Date.now() / 1000) {
      if (roles.includes(payload.role)) {
        if (payload.role !== "USER" || !req.params.id || req.params.id === payload.id) {
          next();
          return;
        }
      }
      return res.status(403).send("Does not have enough permissions");
    }
  } catch (e) {
    if (!(e instanceof JsonWebTokenError)) {
      next(e);
      return;
    }
  }

  return res.status(401).send("Access is denied due to invalid credentials");
}

module.exports = {
  allowAnyUser(req, res, next) {
    verifyRole(req, res, next, ["USER", "POLICE"]);
  },
  allowOnlyPolice(req, res, next) {
    verifyRole(req, res, next, ["POLICE"]);
  },
};
