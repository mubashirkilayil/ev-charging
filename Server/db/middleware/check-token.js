const jwt = require('jsonwebtoken');

const checkToken = (roles = []) => {
  return (req, res, next) => {
    try {
      const bearerToken = req.headers.authorization;
      if (!bearerToken) {
        return res.status(403).json({ message: 'Your not authorised' });
      }

      const token = bearerToken.split(' ')[1];
      const secret = 'guyds7wserfjke7qw38545ey';

      const decoded = jwt.verify(token, secret);
      console.log('Decoded Token:', decoded);

      if (roles.length && !roles.includes(decoded.role.toLowerCase())) {
        return res.status(403).json({ message: 'Your not authorised' });
      }

      req.user = decoded; // ✅ attach user to request
      next();
    } catch (e) {
      console.error('JWT Error:', e.message);
      return res.status(403).json({ message: 'Your not authorised' });
    }
  };
};

module.exports = checkToken;
