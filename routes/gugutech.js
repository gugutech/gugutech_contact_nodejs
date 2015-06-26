var express = require('express');
var router  = express.Router();

/* gugutech info */
router.get('/', function(req, res, next) {

    var gugudata = require('../public/data/gugutech.json');

    console.log(gugudata);

    res.send(gugudata);
});

router.post('/', function(req, res) {
    var name = req.body.name;
    console.log(req);
	if (!name) {
        // req.flash('error','no name');
        return res.redirect('/gugutech');
    }

    return res.send('Hello ' + name);
});

module.exports = router;
