// toggle theme
const toggleThemeEl = document.querySelector(".fa-circle-half-stroke");
toggleThemeEl.addEventListener("click", () => {
	const root = document.documentElement;
	const newTheme = root.className === "dark" ? "light" : "dark";
	root.className = newTheme;
});
