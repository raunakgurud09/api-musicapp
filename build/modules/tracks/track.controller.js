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
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = exports.uploadAudio = exports.trackDelete = exports.trackUpdate = exports.trackDisplay = exports.allTracks = exports.createTrack = void 0;
var lodash_1 = require("lodash");
var cloudinary_1 = require("../../lib/cloudinary");
var track_model_1 = require("./track.model");
var createTrack = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, lyrics, artist, userId, findTrack, track, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, lyrics = _a.lyrics, artist = _a.artist;
                userId = (0, lodash_1.get)(req, 'user').userId;
                if (!name && !artist) {
                    return [2 /*return*/, res.status(400).json({ message: 'name and artist name required' })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, track_model_1.Track.findOne({ name: name })];
            case 2:
                findTrack = _b.sent();
                if (findTrack)
                    return [2 /*return*/, res.status(400).json({ message: 'This track name already exist' })];
                return [4 /*yield*/, track_model_1.Track.create({
                        name: name,
                        lyrics: lyrics,
                        artist: artist,
                        userId: userId
                    })];
            case 3:
                track = _b.sent();
                res.status(200).json({ data: { track: track } });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                console.log(error_1);
                res.status(500).json({ message: 'Error in creating track' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createTrack = createTrack;
var allTracks = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tracks, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, track_model_1.Track.find({})];
            case 1:
                tracks = _a.sent();
                res.status(200).json({ data: { tracks: tracks, count: tracks.length } });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.log(error_2);
                res.status(500).json({ message: 'Cant get tracks' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.allTracks = allTracks;
var trackDisplay = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var trackId, track, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                trackId = req.params.trackId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, track_model_1.Track.findOne({ _id: trackId }).populate('')];
            case 2:
                track = _a.sent();
                res.status(200).json({ data: { track: track } });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.log(error_3);
                res.status(500).json({ message: 'cant get this track' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.trackDisplay = trackDisplay;
var trackUpdate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var trackId, _a, name, lyrics, artist, track, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                trackId = req.params.trackId;
                _a = req.body, name = _a.name, lyrics = _a.lyrics, artist = _a.artist;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, track_model_1.Track.findOneAndUpdate({ _id: trackId }, { name: name, lyrics: lyrics, artist: artist })];
            case 2:
                track = _b.sent();
                res.status(200).json({ data: { track: track } });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _b.sent();
                console.log(error_4);
                res.status(500).json({ message: 'cant get this track' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.trackUpdate = trackUpdate;
var trackDelete = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var trackId, track, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                trackId = req.params.trackId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, track_model_1.Track.findOneAndDelete({ _id: trackId })];
            case 2:
                track = _a.sent();
                res.status(200).json({ message: 'Track deleted' });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                console.log(error_5);
                res.status(500).json({ message: 'cant get this track' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.trackDelete = trackDelete;
var uploadAudio = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var audio, trackId, track, audioUrl, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                audio = (0, lodash_1.get)(req, 'file');
                trackId = req.params.trackId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, track_model_1.Track.findOne({ _id: trackId })];
            case 2:
                track = _a.sent();
                if (!track)
                    return [2 /*return*/, res.status(400).json({ message: "Track doesn't exist" })];
                if (!audio)
                    return [2 /*return*/, res.status(400).json({ message: 'Audio is required' })];
                return [4 /*yield*/, cloudinary_1.Cloudinary.uploadAudioFile(audio, "/".concat(trackId))];
            case 3:
                audioUrl = _a.sent();
                if (!audioUrl)
                    return [2 /*return*/, { message: 'audio not uploaded' }];
                track.audioUrl = audioUrl;
                return [4 /*yield*/, track.save()];
            case 4:
                _a.sent();
                res.status(201).json({ data: { track: track }, message: 'Audio url added' });
                return [3 /*break*/, 6];
            case 5:
                error_6 = _a.sent();
                console.log(error_6);
                res.status(500).json({ message: 'cant get this track' });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.uploadAudio = uploadAudio;
var uploadImage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var image, trackId, track, imageUrl, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                image = (0, lodash_1.get)(req, 'file');
                trackId = req.params.trackId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, track_model_1.Track.findOne({ _id: trackId })];
            case 2:
                track = _a.sent();
                if (!track)
                    return [2 /*return*/, res.status(400).json({ message: "Track doesn't exist" })];
                if (!image)
                    return [2 /*return*/, res.status(400).json({ message: 'Image is required' })];
                return [4 /*yield*/, cloudinary_1.Cloudinary.upload(image, "/".concat(trackId), {
                        width: 600,
                        height: 600
                    })];
            case 3:
                imageUrl = _a.sent();
                if (!imageUrl)
                    return [2 /*return*/, res.status(500).json({ message: 'Image not uploaded ' })];
                track.imageUrl = imageUrl;
                return [4 /*yield*/, track.save()];
            case 4:
                _a.sent();
                res.status(201).json({ data: { track: track }, message: 'Image url added' });
                return [3 /*break*/, 6];
            case 5:
                error_7 = _a.sent();
                console.log(error_7);
                res.status(500).json({ message: 'cant get this track' });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.uploadImage = uploadImage;
