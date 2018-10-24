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
writeFileSync(pkgPath, JSON.stringify(pkg, null, '  ') + os.EOL);
