const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

function getHppContent(name) {
  const guard = `${name.toUpperCase()}_HPP`;
  return (
    `#ifndef ${guard}\n` +
    `#define ${guard}\n` +
    `\n` +
    `class ${name}\n` +
    `{\n` +
    `\tprivate :\n` +
    `\n` +
    `\tpublic :\n` +
    `\t\t${name}(void);\n` +
    `\t\t${name}(const ${name} &other);\n` +
    `\t\t${name} &operator = (const ${name} &other);\n` +
    `\t\t~${name}(void);\n` +
    `};\n` +
    `\n` +
    `#endif\n`
  );
}

function getCppContent(name) {
  return (
    `#include "${name}.hpp"\n` +
    `\n` +
    `${name}::${name}(void)\n` +
    `{\n` +
    `}\n` +
    `\n` +
    `${name}::${name}(const ${name} &other)\n` +
    `{\n` +
    `}\n` +
    `\n` +
    `${name} &${name}::operator = (const ${name} &other)\n` +
    `{\n` +
    `\treturn (*this);\n` +
    `}\n` +
    `\n` +
    `${name}::~${name}(void)\n` +
    `{\n` +
    `}\n`
  );
}

function createIfNotExists(filePath, content) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
}

function activate(context) {
  console.log('[cpp-hpp-generator] activated!');
  const watcher = vscode.workspace.createFileSystemWatcher('**/*.{hpp,cpp}');

  watcher.onDidCreate((uri) => {
    console.log('[cpp-hpp-generator] file created:', uri.fsPath);
    const filePath = uri.fsPath;
    const ext = path.extname(filePath);
    const name = path.basename(filePath, ext);
    const dir = path.dirname(filePath);

    try {
      if (ext === '.hpp') {
        const size = fs.statSync(filePath).size;
        if (size === 0)
          fs.writeFileSync(filePath, getHppContent(name), 'utf8');
        createIfNotExists(path.join(dir, `${name}.cpp`), getCppContent(name));
      } else if (ext === '.cpp') {
        const size = fs.statSync(filePath).size;
        if (size === 0)
          fs.writeFileSync(filePath, getCppContent(name), 'utf8');
        createIfNotExists(path.join(dir, `${name}.hpp`), getHppContent(name));
      }
    } catch (e) {
      console.error('[cpp-hpp-generator] error:', e);
    }
  });

  context.subscriptions.push(watcher);
}

function deactivate() {}

module.exports = { activate, deactivate };
