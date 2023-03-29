module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
        {
          "files": ["./**/*/!(*.test).{ts,js,tsx,jsx}"],
          "plugins": ["tree-shaking"],
          "rules": {
            "tree-shaking/no-side-effects-in-initialization": 2
          }
        }
      ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
    },
    "src": "./**/*.{ts,js,tsx,jsx}",
    "ignore": ["node_modules"]
}
