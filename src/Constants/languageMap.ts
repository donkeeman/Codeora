type languageData = {
    name: string;
    commentStart: string;
    commentEnd: string;
    extension: string;
};

export const languageMap = new Map<string, languageData>([
    [
        "bash",
        { name: "Bash", commentStart: "# ", commentEnd: "", extension: "sh" },
    ],
    ["c", { name: "C", commentStart: "// ", commentEnd: "", extension: "c" }],
    [
        "cpp",
        { name: "C++", commentStart: "// ", commentEnd: "", extension: "cpp" },
    ],
    [
        "csharp",
        { name: "C#", commentStart: "// ", commentEnd: "", extension: "cs" },
    ],
    [
        "css",
        {
            name: "CSS",
            commentStart: "/* ",
            commentEnd: " */",
            extension: "css",
        },
    ],
    [
        "django",
        {
            name: "Django",
            commentStart: "{# ",
            commentEnd: " #}",
            extension: "py",
        },
    ],
    [
        "fortran",
        {
            name: "Fortran",
            commentStart: "! ",
            commentEnd: "",
            extension: "f90",
        },
    ],
    [
        "go",
        { name: "Go", commentStart: "// ", commentEnd: "", extension: "go" },
    ],
    [
        "groovy",
        {
            name: "Groovy",
            commentStart: "// ",
            commentEnd: "",
            extension: "groovy",
        },
    ],
    [
        "haskell",
        {
            name: "HasKell",
            commentStart: "-- ",
            commentEnd: "",
            extension: "hs",
        },
    ],
    [
        "html",
        {
            name: "HTML",
            commentStart: "<!-- ",
            commentEnd: " -->",
            extension: "html",
        },
    ],
    [
        "java",
        {
            name: "Java",
            commentStart: "// ",
            commentEnd: "",
            extension: "java",
        },
    ],
    [
        "javascript",
        {
            name: "JavaScript",
            commentStart: "// ",
            commentEnd: "",
            extension: "js",
        },
    ],
    [
        "json",
        { name: "JSON", commentStart: "", commentEnd: "", extension: "json" },
    ],
    [
        "jsx",
        { name: "JSX", commentStart: "// ", commentEnd: "", extension: "jsx" },
    ],
    [
        "kotlin",
        {
            name: "Kotlin",
            commentStart: "// ",
            commentEnd: "",
            extension: "kt",
        },
    ],
    [
        "lua",
        { name: "Lua", commentStart: "-- ", commentEnd: "", extension: "lua" },
    ],
    [
        "markdown",
        {
            name: "Markdown",
            commentStart: "<!-- ",
            commentEnd: " -->",
            extension: "md",
        },
    ],
    [
        "matlab",
        { name: "MATLAB", commentStart: "% ", commentEnd: "", extension: "m" },
    ],
    [
        "objectivec",
        {
            name: "Objective-C",
            commentStart: "// ",
            commentEnd: "",
            extension: "mm",
        },
    ],
    [
        "perl",
        { name: "Perl", commentStart: "# ", commentEnd: "", extension: "pl" },
    ],
    [
        "php",
        { name: "PHP", commentStart: "// ", commentEnd: "", extension: "php" },
    ],
    [
        "plaintext",
        {
            name: "Plain Text",
            commentStart: "",
            commentEnd: "",
            extension: "txt",
        },
    ],
    [
        "powershell",
        {
            name: "PowerShell",
            commentStart: "# ",
            commentEnd: "",
            extension: "ps1",
        },
    ],
    [
        "python",
        { name: "Python", commentStart: "# ", commentEnd: "", extension: "py" },
    ],
    ["r", { name: "R", commentStart: "# ", commentEnd: "", extension: "r" }],
    [
        "regex",
        { name: "RegExp", commentStart: "", commentEnd: "", extension: "txt" },
    ],
    [
        "ruby",
        { name: "Ruby", commentStart: "# ", commentEnd: "", extension: "rb" },
    ],
    [
        "rust",
        { name: "Rust", commentStart: "// ", commentEnd: "", extension: "rs" },
    ],
    [
        "sql",
        { name: "SQL", commentStart: "", commentEnd: "", extension: "sql" },
    ],
    [
        "swift",
        {
            name: "Swift",
            commentStart: "// ",
            commentEnd: "",
            extension: "swift",
        },
    ],
    [
        "typescript",
        {
            name: "TypeScript",
            commentStart: "// ",
            commentEnd: "",
            extension: "ts",
        },
    ],
    [
        "tsx",
        { name: "TSX", commentStart: "// ", commentEnd: "", extension: "tsx" },
    ],
    [
        "visual-basic",
        {
            name: "Visual Basic",
            commentStart: "' ",
            commentEnd: "",
            extension: "vb",
        },
    ],
    [
        "xml",
        {
            name: "XML",
            commentStart: "<!-- ",
            commentEnd: " -->",
            extension: "xml",
        },
    ],
]);
