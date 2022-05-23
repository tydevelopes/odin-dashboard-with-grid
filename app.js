// toggle theme
const toggleThemeEl = document.querySelector(".fa-circle-half-stroke");
toggleThemeEl.addEventListener("click", () => {
	const root = document.documentElement;
	const newTheme = root.className === "dark" ? "light" : "dark";
	root.className = newTheme;
});

// nav controllers
const openMenuEl = document.querySelector(".open-menu");
const navEl = document.querySelector(".nav");
const navContentEl = document.querySelector(".nav-content");
const closeMenuEl = document.querySelector(".close-menu");

// open nav with animation when menu icon clicked
openMenuEl.addEventListener("click", () => {
	navEl.classList.add("show-nav", "fade-in");
	navContentEl.classList.add("slide-in");
});

// cllose nav with animation when close icon clicked
// helper function
const closeNav = () => {
	navContentEl.classList.add("slide-out");
	navEl.classList.add("nav-bg-color", "fade-out");
	setTimeout(() => {
		navEl.classList.remove("show-nav", "nav-bg-color", "fade-in", "fade-out");
		navContentEl.classList.remove("slide-in", "slide-out");
	}, 1001);
};

closeMenuEl.addEventListener("click", () => {
	closeNav();
});

navEl.addEventListener("click", () => {
	closeNav();
});
