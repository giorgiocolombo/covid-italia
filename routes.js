import * as Nazionale from "./nazionale.js";
import * as Regionale from "./regionale.js";
import * as Provinciale from "./provinciale.js";

const routers = [{
    name: "Nazionale",
    path: "/nazionale",
    template: Nazionale,
  },
  {
    name: "Regionale",
    path: "/regionale",
    template: Regionale,
  },
  {
    name: "Provinciale",
    path: "/provinciale",
    template: Provinciale,
  },
];

export const router = () => {
  const hash = window.location.hash.substring(1);
  const route = routers.find((r) => r.path === hash);

  if (typeof route !== "undefined") {
    document.querySelector("#app").innerHTML = route.template.html();
    setTimeout(route.template.afterRender);
  } else {
    document.querySelector("#app").innerHTML = /*html*/ `
      <h1>404</h1>
      <p>Content not found</p>
    `;
  }
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};