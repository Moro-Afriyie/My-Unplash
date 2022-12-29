"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAPI = void 0;
var photos_1 = require("./photos");
var endpoints = [photos_1.default];
function createAPI(app) {
    endpoints.forEach(function (_a) {
        var path = _a.path, router = _a.router;
        app.use(path, router);
    });
}
exports.createAPI = createAPI;
//# sourceMappingURL=index.js.map