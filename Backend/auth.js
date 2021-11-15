const jwt = require("jsonwebtoken")
const SECRET_KEY = "Lelang"


auth = (role1, role2, role3) => {
    let role = [role1, role2, role3]
    return (req, res, next) => {
        let header = req.headers.authorization
        let token = header && header.split(" ")[1]

        let jwtHeader = {
            algorithm: "HS256",
            expiresIn: "1m"
        }
        if (token == null) {
            res.status(401).json({ message: "Unauthorization" })
        } else {
            jwt.verify(token, SECRET_KEY, jwtHeader, (error, user) => {
                console.log(user);
                if (error) {
                    res
                        .status(401)
                        .json({
                            message: "Invalid token"
                        })
                } else {
                    if (role.includes(user.level)) {
                        console.log(role);
                        req.user = user
                        // if(user.username == )
                        next()
                    }else{
                        res.send({message: "Anda tidak memiliki akses"})
                    }

                }
            })
        }
    }

}

module.exports = auth