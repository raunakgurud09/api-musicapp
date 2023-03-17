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
var lodash_1 = require("lodash");
var general_model_1 = require("../modules/general/general.model");
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const authorizePermissions = (...roles: any) => {
//   return (req: any, res: Response, next: NextFunction) => {
//     if (!roles.includes(req.user.role)) {
//       return res
//         .status(401)
//         .json({ message: 'Unauthorized to access this route' })
//     }
//     next()
//   }
// }
var authenticatePermission = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, ngo_name, ngo, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = (0, lodash_1.get)(req, 'user');
                ngo_name = req.params.ngo_name;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, general_model_1.Ngo.findOne({ name: ngo_name }).populate('')];
            case 2:
                ngo = _a.sent();
                if (!ngo) {
                    return [2 /*return*/, res.status(404).json({ message: 'Page not found' })];
                }
                // res.status(200).json({ ngo, message: 'hi' })
                // check ngo users edit
                if (!ngo.users.includes(user.email)) {
                    return [2 /*return*/, res
                            .status(401)
                            .json({ message: 'Unauthorized to access this route' })];
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
exports.default = authenticatePermission;
