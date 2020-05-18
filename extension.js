// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs')
const path = require('path')

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vue-component-scaffold" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vue-component-scaffold.createComponentFolder', function () {
		let name, dir
		vscode.window.showInputBox({
			prompt: "Component Name",
			placeHolder: 'VueComponent'
		}).then(str => {
			console.log("Il nome del componente è ", n);

			name = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
			const folderPath = vscode.workspace.workspaceFolders[0].uri.toString().split(':')[1]
			dir = path.join(folderPath, name)
			return dir
		}).then((dir) => {
			console.log("La nuova dir è ", dir)

			try {
				//if (options.folder) {
				//creo la cartella
				if (!fs.existsSync(dir)) {
					fs.mkdirSync(dir)
					console.log("%s Creating Folder 📂: \t", '✔')
				} else {
					console.log("%s Folder alreeady exists 📂:\t ", '⚠', name)
				}

				//}
				let vueContent = `<template src="./${name}.html"></template>
	<script src="./${name}.js"></script>
	<script src="./${name}.ctrl.js"></script>
	<style src="./${name}.scss" lang="scss"></style>`
				let jsContent = `export default {}`
				let scssContent = `@import variables`
				fs.writeFileSync(path.join(dir, name + '.vue'), vueContent)
				console.log("%s Creating Vue File 📂: \t", '✔')
				fs.writeFileSync(path.join(dir, name + '.js'), jsContent)
				console.log("%s Creating Js File 📂: \t", '✔')
				fs.writeFileSync(path.join(dir, name + '.ctrl.js'), jsContent)
				console.log("%s Creating Js Store File 📂: \t", '✔')
				fs.writeFileSync(path.join(dir, name + '.scss'), scssContent)
				console.log("%s Creating Scss File 📂: \t", '✔')
				fs.writeFileSync(path.join(dir, name + '.html'), '')
				console.log("%s Creating Html File 📂: \t", '✔')

			} catch (error) {
				console.log("errore", error)
			}
		})
		// 		let vueContent = `<template src="./${name}.html"></template>
		// <script src="./${name}.js"></script>
		// <script src="./${name}.ctrl.js"></script>
		// <style src="./${name}.scss" lang="scss"></style>
		//     `
		// 		// ? let jsContent = `export default {}`
		// 		// ? let scssContent = `@import variables`
		// 		console.log("Folder Path ", vscode.workspace.workspaceFolders)
		// 		fs.writeFile(path.join(folderPath, `${name}.vue`), vueContent, err => {
		// 			if (err) {
		// 				console.error(err);
		// 				vscode.window.showErrorMessage("Failed to create VUE file")
		// 			}
		// 			vscode.window.showInformationMessage("File Scritto correttamente ")
		// 		})


	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}