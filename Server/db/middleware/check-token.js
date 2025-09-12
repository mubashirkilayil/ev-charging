const jwt = require('jsonwebtoken');

const checkToken = role => {
  return (req, res, next) => {
    try {
      const bearerToken = req.headers.authorization;
      // console.log(bearerToken);
      // console.log('---------------------------------');

      if (!bearerToken) {
        return res.status(403).json({ message: 'Your not authorised' });
      }
      const token = bearerToken.split(' ')[1];
      // console.log(token);

      const secret = 'fwedfhsdjfshuyfgwebweuruen64neuj';
      const decoded = jwt.verify(token, secret);
      console.log(decoded);
      if (!role.includes(decoded.role)) {
        return res.status(403).json({ message: 'Your not authorised' });
      }
      next();
    } catch (e) {
      return res.status(403).json({ message: 'Your not authorised' });
    }
  };
};

module.exports = checkToken;
