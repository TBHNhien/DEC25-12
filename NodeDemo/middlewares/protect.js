var jwt = require('jsonwebtoken');
const configs = require('../helper/configs');

module.exports = {
    checkLogin:
        async function (req) {
            var result = {}
            var token = req.headers.authorization;
            if (!token) {
                return result.err = "Vui long dang nhap";
            }
            if (token.startsWith("Bearer")) {
                token = token.split(" ")[1];
                try {
                    var userID = await jwt.verify(token, configs.SECRET_KEY);
                    return userID.id;
                } catch (error) {
                    return result.err = "Vui long dang nhap";
                }
            } else {
                return result.err = "Vui long dang nhap";
            }
        },
        checkPermissions:
        async function (req, res, next) {
            var user = await modelUser.getOne(req.userID);
            var role = user.role;
            console.log(role);
            var DSRole = ['admin', 'publisher'];
            if (DSRole.includes(role)) {
              next();
            } else {
                console.log("ban khong du quyen");
              responseData.responseReturn(res, 403, true, "ban khong du quyen");
            }
          }
    
}