import { bodyLock, bodyUnlock } from "../utils/functions.js";
const burger = document.querySelector(".burger");
const header = document.querySelector(".header");
const HEADER_OPENED_CLASS = "header--opened";

function openBurger() {
  header.classList.add(HEADER_OPENED_CLASS);
  bodyLock();
}
function closeBurger() {
  header.classList.remove(HEADER_OPENED_CLASS);
  bodyUnlock();
}

if (header && burger) {
  burger.addEventListener("click", () => {
    if (header.classList.contains(HEADER_OPENED_CLASS)) {
      closeBurger();
    } else {
      openBurger();
    }
  });
}
