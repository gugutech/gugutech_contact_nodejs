# gugutech_contact_nodejs
frontend framework of gugutech contact project with nodejs, expresses and etc.

###initial framework build
* build express framework
```Bash
express gugutech_campus_nodejs
cd gugutech_campus_nodejs
npm intall
```
* install basic module
```
npm install hiredis redis express-session connect-redis --save
```
* install crypto module and gugutech api add
```
npm install crypto --save

API: /gugutech   
    GET: test json response
    POST: test get parameters from request
```

###Seajs Implement 
```
/seajstest is used to test seajs module works properly

Reference brief CMD standard: https://github.com/seajs/seajs/issues/242ter
```

###Gulp (stream build system) Implement
```Bash
npm install -g gulp

cd <YOUR_PROJECT>
npm install gulp --save-dev
npm install gulp-jshint --save-dev
npm install gulp-concat --save-dev
npm install gulp-uglify --save-dev
```

### Nodejs Project with Supervisor (Hot Deployment)
* install supervisor
```
npm install -g supervisor
```
* change 'package.json' file:
```
add 

"test": "supervisor ./bin/www"

in 

"scripts": {
    "start": "node ./bin/www"
} 
```
* start node
```
npm test
```

then you can deploy your code without restarting node :)


### Middleware demo (authCheck)
    url /demo/middleware
* routes/demo.js
```
    add middleware.
```
* service/util/auch.js
```
    middleware. 
    Check token exist and equal to 'gugutech', then go next()
    Or just return error message directly.
```




 


