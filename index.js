global.__rootdir = __dirname;
require = require("esm")(module)
module.exports = require("./server.js")