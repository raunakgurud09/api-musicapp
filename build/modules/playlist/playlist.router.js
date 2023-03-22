"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.playlistRouter = void 0;
var express_1 = require("express");
var authenticate_1 = __importDefault(require("../../middleware/authenticate"));
var requiresUser_middleware_1 = __importDefault(require("../../middleware/requiresUser.middleware"));
var user_router_1 = require("../user/user.router");
var playlist_controller_1 = require("./playlist.controller");
var router = (0, express_1.Router)();
exports.playlistRouter = router;
router.get('/', playlist_controller_1.getOpenPlaylists);
router.use(requiresUser_middleware_1.default);
router.post('/', playlist_controller_1.createPlaylist);
// get all public , private
router.get('/:userId/public', playlist_controller_1.getPublicPlaylists);
// #
router.get('/me', playlist_controller_1.allUsersPlaylists);
router
    .route('/:playlistId')
    .post(authenticate_1.default.playlistPermission, user_router_1.uploads.single('image'), playlist_controller_1.uploadPlaylistImage)
    .put(authenticate_1.default.playlistPermission, playlist_controller_1.updatePlaylist)
    .delete(authenticate_1.default.playlistPermission, playlist_controller_1.deletePlaylist)
    .get(authenticate_1.default.playlistPermission, playlist_controller_1.getPrivatePlaylists);
//tracks add remove get in playlist
router
    .route('/:playlistId/:trackId')
    .get(authenticate_1.default.playlistPermission, playlist_controller_1.playlistTracks)
    .post(authenticate_1.default.playlistPermission, playlist_controller_1.addPlaylistTracks)
    .delete(authenticate_1.default.playlistPermission, playlist_controller_1.removePlaylistTrack); // not working
