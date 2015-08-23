define(function(require, exports, module) {
    var authCheck = function(req, res, next) {

        var reqToken = req.query.token;
        console.log(reqToken);

        if (!reqToken && reqToken != 'gugutech') {
            var errorRes = {
                code: "300",
                comment: "Token not match"
            }
            res.send(errorRes);
        } else {
        	req.session.authStatus = 'success';
            next();
        }
    }

    exports.authCheck = authCheck;

})
