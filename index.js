import {
  router
} from "./routes.js";
const development = {
  staging: false,
  stagingHash: "#/internazionale",
  home: "#/nazionale",
};

document.addEventListener("DOMContentLoaded", (evt) => {
  router();


  window.addEventListener("hashchange", () => {
    router();

  });
});

window.location.hash =
  development.staging === true ? development.stagingHash : development.home;

const navIcon = document.querySelector(".menu_icon");
const nav = document.querySelector("nav");
const menu = nav.querySelector("ul");
const menuHide = () => {
  menu.classList.remove("ul_active");
  navIcon.classList.remove("menu_active");
}
const menuShow = () => {
  menu.classList.add("ul_active");
  navIcon.classList.add("menu_active");
}

navIcon.addEventListener("click", () => {
  if (navIcon.classList.contains("menu_active")) {
    menuHide()
  } else {
    menuShow()
  }
});

document.addEventListener("click", (evt) => {
  if (!navIcon.contains(event.target)) {
    menuHide()
  }
});

window.addEventListener("scroll", (evt) => {
  if (navIcon.classList.contains("menu_active")) {
    menuHide()
  }
});