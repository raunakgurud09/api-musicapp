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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removePlaylistTrack = exports.addPlaylistTracks = exports.playlistTracks = exports.allUsersPlaylists = exports.getPrivatePlaylists = exports.getPublicPlaylists = exports.deletePlaylist = exports.updatePlaylist = exports.uploadPlaylistImage = exports.createPlaylist = void 0;
var lodash_1 = require("lodash");
var cloudinary_1 = require("../../lib/cloudinary");
var track_model_1 = require("../tracks/track.model");
var user_model_1 = __importDefault(require("../user/user.model"));
var playlist_model_1 = require("./playlist.model");
var createPlaylist = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, isPublic, userId, playlist, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, isPublic = _a.isPublic;
                userId = (0, lodash_1.get)(req, 'user').userId;
                if (!name && !isPublic) {
                    return [2 /*return*/, res.status(400).json({ message: 'name and isPublic are required' })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, playlist_model_1.Playlist.create({
                        name: name,
                        isPublic: isPublic,
                        userId: userId
                    })];
            case 2:
                playlist = _b.sent();
                res.status(200).json({ data: { playlist: playlist }, message: 'Playlist created' });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                console.log(error_1);
                res.status(500).json({ message: "Can't create playlist" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createPlaylist = createPlaylist;
var uploadPlaylistImage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var image, playlistId, userId, playlist, imageUrl, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                image = (0, lodash_1.get)(req, 'file');
                playlistId = req.params.playlistId;
                userId = (0, lodash_1.get)(req, 'user').userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, playlist_model_1.Playlist.findOne({ _id: playlistId })];
            case 2:
                playlist = _a.sent();
                if (!playlist)
                    return [2 /*return*/, res.status(400).json({ message: 'No such playlist exist' })];
                if (!image)
                    return [2 /*return*/, res.status(400).json({ message: 'Image is required' })];
                return [4 /*yield*/, cloudinary_1.Cloudinary.upload(image, "/".concat(playlistId), {
                        width: 600,
                        height: 600
                    })];
            case 3:
                imageUrl = _a.sent();
                if (!imageUrl)
                    return [2 /*return*/, res.status(500).json({ message: 'Image not uploaded ' })];
                playlist.imageUrl = imageUrl;
                return [4 /*yield*/, playlist.save()];
            case 4:
                _a.sent();
                res.status(201).json({ data: { playlist: playlist } });
                return [3 /*break*/, 6];
            case 5:
                error_2 = _a.sent();
                console.log(error_2);
                res.status(500).json({ message: 'Not able to upload' });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.uploadPlaylistImage = uploadPlaylistImage;
var updatePlaylist = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var playlistId, _a, name, isPublic, playlist, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                playlistId = req.params.playlistId;
                _a = req.body, name = _a.name, isPublic = _a.isPublic;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, playlist_model_1.Playlist.findOneAndUpdate({ _id: playlistId }, { name: name, isPublic: isPublic })];
            case 2:
                playlist = _b.sent();
                if (!playlist)
                    return [2 /*return*/, res.status(400).json({ message: 'Playlist not found' })];
                return [4 /*yield*/, playlist.save()];
            case 3:
                _b.sent();
                res.status(200).json({ data: { playlist: playlist } });
                return [3 /*break*/, 5];
            case 4:
                error_3 = _b.sent();
                console.log(error_3);
                res.status(500).json({ message: 'cant get this playlist' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updatePlaylist = updatePlaylist;
var deletePlaylist = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var playlistId, playlist, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                playlistId = req.params.playlistId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, playlist_model_1.Playlist.findOneAndDelete({ _id: playlistId })];
            case 2:
                playlist = _a.sent();
                res.status(200).json({ message: 'Playlist deleted' });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                console.log(error_4);
                res.status(500).json({ message: 'cant get this Playlist' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deletePlaylist = deletePlaylist;
var getPublicPlaylists = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, playlists, publicPlaylist, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, user_model_1.default.findOne({ _id: userId })];
            case 2:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, res.status(400).json({ message: 'No user found' })];
                return [4 /*yield*/, playlist_model_1.Playlist.find({ userId: userId })
                    // filter playlist to only public
                ];
            case 3:
                playlists = _a.sent();
                publicPlaylist = playlists.filter(function (playlist) {
                    if (playlist.isPublic === true)
                        return playlist;
                });
                res
                    .status(200)
                    .json({ data: { publicPlaylist: publicPlaylist }, message: 'All users playlist' });
                return [3 /*break*/, 5];
            case 4:
                error_5 = _a.sent();
                console.log(error_5);
                res.status(500).json({ message: "can't get users playlist" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getPublicPlaylists = getPublicPlaylists;
var getPrivatePlaylists = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var playlistId, userId, user, playlist, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                playlistId = req.params.playlistId;
                userId = (0, lodash_1.get)(req, 'user').userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, user_model_1.default.findOne({ _id: userId })];
            case 2:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, res.status(400).json({ message: 'No user found' })];
                return [4 /*yield*/, playlist_model_1.Playlist.find({ _id: playlistId }).populate('tracks')];
            case 3:
                playlist = _a.sent();
                res.status(200).json({ data: { playlist: playlist }, message: 'All users playlist' });
                return [3 /*break*/, 5];
            case 4:
                error_6 = _a.sent();
                console.log(error_6);
                res.status(500).json({ message: "can't get users playlist" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getPrivatePlaylists = getPrivatePlaylists;
var allUsersPlaylists = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, playlists, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = (0, lodash_1.get)(req, 'user').userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, user_model_1.default.findOne({ _id: userId })];
            case 2:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, res.status(400).json({ message: 'No user found' })];
                return [4 /*yield*/, playlist_model_1.Playlist.find({ userId: userId })];
            case 3:
                playlists = _a.sent();
                res.status(200).json({ data: { playlists: playlists }, message: 'All users playlist' });
                return [3 /*break*/, 5];
            case 4:
                error_7 = _a.sent();
                console.log(error_7);
                res.status(500).json({ message: "can't get users playlist" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.allUsersPlaylists = allUsersPlaylists;
var playlistTracks = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, playlists, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = (0, lodash_1.get)(req, 'user').userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, user_model_1.default.findOne({ _id: userId })];
            case 2:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, res.status(400).json({ message: 'No user found' })];
                return [4 /*yield*/, playlist_model_1.Playlist.find({ userId: userId }).populate('tracks')];
            case 3:
                playlists = _a.sent();
                res.status(200).json({ data: { playlists: playlists }, message: 'All users playlist' });
                return [3 /*break*/, 5];
            case 4:
                error_8 = _a.sent();
                console.log(error_8);
                res.status(500).json({ message: "can't get users playlist" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.playlistTracks = playlistTracks;
var addPlaylistTracks = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, playlistId, trackId, playlist, track, isTrackExist, error_9;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, playlistId = _a.playlistId, trackId = _a.trackId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 7, , 8]);
                return [4 /*yield*/, playlist_model_1.Playlist.findOne({ _id: playlistId }).populate('')];
            case 2:
                playlist = _b.sent();
                if (!playlist) {
                    return [2 /*return*/, res.status(400).json({ message: "Playlist doesn't exist" })];
                }
                return [4 /*yield*/, track_model_1.Track.findOne({ _id: trackId })];
            case 3:
                track = _b.sent();
                if (!track)
                    return [2 /*return*/, res.status(400).json({ message: 'No such track found' })];
                isTrackExist = playlist === null || playlist === void 0 ? void 0 : playlist.tracks.some(function (track) { return trackId == track.toString(); });
                if (!isTrackExist) return [3 /*break*/, 4];
                return [2 /*return*/, res
                        .status(400)
                        .json({ message: 'Track already exist in playlist' })];
            case 4: return [4 /*yield*/, playlist_model_1.Playlist.findByIdAndUpdate({ _id: playlistId }, { $addToSet: { tracks: trackId } }, { new: true })];
            case 5:
                playlist = _b.sent();
                _b.label = 6;
            case 6:
                res
                    .status(200)
                    .json({ data: { playlist: playlist }, message: 'Track added to your list' });
                return [3 /*break*/, 8];
            case 7:
                error_9 = _b.sent();
                console.log(error_9);
                res.status(500).json({ message: "Can't update track to playlist" });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.addPlaylistTracks = addPlaylistTracks;
var removePlaylistTrack = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, playlistId, trackId, playlist, error_10;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, playlistId = _a.playlistId, trackId = _a.trackId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, playlist_model_1.Playlist.findOneAndUpdate({ _id: playlistId }, { $pull: { tracks: { _id: trackId } } }, { new: true }).populate('tracks')];
            case 2:
                playlist = _b.sent();
                res
                    .status(200)
                    .json({ data: { playlist: playlist }, message: 'Track deleted from playlist' });
                return [3 /*break*/, 4];
            case 3:
                error_10 = _b.sent();
                console.log(error_10);
                res.status(500).json({ message: "Can't update track to playlist" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.removePlaylistTrack = removePlaylistTrack;
// console.log(playlist, track)
