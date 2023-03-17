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
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cloudinary = void 0;
var cloudinary_1 = __importDefault(require("cloudinary"));
var index_config_1 = __importDefault(require("../configs/index.config"));
cloudinary_1.default.v2.config({
    cloud_name: index_config_1.default.cloud_name,
    api_key: index_config_1.default.api_key,
    api_secret: index_config_1.default.api_secret
});
exports.Cloudinary = {
    uploadAudioFile: function (audio, folder) { return __awaiter(void 0, void 0, void 0, function () {
        var audioUrl, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    if (!audio)
                        return [2 /*return*/, { message: 'File not uploaded properly' }];
                    return [4 /*yield*/, cloudinary_1.default.v2.uploader.upload(audio.path, {
                            resource_type: 'video',
                            public_id: "audio/".concat(folder),
                            chunk_size: 6000000,
                            eager: [
                                { width: 300, height: 300, crop: 'pad', audio_codec: 'none' },
                                {
                                    width: 160,
                                    height: 100,
                                    crop: 'crop',
                                    gravity: 'south',
                                    audio_codec: 'none'
                                }
                            ],
                            eager_async: true,
                            eager_notification_url: 'https://mysite.example.com/notify_endpoint'
                        })];
                case 1:
                    audioUrl = _a.sent();
                    return [2 /*return*/, audioUrl];
                case 2:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [2 /*return*/];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    upload: function (image, folder, _a) {
        var width = _a.width, height = _a.height;
        return __awaiter(void 0, void 0, void 0, function () {
            var res, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, cloudinary_1.default.v2.uploader.upload(image.path, {
                                public_id: "ngo_builder/".concat(folder),
                                transformation: [{ width: width, height: height, crop: 'fill' }],
                                overwrite: true,
                                invalidate: true
                            })];
                    case 1:
                        res = _b.sent();
                        return [2 /*return*/, res.secure_url];
                    case 2:
                        error_2 = _b.sent();
                        return [2 /*return*/];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
};
