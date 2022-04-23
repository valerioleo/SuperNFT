const rules = {
  'import/order': [
    'error',
    {
      groups: [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index'
      ],
      pathGroups: [
        {pattern: 'react', group: 'builtin', position: 'before'},
        {pattern: '@mui/**', group: 'external', position: 'after'},
        {pattern: '@minepunks/common-ui/**', group: 'internal', position: 'after'},
        {pattern: '@minepunks/**', group: 'internal', position: 'before'},
        {pattern: './styles', group: 'sibling', position: 'after'}
      ],
      pathGroupsExcludedImportTypes: ['index']
    }
  ],
  'import/extensions': [
    'error',
    'ignorePackages',
    {
      js: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never'
    }
  ],
  'import/no-extraneous-dependencies': ['error', {packageDir: ''}],
  indent: ['error', 2, {SwitchCase: 1}],
  'keyword-spacing': [
    'error',
    {
      overrides: {
        if: {after: false},
        for: {after: false},
        while: {after: false},
        catch: {after: false},
        switch: {after: false}
      }
    }
  ],
  'no-unused-vars': ['error', {argsIgnorePattern: '^_*_$', varsIgnorePattern: '^_*_$'}],
  'array-bracket-spacing': ['error', 'never'],
  'object-curly-spacing': ['error', 'never'],
  'comma-dangle': ['error', 'never'],
  '@typescript-eslint/explicit-module-boundary-types': [0],
  '@typescript-eslint/keyword-spacing': [0],
  '@typescript-eslint/brace-style': [0],
  'brace-style': ['error', 'stroustrup'],
  'linebreak-style': ['error', 'unix'],
  quotes: ['error', 'single'],
  'arrow-parens': ['error', 'as-needed'],
  'react/prop-types': [0],
  'global-require': [0],
  'class-methods-use-this': ['error'],
  'no-plusplus': [0],
  'no-confusing-arrow': [0],
  'react/display-name': [0],
  'jsx-quotes': ['error', 'prefer-single'],
  'no-return-await': [0],
  'no-multiple-empty-lines': ['error', {max: 1}],
  'no-param-reassign': [
    'error',
    {
      props: true,
      ignorePropertyModificationsFor: ['ctx', 't']
    }
  ],
  'array-bracket-newline': ['error', {multiline: true, minItems: 4}],
  'array-element-newline': ['error', {multiline: true, minItems: 4}],
  'import/prefer-default-export': 'off',
  'no-useless-constructor': 'off',
  'max-classes-per-file': 'off',
  'no-unused-expressions': ['error', {allowTernary: true}]
};

module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
      legacyDecorators: true
    },
    requireConfigFile: false,
    sourceType: 'module',
    babelOptions: {
      presets: ['@babel/preset-react']
    }
  },
  plugins: ['import', 'react'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'airbnb-base'
  ],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  globals: {
    artifacts: 'readonly',
    cy: 'readonly',
    Cypress: 'readonly',
    $: 'readonly',
    browser: 'readonly',
    expect: 'readonly',
    web3: 'readonly',
    network: 'readonly',
    ethers: 'readonly',
    upgrades: 'readonly',
    contract: 'readonly',
    beforeEach: 'readonly',
    describe: 'readonly',
    it: 'readonly',
    jest: 'readonly',
    afterAll: 'readonly',
    fail: 'readonly',
    afterEach: 'readonly'
  },
  settings: {
    'import/extensions': [
      '.js',
      '.jsx',
      '.ts',
      '.tsx'
    ],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      typescript: {
        project: './tsconfig.json'
      },
      node: {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx'
        ]
      },
      alias: {
        map: [['static', './static']]
      }
    },
    react: {
      version: 'detect'
    }
  },
  rules,
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json'
      },
      plugins: ['@typescript-eslint', 'import', 'react'],
      extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'airbnb-base'
      ],
      rules
    },
    {
      files: ['*-test.js', '*.integration.js'],
      rules: {
        'no-shadow': 'off'
      }
    }
  ]
};
