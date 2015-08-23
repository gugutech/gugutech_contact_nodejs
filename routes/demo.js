var express = require('express');
var router  = express.Router();
var auth = require('../service/util/auth');

router.get('/cookie', function(req, res, next) {
    if (req.cookies.isVisit) {
        // console.log(req.cookies);
        res.send("再次欢迎访问");
    } else {
        res.cookie('isVisit', 1, {
            maxAge: 60 * 1000
        });
        res.send("欢迎第一次访问");
    }
});

router.get('/redisses', function(req, res, next) {
    // console.log(req);
    if (req.session.isVisit) {
        req.session.isVisit++;
        res.send('<p>第 ' + req.session.isVisit + '次来到此页面</p>');
    } else {
        req.session.isVisit = 1;
        res.send('欢迎第一次来这里');
    }
});

router.get('/middleware', auth.authCheck, function(req, res, next){
    if(req.session.authStatus === 'success'){
        res.send('验证成功');
    }
})

module.exports = router;