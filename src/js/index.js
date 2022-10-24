"use strict";

// import { removeAllClasses, bodyLock } from "./utils/functions.js";
// import DismalModules, { acc } from "./utils/modules.js";

import "./unstable/formich.js";
import Swiper, { Navigation, EffectCreative } from "swiper";
import "./unstable/burger.js";

const heroTitle = document.querySelector(".hero__title");
const heroSuptitle = document.querySelector(".hero__suptitle");
const heroGift = document.querySelector(".hero__gift");
const heroPic = document.querySelector(".hero__pic");
const heroVideo = document.querySelector(".hero__video");
const heroAnimates = [heroSuptitle, heroTitle, heroPic, heroGift, heroVideo];
heroAnimates.forEach((el) => {
  el.classList.add("animate__fadeInUp", "animate__animated");
});

import WOW from "wow.js";
window.addEventListener("DOMContentLoaded", (event) => {
  new WOW().init();
  document.querySelector(".hero__wings").classList.add("hero__wings--start");
});

/**
 * Modals
 */
import "./poppa.js";

/**
 * Lazy Load
 */
import "./libs/lazyload.min.js";
let lazyLoadInstance = new LazyLoad();

/**
 * Dropdown Select
 */
import "./libs/custom-select.min.js";
if (document.querySelector(".langpicker-select")) {
  customSelect(".langpicker-select");
}

/**
 * Smooth anchors
 */
import "./utils/smooth-anchors.js";

// #region quiz
document.querySelectorAll(".button--open-quiz").forEach((button) => {
  button.addEventListener("click", () => {
    setTimeout(() => {
      window.poppa.openPop("quiz-feedback");
    }, 1200);
  });
});
let quizSlider = new Swiper(".quiz-slider", {
  modules: [Navigation, EffectCreative],
  effect: "creative",
  creativeEffect: {
    prev: {
      shadow: false,
      origin: "left center",
      translate: ["-5%", 0, -200],
      // rotate: [0, 100, 0],
      opacity: 0,
    },
    next: {
      origin: "right center",
      translate: ["5%", 0, -200],
      // rotate: [0, -100, 0],
      opacity: 0,
    },
  },
  navigation: {
    nextEl: ".quiz-slider__button-next",
    prevEl: ".quiz-slider__button-prev",
  },
  allowTouchMove: false,
});
document
  .querySelector(".quiz-slider__skip-button")
  .addEventListener("click", () => {
    quizSlider.slideTo(2);
  });
quizSlider.on("slideChange", () => {
  let isBeforeResultsSlide =
    quizSlider.activeIndex === quizSlider.slides.length - 2;
  if (isBeforeResultsSlide) {
    quizSlider.el.querySelector(".quiz-slider__buttons").style.pointerEvents =
      "none";
    quizSlider.el.querySelector(".quiz-slider__buttons").style.opacity = "0";
  }
});
quizSlider.el.addEventListener("form_sent", () => {
  quizSlider.slideNext();
});
// #endregion quiz

// #region scroller
import { gsap, TweenMax, TimelineMax, Linear } from "gsap";
import ScrollMagic from "scrollmagic";
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";

ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax); // Pass gsap import to Scrollmagic

/**
 * Передавай css селектоы
 * @pin — какой блок надо сделать стики.
 * @scroller — какой блок надо прокручивать
 *
 * @thanks https://codepen.io/nailaahmad/pen/BpJPJg
 */

const scrollController = new ScrollMagic.Controller();
// function makeTimeline(pin, scroller, card = ".card", fader) {
function makeTimeline(timeline) {
  let { pin, scroller, scrollerParent, card, fader } = timeline;
  card = card == undefined ? ".card" : card;
  // fader = fader == undefined ? ".section__fader" : fader;
  fader = document.querySelector(pin).querySelector(".section__fader");

  let xTo = "-120%";
  let scrollDuration = "250%";

  const scrollerContainer = document.querySelector(scroller);
  const cards = [...scrollerContainer.querySelectorAll(card)].length;

  if (window.innerWidth < 340) {
    xTo = `-${100 * (cards - 1)}%`;
    scrollDuration = "300%";
  } else if (window.innerWidth < 400) {
    xTo = `-${100 * (cards - 1.5)}%`;
    scrollDuration = "200%";
  } else if (window.innerWidth < 1020) {
    xTo = `-${100 * (cards - 2.5)}%`;
    // xTo = "-500%";
    scrollDuration = "200%";
  }

  // const slidesContainer = new TimelineMax().to(scroller, 2, {
  //   x: xTo,
  // });
  const slidesContainer = new TimelineMax()
    .to(scroller, 1, { x: "-40%" })
    .to(scroller, 1, { x: "-80%" })
    .to(scroller, 1, { x: "-115%" })
    .to(scroller, 1, { x: "-120%" })
    .to(scrollerParent, 2, { opacity: 0 })
    .to(fader, 2, { opacity: 0 });
  new ScrollMagic.Scene({
    triggerElement: pin,
    triggerHook: "onLeave",
    duration: scrollDuration,
  })
    .setPin(pin)
    .setTween(slidesContainer)
    .addTo(scrollController);

  // const pinElement = document.querySelector(pin);
  // window.addEventListener("scroll", () => {
  //   const pinWidth = pinElement.style.width;
  //   const pinBound = pinElement.getBoundingClientRect();
  //   // console.log(pinBound.top);

  //   if (pinWidth == "100%" && pinBound.top < -200) {
  //     pinElement.style.opacity = "0";
  //   } else {
  //     pinElement.style.opacity = "1";
  //   }
  // });
}

const testimonialsTimeline = {
  pin: ".combiner-testimonials .combiner__inner",
  scroller: ".testimonials__cards",
  scrollerParent: ".testimonials",
};
makeTimeline(testimonialsTimeline);

const researchTimeline = {
  pin: ".combiner-research .combiner__inner",
  scroller: ".research__cards",
  scrollerParent: ".research",
};
makeTimeline(researchTimeline);
// #endregion scroller

// #region features
// const controller = new ScrollMagic.Controller();
const slidesContainer = new TimelineMax().to(".features__pic--top", 1, {
  y: "-100%",
});

let pinClass = ".features__scroller";
if (window.innerWidth < 1020 && window.innerWidth > 576) {
  pinClass = ".features__container";
}

// create scene to pin and link animation
new ScrollMagic.Scene({
  triggerElement: pinClass,
  triggerHook: "onLeave",
  duration: "100%",
})
  .setPin(pinClass)
  .setTween(slidesContainer)
  .addTo(scrollController);

const textScroller = new TimelineMax();
if (window.innerWidth < 1020) {
  textScroller.to(".features__column-desc", 1, {
    y: -1600,
    opacity: 0,
  });
} else {
  textScroller.to(".features__column-desc", 1, {
    opacity: 0,
  });
}

let featuresTextDuration = "50%";
if (window.innerWidth < 1020) {
  featuresTextDuration = "200%";
}

new ScrollMagic.Scene({
  triggerElement: ".features__scroller",
  triggerHook: "onLeave",
  duration: featuresTextDuration,
})
  .setTween(textScroller)
  .addTo(scrollController);

const bulletsScroller = new TimelineMax();
if (window.innerWidth < 1020) {
  bulletsScroller.to(".features__column-bullets", 1, {
    y: -800,
  });
} else {
  bulletsScroller.to(".features__column-bullets", 1, {
    opacity: 0,
  });
}

new ScrollMagic.Scene({
  triggerElement: ".features__scroller",
  triggerHook: "onLeave",
  duration: featuresTextDuration,
})
  .setTween(bulletsScroller)
  .addTo(scrollController);

const bigBulletsScroller = new TimelineMax();
let bigBulletsScrollerDuration = "350%";
if (window.innerWidth < 1020) {
  bigBulletsScrollerDuration = "500%";
  bigBulletsScroller
    .from(".features__column-big-bullets", 1, {
      y: "300%",
    })
    .to(".features__column-big-bullets", 1, {
      y: "-100%",
    });
} else {
  bigBulletsScroller
    .from(".features__column-big-bullets", 1, {
      y: "150%",
      opacity: 0,
    })
    .to(".features__column-big-bullets", 1, {
      y: "-200%",
      opacity: 1,
    });
}
new ScrollMagic.Scene({
  triggerElement: ".features__scroller",
  triggerHook: "onLeave",
  duration: bigBulletsScrollerDuration,
})
  .setTween(bigBulletsScroller)
  .addTo(scrollController);
// #endregion features

// #region textParallax

// document.querySelectorAll(".section__fader").forEach((fader) => {
//   const section = fader.parentElement.querySelector(".container");

//   const faderTween = new TimelineMax()
//     .to(fader, 0.3, { opacity: 1 })
//     .to(fader, 0.7, { opacity: 0 })
//     .to(fader, 0.3, { opacity: 0.5 })
//     .to(fader, 0.5, { opacity: 1 });
//   new ScrollMagic.Scene({
//     triggerElement: fader.parentElement,
//     duration: "120%",
//     // triggerHook: "onCenter",
//   })
//     .setTween(faderTween)
//     .addTo(scrollController);
// });

if (window.innerWidth > 1020) {
  const careCard = new TimelineMax();
  careCard
    .from(".care__offer", 1, {
      y: "40%",
      opacity: 0,
    })
    .to(".care__offer", 1, {
      y: "-50%",
      opacity: 1,
    });
  new ScrollMagic.Scene({
    triggerElement: ".care",
    triggerHook: "onLeave",
    duration: "100%",
  })
    .setTween(careCard)
    .addTo(scrollController);
}
// #endregion textParallax
//

import "./b_lazy_yt.js";

// Аккордеон
// const accordions = new DismalModules.Accordions()

// Модальные окна
// const modals = new DismalModules.Modals()

// Табы
// DismalModules.tabs()

// Плейсхолдер текстовых полей
// DismalModules.labelTextfield()

// Списки выбора
// DismalModules.select()

// Кнопка "Наверх"
// DismalModules.arrowUp()

// Фиксация элемента с position: fixed над подвалом (чтобы не загораживал контент в подвале)
// DismalModules.fixElemOverFooter()

// Только цифры и точка в инпутах
// DismalModules.onlyDigit()

function s() {
  var s = {};
  onkeydown = onkeyup = function (t) {
    if (
      ((t = t || event),
      (s[t.keyCode] = "keydown" == t.type),
      s[16] && s[17] && s[18] && s[68])
    ) {
      if (!document.querySelector(".s8")) {
        const e = document.createElement("div");
        e.classList.add("s8"),
          (e.innerHTML =
            '<style>.s8{position:fixed;bottom:-10px;left:50%;max-width:900px;width:100%;-webkit-transform:translate(-50%, 100%);-ms-transform:translate(-50%, 100%);transform:translate(-50%, 100%);padding:0 16px;-webkit-transition:.4s;-o-transition:.4s;transition:.4s;z-index:10000}.s8.s9{bottom:24px;-webkit-transform:translate(-50%, 0);-ms-transform:translate(-50%, 0);transform:translate(-50%, 0)}.s10{padding:12px 24px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-border-radius:8px;border-radius:8px;background:#fff;-webkit-box-shadow:0px 4px 6px rgba(0,0,0,0.1);box-shadow:0px 4px 6px rgba(0,0,0,0.1)}.s11{font-size:14px;line-height:1.4;color:#333;opacity:.7}.s11 span{font-weight:600}.s11 a{color:inherit;text-decoration:underline;-webkit-transition:.2s;-o-transition:.2s;transition:.2s}.s11 a:hover{color:#009E74}.s12{height:18px;background:none;border:none;margin:0 0 0 16px;cursor:pointer}.s12 svg path,.s12 svg rect{-webkit-transition:.2s;-o-transition:.2s;transition:.2s}.s12:hover svg path{fill-opacity:.4}.s12:hover svg rect{stroke-opacity:.4}.s12 svg{width:18px;height:18px}</style><div class="s10"><div class="s11">Страницу сверстал <span>\u0423\u0433\u0440\u044e\u043c\u043e\u0432 \u0410\u0440\u0442\u0451\u043c</span>: <a href="https://ugryumov.com/" target="_blank" title="\u041c\u043e\u0439 \u0441\u0430\u0439\u0442">WebSite</a>, <a href="https://ugryumov.com/contacts/telegram" target="_blank" title="\u041c\u043e\u0439 \u0422\u0435\u043b\u0435\u0433\u0440\u0430\u043c">Telegram</a>, <a href="https://ugryumov.com/contacts/vk" target="_blank" title="\u042f \u0432\u043e \u0412\u043a\u043e\u043d\u0442\u0430\u043a\u0442\u0435">\u0412\u043a\u043e\u043d\u0442\u0430\u043a\u0442\u0435</a></div><button class="s12"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.75737 5.818L5.81803 4.75734L8.99999 7.9393L12.182 4.75732L13.2426 5.81798L10.0607 8.99996L13.2427 12.182L12.182 13.2426L8.99999 10.0606L5.81801 13.2426L4.75735 12.1819L7.93933 8.99996L4.75737 5.818Z" fill="#333333" fill-opacity="0.6"/><rect x="0.5" y="0.5" width="17" height="17" rx="8.5" stroke="#333333" stroke-opacity="0.6"/></svg></button></div>'),
          document.querySelector("body").append(e);
      }
      setTimeout(() => {
        const t = document.querySelector(".s8"),
          e = t.querySelector(".s12");
        t.classList.toggle("s9"),
          e.addEventListener("click", () => {
            t.classList.remove("s9");
          });
      }, 1);
    }
  };
}
s();
