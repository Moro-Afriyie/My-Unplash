"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Joi = require("joi");
var typeorm_1 = require("typeorm");
var _types_1 = require("../@types");
var data_source_1 = require("../data-source");
var Photo_1 = require("../entity/Photo");
var error_1 = require("../error");
var async_1 = require("../middlewares/async");
var router = (0, express_1.Router)();
var photoRepository = data_source_1.AppDataSource.getRepository(Photo_1.Photo);
var photoSchema = Joi.object({
    label: Joi.string().required(),
    imageUrl: Joi.string().required(),
});
// get all photos
router.get('/', (0, async_1.asyncMiddleware)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var photos;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, photoRepository.find({
                    order: {
                        createdAt: 'DESC',
                    },
                })];
            case 1:
                photos = _a.sent();
                res.status(200).json({ success: true, data: photos });
                return [2 /*return*/];
        }
    });
}); }));
// get photo by  photo id
router.get('/:id', (0, async_1.asyncMiddleware)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var photo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, photoRepository.findOneBy({ id: req.params.id })];
            case 1:
                photo = _a.sent();
                if (!photo) {
                    throw new error_1.APIError('NOT FOUND', _types_1.HttpStatusCode.NOT_FOUND, true, 'Photo not found');
                }
                res.status(200).json({ success: true, data: photo });
                return [2 /*return*/];
        }
    });
}); }));
// create new photo
router.post('/', (0, async_1.asyncMiddleware)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var error, allPhotos;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                error = photoSchema.validate(req.body).error;
                if (error) {
                    throw new error_1.APIError('BAD REQUEST', _types_1.HttpStatusCode.BAD_REQUEST, true, error.details[0].message);
                }
                return [4 /*yield*/, photoRepository.save(req.body)];
            case 1:
                _a.sent();
                return [4 /*yield*/, photoRepository.find({
                        order: {
                            createdAt: 'DESC',
                        },
                    })];
            case 2:
                allPhotos = _a.sent();
                res.status(201).json({ success: true, data: allPhotos });
                return [2 /*return*/];
        }
    });
}); }));
// delete photo
router.delete('/:id', (0, async_1.asyncMiddleware)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var photoToRemove, allPhotos;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, photoRepository.findOneBy({ id: req.params.id })];
            case 1:
                photoToRemove = _a.sent();
                if (!photoToRemove) {
                    throw new error_1.APIError('NOT FOUND', _types_1.HttpStatusCode.NOT_FOUND, true, 'Photo not found');
                }
                return [4 /*yield*/, photoRepository.remove(photoToRemove)];
            case 2:
                _a.sent();
                return [4 /*yield*/, photoRepository.find({
                        order: {
                            createdAt: 'DESC',
                        },
                    })];
            case 3:
                allPhotos = _a.sent();
                res.status(200).json({ success: true, data: allPhotos });
                return [2 /*return*/];
        }
    });
}); }));
// search for photos
router.get('/search/filter/', (0, async_1.asyncMiddleware)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var searchTerm, photos;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                searchTerm = req.query.searchTerm;
                return [4 /*yield*/, photoRepository.find({
                        where: { label: (0, typeorm_1.Like)("%".concat(searchTerm, "%")) },
                        order: {
                            createdAt: 'DESC',
                        },
                    })];
            case 1:
                photos = _a.sent();
                res.status(200).json({ success: true, data: photos });
                return [2 /*return*/];
        }
    });
}); }));
exports.default = { path: '/photos', router: router };
//# sourceMappingURL=photos.js.map