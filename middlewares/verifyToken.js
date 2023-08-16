const verifyToken = (req, res, next) => {
  console.log("accediendo al middleware verifyToken");
  const authorization_header = req.headers["authorization"];
  if (authorization_header !== null) {
    console.log(authorization_header);
    const token = authorization_header.split(" ")[1];
    req.token = token;

    next();
  } else {
  }
};

exports.verifyToken = verifyToken;
