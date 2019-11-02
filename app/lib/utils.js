const jwt = require("jsonwebtoken");

function generateToken(uid, scope) {
  const key = global.config.secret.key;
  const expiresIn = global.config.secret.expiresIn;
  const token = jwt.sign(
    {
      uid,
      scope
    },
    key,
    {
      expiresIn
    }
  );
  return token;
}

module.exports = {
  generateToken
};
