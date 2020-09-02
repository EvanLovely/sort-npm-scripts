#!/usr/bin/env node
const { join } = require('path');
const { existsSync, writeFileSync } = require('fs');
const os = require('os');
const sortObjectKeys = require('sort-object-keys');

const pkgPath = join(process.cwd(), 'package.json');
if (!existsSync(pkgPath)) {
  console.log('No package.json found in CWD');
  process.exit(1);
}

const pkg = require(pkgPath);
pkg.scripts = sortObjectKeys(pkg.scripts);
if (pkg.dependencies) {
  pkg.dependencies = sortObjectKeys(pkg.dependencies);
}
if (pkg.devDependencies) {
  pkg.devDependencies = sortObjectKeys(pkg.devDependencies);
}
writeFileSync(pkgPath, JSON.stringify(pkg, null, '  ') + os.EOL);
