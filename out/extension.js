"use strict";
/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const Translate = require('../baidu_translate.js');
// import 'google-translate-api';
const translate = require('google-translate-api');
var text = "flower";
//对翻译结果进行处理
function translateResHandler(res) {
    let resArr = res.split(' ');
    console.log('监视测试');
    resArr.map(item => firstUpperCase(item));
    return resArr.join(); //数组转字符串	
}
function firstUpperCase(str) {
    return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}
function activate(context) {
    let provider1 = vscode.languages.registerCompletionItemProvider('plaintext', {
        provideCompletionItems(document, position, token, context) {
            const simpleCompletion = new vscode.CompletionItem('Hello World!');
            // a completion item that inserts its text as snippet,
            // the `insertText`-property is a `SnippetString` which we will
            // honored by the editor.
            const snippetCompletion = new vscode.CompletionItem('Good part of the day');
            snippetCompletion.insertText = new vscode.SnippetString('Good ${1|morning,afternoon,evening|}. It is ${1}, right?');
            snippetCompletion.documentation = new vscode.MarkdownString("Inserts a snippet that lets you select the _appropriate_ part of the day for your greeting.");
            // a completion item that can be accepted by a commit character,
            // the `commitCharacters`-property is set which means that the completion will
            // be inserted and then the character will be typed.
            const commitCharacterCompletion = new vscode.CompletionItem('var');
            // commitCharacterCompletion.commitCharacters = ['z'];p
            commitCharacterCompletion.documentation = new vscode.MarkdownString('Press `.` to get `console.`');
            // a completion item that retriggers IntelliSense when being accepted,
            // the `command`-property is set which the editor will execute after 
            // completion has been inserted. Also, the `insertText` is set so that 
            // a space is inserted after `new`
            const commandCompletion = new vscode.CompletionItem('new');
            commandCompletion.kind = vscode.CompletionItemKind.Keyword;
            commandCompletion.insertText = 'new ';
            commandCompletion.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' };
            // return all completion items as array
            return [
                simpleCompletion,
                snippetCompletion,
                commitCharacterCompletion,
                commandCompletion
            ];
        }
    });
    const provider2 = vscode.languages.registerCompletionItemProvider('plaintext', {
        provideCompletionItems(document, position) {
            return __awaiter(this, void 0, void 0, function* () {
                // console.log(result);
                //截取 'var ' 后的字符串  。需要翻译的文本s
                if (position.character >= 4) {
                    //检测输入是否是汉字  先删除  正则测试方法 reg.test(str);
                    const reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
                    // 取得 var 后的字符
                    let lineAllCharacter = document.lineAt(position).text;
                    if (lineAllCharacter.trim() == 'var') {
                        return;
                    }
                    let varIndex = lineAllCharacter.indexOf('var ');
                    let startIndex = varIndex + 4;
                    let translateChar = document.lineAt(position).text.substr(startIndex, position.character).trim(); // 需要翻译的文字
                    //translate
                    console.log('开始是翻译。。。。');
                    let baiduTranslateResults = yield Translate.baidu_translate(translateChar);
                    baiduTranslateResults = translateResHandler(baiduTranslateResults);
                    //生成提示条目
                    let alertItems = [];
                    for (let i in baiduTranslateResults) {
                        alertItems.push(new vscode.CompletionItem(baiduTranslateResults[i], vscode.CompletionItemKind.Method));
                    }
                    console.log('开始翻是译。。 ssss。。', alertItems);
                    return alertItems;
                    // return;
                }
            });
        }
    }, 'undefined' // triggered whenever a '' is being typed
    );
    context.subscriptions.push(provider1, provider2);
}
exports.activate = activate;
