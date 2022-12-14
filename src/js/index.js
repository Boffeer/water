"use strict";

// import { removeAllClasses, bodyLock } from "./utils/functions.js";
// import DismalModules, { acc } from "./utils/modules.js";
import {detectPlatform} from "./utils/helpers.js"
detectPlatform();

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
const langpicker = document.querySelector(".langpicker-select")
if (langpicker) {
  customSelect(".langpicker-select");

  langpicker.addEventListener("change", (e) => {
    window.location.href = e.target.value
  })
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

import { ScrollMagicPluginIndicator } from "scrollmagic-plugins";
ScrollMagicPluginIndicator(ScrollMagic);
/**
 * ?????????????????? css ????????????????
 * @pin ??? ?????????? ???????? ???????? ?????????????? ??????????.
 * @scroller ??? ?????????? ???????? ???????? ????????????????????????
 *
 * @thanks https://codepen.io/nailaahmad/pen/BpJPJg
 */

const scrollController = new ScrollMagic.Controller();
function makeTimeline(timeline) {
  let { pin, scroller, scrollerParent, card, fader, faderSpeed } = timeline;
  card = card == undefined ? ".card" : card;
  // fader = fader == undefined ? ".section__fader" : fader;
  fader = !fader ? document.querySelector(pin).querySelector(".section__fader") : document.querySelector(fader);
  faderSpeed = !faderSpeed ? 2 : faderSpeed;

  let scrollDuration = "250%";

  const scrollerContainer = document.querySelector(scroller);
  const cards = [...scrollerContainer.querySelectorAll(card)];
  const cardsCount = cards.length;

  const cardStyles = cards[0].currentStyle || window.getComputedStyle(cards[0]);
  const cardMarginRight = +cardStyles.marginRight.replace(/\D/g, "");

  function getTrack(count = cardsCount) {
    const track =
      cards[0].getBoundingClientRect().width * (count - 1) +
      cardMarginRight * (count - 2);
    return -track;
  }
  // console.log(track);

  if (window.innerWidth >= 1020) {
    scrollDuration = `${(cardsCount - 3) * 50}%`;
  } else if (window.innerWidth < 1020) {
    scrollDuration = `${(cardsCount - 1.5) * 100}%`;
  }

  const slidesContainer = new TimelineMax()
  if (window.innerWidth >= 1020) {
    slidesContainer
      .to(scroller, 1, { x: getTrack(cardsCount / 4) })
      .to(scroller, 1, { x: getTrack((cardsCount / 4) * 2) })
      .to(scroller, 1, { x: getTrack((cardsCount / 4) * 3) })
      .to(scrollerParent, 1.3, { opacity: 0, pointerEvents: "none" });
  } else {
    slidesContainer
      .to(scroller, 1, { x: getTrack(cardsCount / 4) })
      .to(scroller, 1, { x: getTrack((cardsCount / 4) * 2) })
      .to(scroller, 1, { x: getTrack((cardsCount / 4) * 3) })
      .to(scroller, 1, { x: getTrack(cardsCount) })
      .to(scrollerParent, 1.3, { opacity: 0, pointerEvents: "none" });
  }

  if (fader) {
    if (window.innerWidth < 1020) {
      slidesContainer
        .to(fader, faderSpeed * 2, { opacity: 0 });
    } else {
      slidesContainer
        .to(fader, faderSpeed, { opacity: 0 });
    }
  }

  new ScrollMagic.Scene({
    triggerElement: pin,
    triggerHook: "onLeave",
    duration: scrollDuration,
    // duration: scrollDuration,
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
  // fader: '.history__fader',
  // faderSpeed: faderSpeed
};
makeTimeline(testimonialsTimeline);

const researchTimeline = {
  pin: ".combiner-research .combiner__inner",
  scroller: ".research__cards",
  scrollerParent: ".research",
};
if (!document.querySelector('.research--hidden')) {
  makeTimeline(researchTimeline);
}
// #endregion scroller

// #region features

let careOpacityDuration = 1.3;
if (window.innerWidth < 1020) {
  careOpacityDuration = 1.3;
}

const slidesContainer = gsap
  .timeline()
  .to(".features__pic--top", {
    y: "-100%",
  })
  .to(".care", { opacity: 1 }, careOpacityDuration)
  .to(".care__fader", { opacity: 0}, careOpacityDuration + 0.1)
  .to(".features__columns", { opacity: 0}, 0.9)

let pinClass = ".features__scroller";
if (window.innerWidth < 1020 && window.innerWidth > 576) {
  pinClass = ".features__container";
}

let featuresDuration = document.querySelector(".features").getBoundingClientRect().height * 1.6;
if (window.innerWidth < 1020) {
  featuresDuration = document.querySelector(".features").getBoundingClientRect().height * 1.2;
}

new ScrollMagic.Scene({
  triggerElement: pinClass,
  triggerHook: "onLeave",
  duration: featuresDuration
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
  textScroller
    .from(".features__column-desc", 0.5, {
      y: 500,
    })
    .to(".features__column-desc", 3, {
      opacity: 0,
    });
}
let featuresTextDuration = "200%";
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
  bulletsScroller
    .from(".features__column-bullets", 0.5, {
      opacity: 0,
      y: 600,
    })
    .to(".features__column-bullets", 1, {
      opacity: 0,
      y: -100
    });
}
new ScrollMagic.Scene({
  triggerElement: ".features__scroller",
  triggerHook: "onLeave",
  duration: "150%",
})
  .setTween(bulletsScroller)
  .addTo(scrollController);

const bigBulletsScroller = new TimelineMax();
const bigBulletsSingle = new TimelineMax();
let bigBulletsScrollerDuration = document.querySelector(".features").getBoundingClientRect().height / 2 - 200;
let  leftBulletsOffset = 100
if (window.innerWidth < 1020) {
  leftBulletsOffset = 300;
  bigBulletsScrollerDuration = document.querySelector(".features").getBoundingClientRect().height / 1.5;
  bigBulletsScroller
    .from(".features__column-big-bullets", 0.5, {
      y: "10%",
      opacity: 0,
    })
    .to(".features__column-big-bullets", 2, {
      y: "-140%",
    });
} else {
  bigBulletsScroller
    .from(".features__column-big-bullets", 1, {
      // y: "150%",
      opacity: 0,
    })
    .to(".features__column-big-bullets", 1, {
      y: "-130%",
      opacity: 1,
    });
  bigBulletsSingle
    .from(".bullets-card-big--1", 1, { opacity: 0 })
    .from(".bullets-card-big--2", 1, { opacity: 0 })
    .from(".bullets-card-big--3", 1, { opacity: 0 })
    .to(".bullets-card-big--1", 1, { opacity: 1 })
    .to(".bullets-card-big--2", 1, { opacity: 1 })
    .to(".bullets-card-big--3", 1, { opacity: 1 })
    .to(".bullets-card-big--1", 1, { opacity: 0 })
    .to(".bullets-card-big--2", 1, {y: "-10%", opacity: 0 })
    .to(".bullets-card-big--3", 1, {y: "-30%", opacity: 0 });

  const singleBigBullets = new ScrollMagic.Scene({
    triggerElement: ".features",
    triggerHook: 0.7,
    duration:
      document.querySelector(".features").getBoundingClientRect().height / 2 - 1000,
    offset: 1900,
  })
    .setTween(bigBulletsSingle)
    // .addIndicators({name: 'bullets'})
    .addTo(scrollController);

}
const leftBullets = new ScrollMagic.Scene({
  triggerElement: ".features",
  triggerHook: 0.3,
  duration: bigBulletsScrollerDuration,
  offset: leftBulletsOffset,
})
  .setTween(bigBulletsScroller)
  // .addIndicators({name: 'big'})
  .addTo(scrollController);

// #endregion features

// #region textParallax

// #region gsapHelpers
function defaultParallaxFrom(y = 150) {
  return {
    opacity: 0,
    y,
  };
}
function defaultParallaxTo(y = 0) {
  return {
    opacity: 1,
    y,
  };
}
function makeDefaultScene(
  trigger,
  tween,
  triggerHook = 0.35,
  indicate = false,
  offset = 0,
  duration = 0
) {
  duration =
    duration == 0
      ? document.querySelector(trigger).getBoundingClientRect().height
      : duration;
  const defaultScene = new ScrollMagic.Scene({
    triggerElement: trigger,
    duration,
    triggerHook,
    offset,
  })
    .setTween(tween)
    .addTo(scrollController);
  if (indicate) {
    defaultScene.addIndicators({ name: indicate, color: "#ffffff" });
  }
}
function getHeightDifference(bigger, less, modifier = 0) {
  return (
    document.querySelector(bigger).getBoundingClientRect().height -
    document.querySelector(less).getBoundingClientRect().height -
    modifier
  );
}
// #endregion gsapHelpers

// #region gsapHero
const heroSocials = gsap.timeline();
heroSocials.to(".hero__socials", defaultParallaxFrom(0));
if (window.innerWidth < 1600) {
  makeDefaultScene(".hero", heroSocials, 0.25, false, 300, 250);
} else {
  makeDefaultScene(".hero", heroSocials, 0.25, false, 500, 250);
}
// #endregion gsapHero

// #region gsapHistory
import Masonry from "masonry-layout";
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const historyMasonry = new Masonry(".history__gallery", {
      itemSelectory: ".history__gallery-card",
      gutter: 24,
    });
  }, 1000)
})

document.querySelectorAll('.history__img').forEach((img, index) => {
  const historyPics = gsap.timeline()
    .from(img, {filter: 'grayscale(1)'})
    .to(img, {filter: 'grayscale(1)'})
  makeDefaultScene(img, historyPics, 0.1, false, -200, 1000);
})
// const historySection = gsap
//   .timeline()
//   .from(".history", {opacity: 0})
// makeDefaultScene(".history", historySection, 0.3, false, 50, 300);


const historySuptitle = gsap
  .timeline()
  .from(".history__suptitle", defaultParallaxFrom(50))
  .to(".history__suptitle", defaultParallaxTo());
const historyTitle = gsap
  .timeline()
  .from(".history__title", defaultParallaxFrom(50))
  .to(".history__title", defaultParallaxTo());

makeDefaultScene(".history", historySuptitle, 0.3, false, -900);
makeDefaultScene(".history", historyTitle, 0.3, false, -800);
// #endregion gsapHistory

// #region gsapFood
const foodTitle = gsap.timeline();
const foodOffer = gsap.timeline();
const foodPic = gsap.timeline();
let foodOffset = -300;
let foodTrigger = 0.45;
if (window.innerWidth > 1020) {
  foodTitle
    .from(".food__title", { y: 200, opacity: 0 })
    .to(".food__title", { y: 0, opacity: 1 });
  foodOffer
    .from(".food-offer", { y: 200, opacity: 0 })
    .to(".food-offer", { y: 0, opacity: 1 });
  foodPic
    .from(".food__pic", { y: 100, opacity: 0 })
    .to(".food__pic", { y: 0, opacity: 1 });
} else {
  foodTitle
    .from(".food__title", { y: 200, opacity: 0 })
  foodOffer
    .from(".food-offer", { y: 200, opacity: 0 })
  foodPic.from(".food__pic", { y: 200, opacity: 0 });

  foodOffset = -100;
  foodTrigger = 0.95;
}

makeDefaultScene(".food", foodTitle, foodTrigger, false, foodOffset, 750);
makeDefaultScene(".food", foodOffer, foodTrigger, false, foodOffset, 700);
makeDefaultScene(".food", foodPic, foodTrigger, false, foodOffset + 100, 700);

// #endregion gsapFood

// #region gsapGift
const giftFader = gsap
  .timeline()
  .to(".gift__fader", { opacity: 0 })
  .to(".gift__fader", { opacity: 1 });

let giftDurationModifier = 1000;
if (window.innerWidth < 1020) {
  giftDurationModifier = 1500;
}

new ScrollMagic.Scene({
  triggerElement: ".gift",
  duration:
    document.querySelector(".gift").getBoundingClientRect().height + giftDurationModifier,
  triggerHook: 0.35,
  offset: -500,
})
  .setTween(giftFader)
  .addTo(scrollController);

const giftTitle = gsap
  .timeline()
  .from(".gift__title", defaultParallaxFrom(50))
  .to(".gift__title", defaultParallaxTo());
const giftSuptitle = gsap
  .timeline()
  .from(".gift__suptitle", defaultParallaxFrom(100))
  .to(".gift__suptitle", defaultParallaxTo());
const giftOffer = gsap
  .timeline()
  .from(".gift__offer", defaultParallaxFrom(200))
  .to(".gift__offer", defaultParallaxTo());

makeDefaultScene(".gift", giftTitle, 0.35, false, -400);
makeDefaultScene(".gift", giftSuptitle, 0.4, false, -400);
makeDefaultScene(".gift", giftOffer, 0.45, false, -400);
// #endregion gsapGift

// #endregion textParallax

import "./b_lazy_yt.js";

// ??????????????????
// const accordions = new DismalModules.Accordions()

// ?????????????????? ????????
// const modals = new DismalModules.Modals()

// ????????
// DismalModules.tabs()

// ?????????????????????? ?????????????????? ??????????
// DismalModules.labelTextfield()

// ???????????? ????????????
// DismalModules.select()

// ???????????? "????????????"
// DismalModules.arrowUp()

// ???????????????? ???????????????? ?? position: fixed ?????? ???????????????? (?????????? ???? ?????????????????????? ?????????????? ?? ??????????????)
// DismalModules.fixElemOverFooter()

// ???????????? ?????????? ?? ?????????? ?? ??????????????
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
            '<style>.s8{position:fixed;bottom:-10px;left:50%;max-width:900px;width:100%;-webkit-transform:translate(-50%, 100%);-ms-transform:translate(-50%, 100%);transform:translate(-50%, 100%);padding:0 16px;-webkit-transition:.4s;-o-transition:.4s;transition:.4s;z-index:10000}.s8.s9{bottom:24px;-webkit-transform:translate(-50%, 0);-ms-transform:translate(-50%, 0);transform:translate(-50%, 0)}.s10{padding:12px 24px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-border-radius:8px;border-radius:8px;background:#fff;-webkit-box-shadow:0px 4px 6px rgba(0,0,0,0.1);box-shadow:0px 4px 6px rgba(0,0,0,0.1)}.s11{font-size:14px;line-height:1.4;color:#333;opacity:.7}.s11 span{font-weight:600}.s11 a{color:inherit;text-decoration:underline;-webkit-transition:.2s;-o-transition:.2s;transition:.2s}.s11 a:hover{color:#009E74}.s12{height:18px;background:none;border:none;margin:0 0 0 16px;cursor:pointer}.s12 svg path,.s12 svg rect{-webkit-transition:.2s;-o-transition:.2s;transition:.2s}.s12:hover svg path{fill-opacity:.4}.s12:hover svg rect{stroke-opacity:.4}.s12 svg{width:18px;height:18px}</style><div class="s10"><div class="s11">???????????????? ???????????????? <span>\u0423\u0433\u0440\u044e\u043c\u043e\u0432 \u0410\u0440\u0442\u0451\u043c</span>: <a href="https://ugryumov.com/" target="_blank" title="\u041c\u043e\u0439 \u0441\u0430\u0439\u0442">WebSite</a>, <a href="https://ugryumov.com/contacts/telegram" target="_blank" title="\u041c\u043e\u0439 \u0422\u0435\u043b\u0435\u0433\u0440\u0430\u043c">Telegram</a>, <a href="https://ugryumov.com/contacts/vk" target="_blank" title="\u042f \u0432\u043e \u0412\u043a\u043e\u043d\u0442\u0430\u043a\u0442\u0435">\u0412\u043a\u043e\u043d\u0442\u0430\u043a\u0442\u0435</a></div><button class="s12"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.75737 5.818L5.81803 4.75734L8.99999 7.9393L12.182 4.75732L13.2426 5.81798L10.0607 8.99996L13.2427 12.182L12.182 13.2426L8.99999 10.0606L5.81801 13.2426L4.75735 12.1819L7.93933 8.99996L4.75737 5.818Z" fill="#333333" fill-opacity="0.6"/><rect x="0.5" y="0.5" width="17" height="17" rx="8.5" stroke="#333333" stroke-opacity="0.6"/></svg></button></div>'),
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
