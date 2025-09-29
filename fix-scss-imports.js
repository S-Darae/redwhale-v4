walkDir(rootDir, (file) => {
  // foundation 폴더 안은 제외
  if (file.includes("foundation")) return;

  let content = fs.readFileSync(file, "utf8");

  if (!content.includes('@use "../../foundation/typography"')) {
    const injectImports = `@use "../../foundation/typography" as *;
@use "../../foundation/color" as *;
@use "../../foundation/shadow" as *;
@use "../../foundation/icon" as *;

`;

    content = injectImports + content;
    fs.writeFileSync(file, content, "utf8");
    console.log(`✅ Fixed imports in: ${file}`);
  }
});
