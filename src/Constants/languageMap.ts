type languageData = {
    name: string;
    commentStart: string;
    commentEnd: string;
};

export const languageMap = new Map<string, languageData>([
    ["bash", { name: "Bash", commentStart: "# ", commentEnd: "" }],
    ["c", { name: "C", commentStart: "// ", commentEnd: "" }],
    ["cpp", { name: "C++", commentStart: "// ", commentEnd: "" }],
    ["csharp", { name: "C#", commentStart: "// ", commentEnd: "" }],
    ["css", { name: "CSS", commentStart: "/* ", commentEnd: " */" }],
    ["django", { name: "Django", commentStart: "{# ", commentEnd: " #}" }],
    ["fortran", { name: "Fortran", commentStart: "! ", commentEnd: "" }],
    ["go", { name: "Go", commentStart: "// ", commentEnd: "" }],
    ["groovy", { name: "Groovy", commentStart: "// ", commentEnd: "" }],
    ["haskell", { name: "HasKell", commentStart: "-- ", commentEnd: "" }],
    ["html", { name: "HTML", commentStart: "<!-- ", commentEnd: " -->" }],
    ["java", { name: "Java", commentStart: "// ", commentEnd: "" }],
    ["javascript", { name: "JavaScript", commentStart: "// ", commentEnd: "" }],
    ["json", { name: "JSON", commentStart: "", commentEnd: "" }],
    ["jsx", { name: "JSX", commentStart: "// ", commentEnd: "" }],
    ["kotlin", { name: "Kotlin", commentStart: "// ", commentEnd: "" }],
    ["lua", { name: "Lua", commentStart: "-- ", commentEnd: "" }],
    [
        "markdown",
        { name: "Markdown", commentStart: "<!-- ", commentEnd: " -->" },
    ],
    ["matlab", { name: "MATLAB", commentStart: "% ", commentEnd: "" }],
    ["objectivec", { name: "Objective-C", commentStart: "// ", commentEnd: "" }],
    ["perl", { name: "Perl", commentStart: "# ", commentEnd: "" }],
    ["php", { name: "PHP", commentStart: "// ", commentEnd: "" }],
    ["plaintext", { name: "Plain Text", commentStart: "", commentEnd: "" }],
    ["powershell", { name: "PowerShell", commentStart: "# ", commentEnd: "" }],
    ["python", { name: "Python", commentStart: "# ", commentEnd: "" }],
    ["r", { name: "R", commentStart: "# ", commentEnd: "" }],
    ["regex", { name: "RegExp", commentStart: "", commentEnd: "" }],
    ["ruby", { name: "Ruby", commentStart: "# ", commentEnd: "" }],
    ["rust", { name: "Rust", commentStart: "// ", commentEnd: "" }],
    ["sql", { name: "SQL", commentStart: "", commentEnd: "" }],
    ["swift", { name: "Swift", commentStart: "// ", commentEnd: "" }],
    ["typescript", { name: "TypeScript", commentStart: "// ", commentEnd: "" }],
    ["tsx", { name: "TSX", commentStart: "// ", commentEnd: "" }],
    [
        "visual-basic",
        { name: "Visual Basic", commentStart: "' ", commentEnd: "" },
    ],
    ["xml", { name: "XML", commentStart: "<!-- ", commentEnd: " -->" }],
]);
