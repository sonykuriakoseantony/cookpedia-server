const jwt = require('jsonwebtoken');
const jwtMiddleware = (req, res, next) => {
    console.log("Inside jwtMiddleware");

    //get token from request headers
    const token = req.headers.authorization.split(" ")[1]
    console.log(token);
    if (token) {
        //verify the token
        try {
            console.log("Verifying token");
            const jwtResponse = jwt.verify(token, process.env.JWT_KEY);
            console.log(jwtResponse);
            req.role = jwtResponse.role;
            req.payload = jwtResponse.userMail;
            next();
        } catch (err) {
            res.status(401).json("Authorization failed! : Invalid token", err)
        }

    }
    else {
        res.status(401).json("Unauthorized : No token available")
    }


}

module.exports = jwtMiddleware;