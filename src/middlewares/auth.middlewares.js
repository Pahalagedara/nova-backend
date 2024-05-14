exports.checkPermission = (role) => {
    return (req, res, next) => {

      var finded = role.find(e=>e==req.body.role)
  
      if (finded) {
        return next();
      } else {
        return res.status(403).json({ error: 'Access denied' });
      }
    };
  };

  exports.logger = () => {
    return (req, res, next) => {
        console.log("Logger")
        return next();
    };
  };