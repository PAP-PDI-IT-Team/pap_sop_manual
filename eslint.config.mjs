export default [
  {
    files: ["**/*.js"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "VariableDeclarator > Identifier.id[name=/^.{1,4}$/u]",
          message: "Variable names must be at least five characters long.",
        },
        {
          selector:
            ":matches(FunctionDeclaration, FunctionExpression) > Identifier.id",
          message: "Function names must be at least five characters long.",
        },
      ],
    },
  },
];
