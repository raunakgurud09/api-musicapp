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
var lodash_1 = require("lodash");
var playlist_model_1 = require("../modules/playlist/playlist.model");
var track_model_1 = require("../modules/tracks/track.model");
var trackPermission = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, trackId, track, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = (0, lodash_1.get)(req, 'user');
                trackId = req.params.trackId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, track_model_1.Track.findOne({ _id: trackId }).populate('')];
            case 2:
                track = _a.sent();
                if (!track) {
                    return [2 /*return*/, res.status(404).json({ message: 'Page not found' })];
                }
                // if (track.userId._id !== user.userId) {
                //   return res
                //     .status(401)
                //     .json({ message: 'Unauthorized to access others track' })
                // }
                if (track.userId !== user.userId) {
                    return [2 /*return*/, res
                            .status(401)
                            .json({ message: 'Unauthorized to access others track' })];
                }
                return [2 /*return*/, next()];
            case 3:
                error_1 = _a.sent();
                console.log(error_1);
                res.status(400).json({ message: 'error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var playlistPermission = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, playlistId, playlist, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = (0, lodash_1.get)(req, 'user');
                playlistId = req.params.playlistId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, playlist_model_1.Playlist.findOne({ _id: playlistId }).populate('userId')];
            case 2:
                playlist = _a.sent();
                if (!playlist) {
                    return [2 /*return*/, res.status(404).json({ message: 'playlist not found' })];
                }
                if (playlist.userId._id.toString() !== user.userId) {
                    return [2 /*return*/, res
                            .status(401)
                            .json({ message: 'Unauthorized to access others playlist' })];
                }
                return [2 /*return*/, next()];
            case 3:
                error_2 = _a.sent();
                console.log(error_2);
                res.status(400).json({ message: 'error ' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.default = {
    trackPermission: trackPermission,
    playlistPermission: playlistPermission
};
