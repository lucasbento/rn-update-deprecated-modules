const fs = require('fs');

const TEMP_FILE_PATH = './.codemod-update-imports';
const COMMUNITY_ORG = '@react-native-community/';

const getModuleNameWithOrg = name => `${COMMUNITY_ORG}${name}`;

const DEPRECATED_MODULES = {
  AsyncStorage: {
    newPackageName: getModuleNameWithOrg('async-storage'),
    specifier: 'importDefaultSpecifier',
  },
  MaskedViewIOS: {
    newPackageName: getModuleNameWithOrg('masked-view'),
    specifier: 'importDefaultSpecifier',
  },
  ViewPagerAndroid: {
    newPackageName: getModuleNameWithOrg('viewpager'),
    specifier: 'importDefaultSpecifier',
  },
  Slider: {
    newPackageName: getModuleNameWithOrg('slider'),
    specifier: 'importDefaultSpecifier',
  },
  NetInfo: {
    newPackageName: getModuleNameWithOrg('netinfo'),
    specifier: 'importDefaultSpecifier',
  },
  WebView: {
    newPackageName: 'react-native-webview',
    specifier: 'importSpecifier',
  },
};

let addedPackages = [];

module.exports = function(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const importDeclaration = root.find(j.ImportDeclaration, {
    source: {
      type: 'Literal',
      value: 'react-native',
    },
  });

  const importSpecifiers = importDeclaration.find(j.ImportSpecifier);

  importSpecifiers.forEach(node => {
    const { name: moduleName } = node.value.imported;
    const { name: localName } = node.value.local;

    const modulePackage = DEPRECATED_MODULES[moduleName];

    if (!modulePackage) {
      return node;
    }

    importDeclaration.insertAfter(
      j.importDeclaration(
        [
          j[modulePackage.specifier](j.identifier(localName))
        ],
        j.literal(modulePackage.newPackageName)
      ),
    );

    j(node).remove();

    if (!addedPackages.includes(modulePackage.newPackageName)) {
      addedPackages.push(modulePackage.newPackageName);
    }

    return node;
  });

  if (importDeclaration.find(j.ImportSpecifier).length === 0) {
    importDeclaration.remove();
  }

  if (addedPackages.length > 0) {
    fs.appendFileSync(TEMP_FILE_PATH, `\n${addedPackages.join('\n')}`, 'utf-8');
  }

  return root.toSource();
};
