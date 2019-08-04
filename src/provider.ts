import * as vscode from 'vscode';

class Translate { 
constructor() { 
}
provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

let linePrefix = document.lineAt(position).text.substr(0, position.character);
if (!linePrefix.endsWith('console.')) {
return undefined;
}

return [
new vscode.CompletionItem('log', vscode.CompletionItemKind.Method),
new vscode.CompletionItem('warn', vscode.CompletionItemKind.Method),
new vscode.CompletionItem('error', vscode.CompletionItemKind.Method),
];
}

}


export default Translate;