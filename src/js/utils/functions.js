/**
 * getCoords(elem) - получает координаты элемента, относительно страницы
 */
function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
}
/**
 * offsetPage(elem) - определение расстояния между элементом и верхней границей страницы
 */
function offsetPage(elem) {
    var rect = elem.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

/**
 * SVGToURL(value) - генератор svg в url формат
 */
function SVGToURL(value) {
    const notSpace = value.replace(/>\s+</g, '><');
    const notDoubleQuotes = notSpace.replace(/"/g, '\'');
    const notSharp = notDoubleQuotes.replace(/#/g, '%23');
    const notAngleLeft = notSharp.replace(/</g, '%3C');
    const notAngleRight = notAngleLeft.replace(/>/g, '%3E');
    const url = 'data:image/svg+xml,' + notAngleRight;

    return url;
}

/**
 * URLToSVG(value) - генератор svg в url формат
 */
function URLToSVG(value) {
  const pasteSpace = value.replace(/></g, '> <');
  const pasteDoubleQuotes = pasteSpace.replace(/'/g, '\"');
  const pasteSharp = pasteDoubleQuotes.replace(/%23/g, '#');
  const pasteAngleLeft = pasteSharp.replace(/%3C/g, '<');
  const pasteAngleRight = pasteAngleLeft.replace(/%3E/g, '>');
  const svg = pasteAngleRight.replace('data:image/svg+xml,', '');

  return svg;
}


/**
 * getCookie(name) - возвращает cookie с указанным именем
 * name - имя куки
 * Если ничего не будет найдено, вернет undefined
 */
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}


/*
 * Удаляет у всех элементов items класс itemClass
 * items - класс элементов или массив с переменными с селекторами, у которых нужно удалить класс.
 * itemsClass - класс, который нужно удалить. Указывается без точки
 *
 */
export function removeAllClasses(items, itemClass) {
  if (typeof items == "string") {
    items = document.querySelectorAll(items);
  }

  for (let i = 0; i < items.length; i++) {
    if (typeof itemClass === "object") {
      items[i].classList.remove(...itemClass);
    } else {
      items[i].classList.remove(itemClass);
    }
  }
}

// Создает Array из NodeList и возвращает его
export function nodeArray(selector, parent = document) {
  return Array.from(parent.querySelectorAll(selector));
}

// Получаем все соседние элементы
export function getSiblings(elem) {
  const siblings = [];
  let sibling = elem;

  while (sibling.previousSibling) {
    sibling = sibling.previousSibling;
    sibling.nodeType == 1 && siblings.push(sibling);
  }

  sibling = elem;
  while (sibling.nextSibling) {
    sibling = sibling.nextSibling;
    sibling.nodeType == 1 && siblings.push(sibling);
  }

  return siblings;
}

// Возвращает рандомное целое число включительно max
export function getRandomInt(min, max) {
  return (
    Math.floor(Math.random() * (Math.floor(max) + 1 - Math.ceil(min))) +
    Math.ceil(min)
  );
}

// Проверка поддержки webp, добавление класса webp или no-webp тегу body
export function isWebp() {
  // Проверка поддержки webp
  function testWebP(callback) {
    let webP = new Image();

    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };

    webP.src =
      "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  }

  testWebP(function (support) {
    let className = support === true ? "webp" : "no-webp";
    document.body.classList.add(className);
  });
}

// Вспомогательные модули блокировки прокрутки и резкого сдвига
export let bodyLockStatus = true;
export function bodyLockToggle(delay = 100) {
  if (document.documentElement.classList.contains("_lock")) {
    bodyUnlock(delay);
  } else {
    bodyLock(delay);
  }
}

// Разблокировать скролл
export function bodyUnlock(delay = 100) {
  let body = document.querySelector("body");

  if (bodyLockStatus) {
    let lockPadding = document.querySelectorAll("[data-lp]");

    setTimeout(() => {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];

        el.style.paddingRight = "0px";
      }

      body.style.paddingRight = "0px";
      document.documentElement.classList.remove("_lock");
    }, delay);

    bodyLockStatus = false;

    setTimeout(function () {
      bodyLockStatus = true;
    }, delay);
  }
}

// Заблокировать скролл
export function bodyLock(delay = 100) {
  let body = document.querySelector("body");

  if (bodyLockStatus) {
    let lock_padding = document.querySelectorAll("[data-lp]");

    for (let index = 0; index < lock_padding.length; index++) {
      const el = lock_padding[index];

      el.style.paddingRight =
        window.innerWidth -
        document.querySelector(".wrapper").offsetWidth +
        "px";
    }

    body.style.paddingRight =
      window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
    document.documentElement.classList.add("_lock");

    bodyLockStatus = false;

    setTimeout(function () {
      bodyLockStatus = true;
    }, delay);
  }
}

// Является ли устройство сенсорным
export const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

/**
 * mediaMax(value) - проверяет на максимальный размер экрана
 * Возвращает true если ширина экрана меньше value, false если нет.
 * ℹ️ Попробовать `window.innerWidth`
 */
function mediaMax(value) {
  return window.matchMedia(`(max-width: ${parseInt(value)}px)`).matches
}

/**
 * mediaMin(value) - проверяет на минимальный размер экрана
 * Возвращает true если ширина экрана больше value, false если нет.
 *
 */

function mediaMin(value) {
  return window.matchMedia(`(min-width: ${parseInt(value)}px)`).matches
}


/**
 * Загружает скрипт в DOM
 */
function loadScript(windowWidth, scriptPath) {
	if (window.innerWidth <= windowWidth) {
		const script = document.createElement('script')
		script.setAttribute('src', scriptPath)
		body.prepend(script)
	}
}
