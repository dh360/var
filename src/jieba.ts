
var nodejieba = require("nodejieba");
export function fenci(str: string):object { 
var result = nodejieba.cut(str);
return result;
}