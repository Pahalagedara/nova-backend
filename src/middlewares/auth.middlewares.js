const {decodeJWT} = require("../functions/jwt.functions");
exports.checkPermission = (role) => {
    return (req, res, next) => {
      const token = req.headers && req.headers.authorization && req.headers.authorization.split(' ')[1];
      //Authorization: 'Bearer TOKEN'
      if (!token) {
        res
          .status(401)
          .json(
              {
                  success: false,
                  message: "Error!Token was not provided."
              }
          );
      }

      //decode the token and match with access role with token type
      const decode = decodeJWT(token);
      var finded = Array.isArray(role) && role.find(e=>e==decode.type);
  
      if (finded) {
        return next();
      } else {
        return res.status(401).json({ error: 'Access denied' });
      }
    };
  };