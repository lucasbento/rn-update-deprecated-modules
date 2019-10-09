# Update Deprecated Modules for React Native

This project is intended to be used from version `0.59.x` which started the [Lean Core Hub] initiative that removes modules from the core of react-native into community-maintained projects.

## Installation

Install [jscodeshift]:
```sh
yarn global add jscodeshift
```

> This guide assumes that you have [npx] installed, if you wish to use this through a global installation just install it with `yarn global add rn-update-deprecated-modules` and remove `npx` from the example commands.

## Usage

> All arguments specified in [jscodeshift][jscodeshift-args] are accepted.

```sh
npx rn-update-deprecated-modules myFile.js
npx rn-update-deprecated-modules myFile.js mySecondFile.js myThirdFile.js
npx rn-update-deprecated-modules app/**/*.js
npx rn-update-deprecated-modules app/**/*.tsx --parser=tsx
```

### Example output

```
~/Documents/Projects/myNiceProject
❯ npx rn-update-deprecated-modules ./app/**/*.js
Processing 50 files...
Spawning 1 worker...
Sending 50 files to free worker...
All done.
Results:
0 errors
588 unmodified
0 skipped
1 ok
Time elapsed: 1.208seconds

 Import statements updated, run:
    yarn add @react-native-community/async-storage
```

```diff
-import { AsyncStorage, Image } from 'react-native';
+import { Image } from 'react-native';
+import AsyncStorage from '@react-native-community/async-storage';
```

## License

MIT © [Lucas Bento](http://github.com/lucasbento)

[Lean Core Hub]: https://github.com/facebook/react-native/issues/23313
[jscodeshift]: https://github.com/facebook/jscodeshift
[npx]: https://www.npmjs.com/package/npx
[jscodeshift-args]: https://github.com/facebook/jscodeshift#usage-cli
