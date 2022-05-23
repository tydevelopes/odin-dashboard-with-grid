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
	// Hide the scrollbar
	document.body.style.overflow = "hidden";
});

// cllose nav with animation when close icon clicked
// helper function
const closeNav = () => {
	navContentEl.classList.add("slide-out");
	navEl.classList.add("nav-bg-color", "fade-out");

	setTimeout(() => {
		navEl.classList.remove("show-nav", "nav-bg-color", "fade-in", "fade-out");
		navContentEl.classList.remove("slide-in", "slide-out");
		// Show the scrollbar
		document.body.style.overflow = "";
	}, 1001);
};

closeMenuEl.addEventListener("click", () => {
	closeNav();
});

navEl.addEventListener("click", () => {
	closeNav();
});

// add focus to search when clicked
const searchEl = document.querySelector(".search");
const searchInputEl = document.querySelector(".search > input");
const searchIconEl = document.querySelector(".search-icon");

searchEl.addEventListener("click", e => {
	searchInputEl.focus();
});
searchInputEl.addEventListener("focus", () => {
	searchEl.style.outline = "1px solid var(--btn-bg-color)";
	searchIconEl.style.color = "var(--btn-bg-color)";
});
// when search input loses focus
searchInputEl.addEventListener("blur", () => {
	searchEl.style.outline = "none";
	searchIconEl.style.color = "";
});
