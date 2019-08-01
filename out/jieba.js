"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodejieba = require("nodejieba");
function fenci(str) {
    var result = nodejieba.cut(str);
    return result;
}
exports.fenci = fenci;
