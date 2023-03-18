"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackRouter = void 0;
var express_1 = require("express");
var authenticate_1 = __importDefault(require("../../middleware/authenticate"));
var requiresUser_middleware_1 = __importDefault(require("../../middleware/requiresUser.middleware"));
var user_router_1 = require("../user/user.router");
var track_controller_1 = require("./track.controller");
var router = (0, express_1.Router)();
exports.trackRouter = router;
router.route('/').post(requiresUser_middleware_1.default, user_router_1.uploads.any(), track_controller_1.createTrack).get(track_controller_1.allTracks);
router
    .route('/:trackId/audio')
    .post(requiresUser_middleware_1.default, authenticate_1.default.trackPermission, user_router_1.uploads.single('audio'), track_controller_1.uploadAudio);
router
    .route('/:trackId/image')
    .post(requiresUser_middleware_1.default, authenticate_1.default.trackPermission, user_router_1.uploads.single('image'), track_controller_1.uploadImage);
router
    .route('/:trackId')
    .get(requiresUser_middleware_1.default, track_controller_1.trackDisplay)
    .put(requiresUser_middleware_1.default, authenticate_1.default.trackPermission, track_controller_1.trackUpdate)
    .delete(requiresUser_middleware_1.default, authenticate_1.default.trackPermission, track_controller_1.trackDelete);
