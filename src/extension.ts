import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

const compile = require('template-literal');

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('hello-world.teste', () => {
		vscode.window.showInformationMessage('Teste 123!');
	}));

	let currentPanel: vscode.WebviewPanel | undefined = undefined;

	context.subscriptions.push(vscode.commands.registerCommand('hello-world.show-file', () => {
		if (currentPanel) {
			currentPanel.reveal();
		} else {
			const viewType = "hello-world.show-file";
			const title = "Adicionar Novo Servidor"
			const showOptions = vscode.ViewColumn.One;
			const options = {
				enableScripts: true,
				localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'src', 'view', 'server'))],
				retainContextWhenHidden: true
			};

			currentPanel = vscode.window.createWebviewPanel(viewType, title, showOptions, options);

			currentPanel.webview.html = getWebViewContent(context);
			// currentPanel.webview.html = '<span class="">	at io.undertow.core@2.0.27.Final//io.undertow.server.handlers.PredicateHandler.handleRequest(PredicateHandler.java:43)<br></span>';

			// currentPanel.onDidDispose(() => currentPanel = undefined, null, context.subscriptions);

			// currentPanel.webview.onDidReceiveMessage(
			// 	message => {
			// 		if (message.serverName &&
			// 			message.serverHost &&
			// 			message.serverPort &&
			// 			message.serverUser &&
			// 			message.serverPass &&
			// 			message.company) {
			// 			const typeServer = "vs-fluig-servers";
			// 			const serverId = createServer(typeServer, message, "", true);
			// 			//Fecha aba
			// 			if (currentPanel) {
			// 				currentPanel.dispose();
			// 			}
			// 		}
			// 	},
			// 	undefined,
			// 	context.subscriptions
			// );
		}
	}));

	function getWebViewContent(context: any) {
		const htmlPath = vscode.Uri.file(path.join(context.extensionPath, 'resources', 'view.html'));
		// const cssPath = vscode.Uri.file(path.join(context.extensionPath, 'resources', 'view', 'server', 'addServer.css'));
		const htmlContent = fs.readFileSync(htmlPath.with({ scheme: 'vscode-resource' }).fsPath);
		// const cssContent = fs.readFileSync(cssPath.with({ scheme: 'vscode-resource' }).fsPath);
		let runTemplate = compile(htmlContent);
		return runTemplate();
	}
}

// this method is called when your extension is deactivated
export function deactivate() {}
