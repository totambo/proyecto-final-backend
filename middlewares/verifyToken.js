const verifyToken = (req, res, next) => {
  console.log("accediendo al middleware verifyToken");
  const authorization_header = req.headers("authorization");
  if (authorization_header !== undefined) {
    console.log(authorization_header);
  } else {
  }
  next();
};

exports.verifyToken = verifyToken;
