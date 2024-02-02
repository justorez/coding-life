module.exports = {
    printWidth: 80,
    tabWidth: 4,
    semi: false,
    singleQuote: true,
    bracketSpacing: true,
    trailingComma: "none",
    overrides: [
        {
            files: ['*.json', '*.yaml', '*.yml'],
            options: {
                tabWidth: 2
            }
        }
    ]
}
