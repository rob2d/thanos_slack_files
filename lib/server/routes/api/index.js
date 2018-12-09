
const fs     = require('fs'),
      path   = require('path'),
      router = require('express').Router();

// scan through all routes in root folder 
// and add those to router branches

const baseRoutesPath = global.resolvePath(__dirname);

const routesFolders = fs.readdirSync(baseRoutesPath).filter( filename =>(
    fs.lstatSync(path.resolve(baseRoutesPath, filename)).isDirectory()
));

routesFolders.forEach((subRoute) => {
    const subRoutePath = path.resolve(baseRoutesPath, subRoute);
    router.use(`/${subRoute}`, require(subRoutePath)); // require as route
});

module.exports = router;