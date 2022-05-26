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
const navLabelEls = document.querySelectorAll(".nav-content span");
const allDivsInNav = document.querySelectorAll(".nav-content > div");

const openNav = () => {
	navEl.classList.add("show-nav", "fade-in");
	navContentEl.classList.add("slide-in");
	// Hide the scrollbar
	setTimeout(() => {
		document.body.style.overflow = "hidden";
	}, 1001);
};

// open nav with animation when menu icon clicked
openMenuEl.addEventListener("click", openNav);

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

closeMenuEl.addEventListener("click", closeNav);

navEl.addEventListener("click", closeNav);
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

// handlers for tablets
const openTabletNav = () => {
	navEl.classList.add("show-tablet-nav");
	// navContentEl.classList.add("slide-in");
	navContentEl.classList.add("show-tablet-nav-content");
	closeMenuEl.style.display = "initial";
	navLabelEls.forEach(el => {
		el.style.display = "initial";
	});
	allDivsInNav.forEach(el => {
		el.classList.add("place-contents");
	});
	// Hide the scrollbar
	document.body.style.overflow = "hidden";
};
const closeTabletNav = () => {
	// navContentEl.classList.add("slide-out");
	// navEl.classList.add("nav-bg-color", "fade-out");
	navEl.classList.remove("show-tablet-nav");
	navContentEl.classList.remove("show-tablet-nav-content");
	closeMenuEl.style.display = "";
	navLabelEls.forEach(el => {
		el.style.display = "";
	});
	allDivsInNav.forEach(el => {
		el.classList.remove("place-contents");
	});
	setTimeout(() => {
		// navEl.classList.remove("show-nav", "nav-bg-color", "fade-in", "fade-out");
		// navContentEl.classList.remove("slide-in", "slide-out");
		// Show the scrollbar
		document.body.style.overflow = "";
	}, 1001);
};

// listen for when screen width is atleast 768px
const tabletSizeQuery = matchMedia("(max-width:1536px) and (min-width:768px)");
console.log(tabletSizeQuery); // WILL CHECK SCREEN SIZE ON PAGE LOAD

const changeNavStyles = e => {
	if (e.matches) {
		openMenuEl.removeEventListener("click", openNav);
		closeMenuEl.removeEventListener("click", closeNav);
		navEl.removeEventListener("click", closeNav);

		openMenuEl.addEventListener("click", openTabletNav);
		closeMenuEl.addEventListener("click", closeTabletNav);
		navEl.addEventListener("click", closeTabletNav);
	} else {
		openMenuEl.addEventListener("click", openNav);
		closeMenuEl.addEventListener("click", closeNav);
		navEl.addEventListener("click", closeNav);
	}
};
tabletSizeQuery.addEventListener("change", changeNavStyles);

// store user selected theme in localStorage
window.addEventListener("load", () => {
	const theme = localStorage.getItem("theme");
	if (theme) {
		root.className = theme;
	} else {
		root.className = "light";
	}
	if (tabletSizeQuery.matches) {
		changeNavStyles(tabletSizeQuery);
	}
});
