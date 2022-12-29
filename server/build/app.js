"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var error_1 = require("./error");
var error_2 = require("./middlewares/error");
var express = require("express");
var helmet_1 = require("helmet");
var cors = require("cors");
var api_1 = require("./api");
var _types_1 = require("./@types");
// create express app
var app = express();
// setup security headers
app.use((0, helmet_1.default)());
// setup cross-origin resource header sharing
app.use(cors({
    origin: '*',
}));
// parse JSON and url-encoded bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// initialize api routes
(0, api_1.createAPI)(app);
// handle all routes which aren't part of the application
app.use('*', function (req, _res) {
    throw new error_1.APIError('NOT FOUND', _types_1.HttpStatusCode.NOT_FOUND, true, "Requested URL ".concat(req.originalUrl, " not found"));
});
// error middleware
app.use(error_2.default);
exports.default = app;
//# sourceMappingURL=app.js.map