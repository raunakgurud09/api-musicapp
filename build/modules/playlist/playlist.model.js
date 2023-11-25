"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Playlist = void 0;
var mongoose_1 = require("mongoose");
var _a = mongoose_1.Schema.Types, String = _a.String, ObjectId = _a.ObjectId;
var PlaylistSchema = new mongoose_1.Schema({
    name: { type: String },
    isPublic: { type: Boolean, default: true },
    imageUrl: { type: String, default: '' },
    userId: {
        type: ObjectId,
        ref: 'User'
    },
    tracks: [
        {
            type: ObjectId,
            ref: 'Track'
        }
    ]
}, {
    timestamps: true
});
exports.Playlist = (0, mongoose_1.model)('Playlist', PlaylistSchema);
