const readJson = async (path) => JSON.parse(await Bun.file(path).text());

const [base, dark] = await Promise.all([
	readJson("./themes/base.json"),
	readJson("./themes/cisco-dark.json"),
]);

base.themes.push({
	name: "Cisco Dark",
	appearance: "dark",
	style: dark,
});

await Bun.write("./cisco-theme.json", JSON.stringify(base, null, 2));

console.log("Theme built successfully!");
