import globals from 'globals';
import pluginJs from '@eslint/js';
import daStyle from 'eslint-config-dicodingacademy';

export default [

  { languageOptions: { globals: { ...globals.node, ...globals.browser, __dirname: 'readonly', describe: 'readonly', it: 'readonly', expect: 'readonly', } } },
  pluginJs.configs.recommended,
  daStyle,

  {
    rules: {
    },
  },
];
