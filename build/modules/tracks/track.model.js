"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Track = void 0;
var mongoose_1 = require("mongoose");
var _a = mongoose_1.Schema.Types, String = _a.String, ObjectId = _a.ObjectId;
var TrackSchema = new mongoose_1.Schema({
    name: { type: String, unique: true },
    imageUrl: { type: String, default: '' },
    audioUrl: { type: String, default: '' },
    lyrics: String,
    artist: String,
    userId: String
}, {
    timestamps: true
});
TrackSchema.index({
    name: 'text'
}, {
    weights: {
        name: 3
    }
});
exports.Track = (0, mongoose_1.model)('Track', TrackSchema);
