"use strict";
// /*---------------------------------------------------------
//  * Copyright (C) Microsoft Corporation. All rights reserved.
//  *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
// import axios from 'axios';
// import * as vscode from 'vscode';
// const Translate = require('../baidu_translate.js');
// // import 'google-translate-api';
// const translate = require('google-translate-api');
// var text = "flower";
// interface axiosRes { 
// 	name: string;
// 	res: string[];
// 	text: string;
// }
// export function activate(context: vscode.ExtensionContext) {
// 	let provider1 = vscode.languages.registerCompletionItemProvider('plaintext', {
// 		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
// 			const simpleCompletion                     = new vscode.CompletionItem('Hello World!');
// 			const snippetCompletion = new vscode.CompletionItem('Good part of the day');
// 			snippetCompletion.insertText			   = new vscode.SnippetString('Good ${1|morning,afternoon,evening|}. It is ${1}, right?');
// 			snippetCompletion.documentation 		   = new vscode.MarkdownString("Inserts a snippet that lets you select the _appropriate_ part of the day for your greeting.");
// 			const commitCharacterCompletion = new vscode.CompletionItem('var');
// 			commitCharacterCompletion.commitCharacters = ['z'];
// 			commitCharacterCompletion.documentation    = new vscode.MarkdownString('Press `.` to get `console.`');
// 			const commandCompletion = new vscode.CompletionItem('new');
// 			commandCompletion.kind 					   = vscode.CompletionItemKind.Keyword;
// 			commandCompletion.insertText			   = 'new ';
// 			commandCompletion.command 				   = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' };
// 			return [
// 				simpleCompletion,
// 				snippetCompletion,
// 				commitCharacterCompletion,
// 				commandCompletion
// 			];
// 		}
// 	});
// 	const provider2 = vscode.languages.registerCompletionItemProvider('plaintext',
// 		{
// 		async 	provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
// 				if (position.character >= 4) { 
// 					console.log('检测到输入');
// 					const reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
// 						// 取得 var 后的字符
// 					let lineAllCharacter = document.lineAt(position).text;
// 					if (lineAllCharacter.trim	() == 'var') { 
// 						return;   
// 					}
// 					let varIndex = lineAllCharacter.indexOf('var ');
// 					let startIndex = varIndex + 4;
// 					let translateChar = document.lineAt(position).text.substr( startIndex, position.character).trim(); // 需要翻译的文字
// 					console.log('开始翻译。。。。');
// 					let  baiduTranslateResults  =   await Translate.baidu_translate(translateChar);
// 					let alertItems = [];
// 					for (let i in  baiduTranslateResults) { 
// 						alertItems.push( new vscode.CompletionItem( baiduTranslateResults[i], vscode.CompletionItemKind.Method) );
// 					}	
// 					return alertItems;
// 				}
// 			}
// 		},
// 		' ' // triggered whenever a '' is being typed
// 	);
// 	context.subscriptions.push(provider1, provider2);
// }
/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
const vscode = require("vscode");
const provider_1 = require("./provider");
let provider = new provider_1.default.
;
function activate(context) {
    let options = vscode.workspace.getConfiguration('var');
    const provider = vscode.languages.registerCompletionItemProvider('plaintext', provider);
    context.subscriptions.push(provider);
}
exports.activate = activate;
