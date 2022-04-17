const axios = require("axios");
const config = require("../config/index");

function verifyToken(req, res, next) {
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    return res.status(401).send("Access is denied by auth service");
  }

  axios.get(`${config.auth.url}/check`, { headers: { Authorization: `Bearer ${accessToken}` } })
    .then((result) => {
      if (result.data.message === "false") {
        return res.status(401).send("Access is denied by auth service");
      }
      next();
    })
    .catch((error) => next(error));
}

module.exports = { verifyToken };
