const fs = require('fs');
const readPkgUp = require('read-pkg-up');
const { pkg: pkgJSON } = readPkgUp.sync();

const dependencies = Object.keys(pkgJSON.dependencies);

const TEMP_FILE_PATH = './.codemod-update-imports';

if (!fs.existsSync(TEMP_FILE_PATH)) {
  return console.log('No packages added.');
}

const packages = fs.readFileSync(TEMP_FILE_PATH, 'utf-8');
const packagesToBeAdded = [...new Set(packages.split('\n'))].filter(pkg => !dependencies.includes(pkg));

if (packagesToBeAdded.length === 0) {
  console.log('No new packages need to be installed.');

  return fs.unlinkSync(TEMP_FILE_PATH);
}

console.log(`
  Import statements updated, run:
    yarn add ${packagesToBeAdded.join(' ').slice(1)}
`);

fs.unlinkSync(TEMP_FILE_PATH);
