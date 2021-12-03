"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var accepted_1 = __importDefault(require("./accepted"));
var if_1 = __importDefault(require("./if"));
exports.default = (function (props) {
    return (0, if_1.default)(props, _1.availableRules.accepted_if, accepted_1.default);
});
