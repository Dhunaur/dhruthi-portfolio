// PAGE TRANSITION — REVEAL ON LOAD

document.addEventListener("DOMContentLoaded", () => {

  const overlay = document.querySelector(".page-transition");

  if(overlay){

    requestAnimationFrame(() => {
      overlay.classList.add("reveal");
    });

    setTimeout(() => {
      overlay.classList.remove("reveal");
      overlay.classList.remove("cover");
    }, 550);

  }

  document.body.classList.remove("is-loading");

});


// BLEND-MODE CURSOR

const cursor = document.querySelector(".cursor");

if(cursor){

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  const hoverItems = document.querySelectorAll(
    "a, .big-word, .current-list div, .work-card, .other-card, button"
  );

  hoverItems.forEach((item) => {

    item.addEventListener("mouseenter", () => {
      cursor.classList.add("grow");
    });

    item.addEventListener("mouseleave", () => {
      cursor.classList.remove("grow");
    });

  });

}


// SCROLL REVEAL

const sections = document.querySelectorAll(".panel, .reveal");

const observer = new IntersectionObserver(

(entries) => {

  entries.forEach((entry) => {

    if(entry.isIntersecting){

      entry.target.classList.add("show");

    }

  });

},

{
  threshold:0.15
}

);

sections.forEach(section => {

  section.classList.add("hidden");

  observer.observe(section);

});


// ACTIVE NAVIGATION (highlights current page)

const navLinks = document.querySelectorAll("nav a");
const currentPage = window.location.pathname.split("/").pop() || "index.html";

navLinks.forEach(link => {

  const href = link.getAttribute("href");

  if(href && !href.startsWith("#") && href === currentPage){
    link.classList.add("active");
  }

});


// MOBILE NAV TOGGLE

const toggle = document.querySelector(".nav-toggle");
const navList = document.querySelector("nav ul");

if(toggle && navList){

  toggle.addEventListener("click", () => {
    navList.classList.toggle("open");
  });

  navList.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navList.classList.remove("open");
    });
  });

}


// PARALLAX HERO (home page only)

const hero = document.querySelector(".hero");

if(hero){

  window.addEventListener("scroll", () => {

    const scroll = window.scrollY;

    hero.style.transform = `translateY(${scroll * 0.15}px)`;

  });

}


// PAGE TRANSITION ON LINK CLICK (slide cover before navigating away)

const overlayEl = document.querySelector(".page-transition");

const pageLinks = document.querySelectorAll(
  "a:not([href^='#']):not([href^='mailto']):not([target='_blank'])"
);

pageLinks.forEach(link => {

  link.addEventListener("click", (e) => {

    const href = link.getAttribute("href");

    if(!href || href === "" || href === "#") return;

    // external links — open in new tab, no transition
    if(href.startsWith("http") || href.startsWith("www")){
      e.preventDefault();
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }

    e.preventDefault();

    if(overlayEl){

      overlayEl.classList.add("cover");

      setTimeout(() => {
        window.location.href = href;
      }, 450);

    } else {

      window.location.href = href;

    }

  });

});