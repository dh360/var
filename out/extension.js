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
function activate(context) {
    let provider1 = vscode.languages.registerCompletionItemProvider('plaintext', {
        provideCompletionItems(document, position, token, context) {
            const simpleCompletion = new vscode.CompletionItem('Hello World!');
            const snippetCompletion = new vscode.CompletionItem('Good part of the day');
            snippetCompletion.insertText = new vscode.SnippetString('Good ${1|morning,afternoon,evening|}. It is ${1}, right?');
            snippetCompletion.documentation = new vscode.MarkdownString("Inserts a snippet that lets you select the _appropriate_ part of the day for your greeting.");
            const commitCharacterCompletion = new vscode.CompletionItem('var');
            commitCharacterCompletion.commitCharacters = ['z'];
            commitCharacterCompletion.documentation = new vscode.MarkdownString('Press `.` to get `console.`');
            const commandCompletion = new vscode.CompletionItem('new');
            commandCompletion.kind = vscode.CompletionItemKind.Keyword;
            commandCompletion.insertText = 'new ';
            commandCompletion.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' };
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
                if (position.character >= 4) {
                    console.log('检测到输入');
                    const reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
                    // 取得 var 后的字符
                    let lineAllCharacter = document.lineAt(position).text;
                    if (lineAllCharacter.trim() == 'var') {
                        return;
                    }
                    let varIndex = lineAllCharacter.indexOf('var ');
                    let startIndex = varIndex + 4;
                    let translateChar = document.lineAt(position).text.substr(startIndex, position.character).trim(); // 需要翻译的文字
                    console.log('开始翻译。。。。');
                    let baiduTranslateResults = yield Translate.baidu_translate(translateChar);
                    let alertItems = [];
                    for (let i in baiduTranslateResults) {
                        alertItems.push(new vscode.CompletionItem(baiduTranslateResults[i], vscode.CompletionItemKind.Method));
                    }
                    return alertItems;
                }
            });
        }
    }, ' ' // triggered whenever a '' is being typed
    );
    context.subscriptions.push(provider1, provider2);
}
exports.activate = activate;
