// toggle theme
const toggleThemeEl = document.querySelector(".fa-circle-half-stroke");
const root = document.documentElement;

toggleThemeEl.addEventListener("click", () => {
	const newTheme = root.className === "dark" ? "light" : "dark";
	root.className = newTheme;
	localStorage.setItem("theme", newTheme);
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
// stop event bubbling
navContentEl.addEventListener("click", e => {
	e.stopPropagation();
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

// Navigation to scroll page to the bottom or top depending on direction of scroll

// To reliably obtain the full document height, we should take the maximum of these properties:
let scrollHeight = Math.max(
	document.body.scrollHeight,
	document.documentElement.scrollHeight,
	document.body.offsetHeight,
	document.documentElement.offsetHeight,
	document.body.clientHeight,
	document.documentElement.clientHeight
);

let oldScrollPosition = scrollY;
let scrollDirection = null;

const navigate = document.querySelector(".navigate");
const navicateIcon = document.querySelector(".navigate-icon");

navigate.addEventListener("click", () => {
	if (scrollDirection === "down") {
		// Scroll to bottom of page
		scrollTo(0, scrollHeight);
		return;
	}
	// Scroll to top of page
	if (scrollDirection === "up") {
		scrollTo(0, 0);
		return;
	}
});

window.addEventListener("scroll", () => {
	// show down arrow if scrolling down
	if (scrollY > oldScrollPosition) {
		oldScrollPosition = scrollY;
		scrollDirection = "down";
		if (scrollY < 100 || scrollY > 1000) {
			navigate.style.display = "";
		} else {
			navigate.style.display = "inline-grid";
		}
		navicateIcon.classList.replace("fa-arrow-up", "fa-arrow-down");
	}
	// show up arrow if scrolling up
	if (scrollY < oldScrollPosition) {
		oldScrollPosition = scrollY;
		scrollDirection = "up";
		if (scrollY > 1639 || scrollY < 639) {
			navigate.style.display = "";
		} else {
			navigate.style.display = "inline-grid";
		}
		navicateIcon.classList.replace("fa-arrow-down", "fa-arrow-up");
	}
});

// store user selected theme in localStorage
window.addEventListener("DOMContentLoaded", () => {
	const theme = localStorage.getItem("theme");
	if (theme) {
		root.className = theme;
	} else {
		root.className = "light";
	}
});
