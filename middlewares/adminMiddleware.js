const jwt = require('jsonwebtoken');
const adminMiddleware = (req, res, next) => {
    console.log("Inside adminMiddleware");

    //get token from request headers
    const token = req.headers.authorization.split(" ")[1]
    if (token) {
        //verify the token
        try {
            console.log("Verifying token");
            const jwtResponse = jwt.verify(token, process.env.JWT_KEY);
            req.role = jwtResponse.role;
            req.payload = jwtResponse.email;
            if(jwtResponse.role == 'admin'){
                next();
            }else{
                res.status(404).json("Authorization failed. Operation Denied!", err)
            }
            
        } catch (err) {
            res.status(404).json("Authorization failed! : Invalid token", err)
        }

    }
    else {
        res.status(404).json("Unauthorized : No token available")
    }


}

module.exports = adminMiddleware;