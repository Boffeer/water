"use strict";

// Закрытие модального окна при клике по заднему фону
function closeWhenClickingOnBg(itemArray, itemParent, classShow = "_show") {
  document.addEventListener("click", (e) => {
    let itemElems = document.querySelectorAll(itemArray);

    for (let i = 0; i < itemElems.length; i++) {
      const item = itemElems[i];

      const target = e.target,
        itsItem = target == item || item.contains(target),
        itemIsShow = item.classList.contains(classShow);

      if (itemParent) {
        const itsItemParent =
            target == itemParent || itemParent.contains(target),
          itemParentIsShow = itemParent.classList.contains(classShow);

        if (!itsItem && itsItemParent && itemParentIsShow) {
          itemParent.classList.remove(classShow);

          if (document.body.classList.contains("_lock")) {
            bodyLock(false);
          }

          if (window.location.hash === "#" + itemParent.getAttribute("id")) {
            resetHash();
          }
        }
      } else {
        if (!itsItem && itemIsShow) {
          item.classList.remove(classShow);
          if (document.body.classList.contains("_lock")) {
            bodyLock(false);
          }

          if (window.location.hash === "#" + itemParent.getAttribute("id")) {
            resetHash();
          }
        }
      }
    }
  });
}

class Poppa {
  constructor() {
    this.initPopups();
    this.initButtons();

    document.addEventListener("keydown", (e) => {
      const id = this.getLastOpenedId();
      if (e.key === "Escape" && id) {
        console.log(id);
        this.closePop(id);
        // modal.classList.remove("_show");
        // bodyLock(false);
        // resetHash();
      }
    });

    this.openPoppaHash();
  }

  instances = [];
  getPopupsStorage() {
    return document.querySelector(".poppa__storage");
  }

  bodyLock(con) {
    /**
     * Фиксирует скрол у body
     *  */
    let scrollFix = window.innerWidth - document.body.clientWidth;
    const DEFAULT_SCROLLBAR_WIDTH = 17;
    if (con === true) {
      // scrollFix предотвращает скачки верстки в строну при блокировке скролла
      scrollFix =
        scrollFix > DEFAULT_SCROLLBAR_WIDTH
          ? DEFAULT_SCROLLBAR_WIDTH
          : scrollFix;
      document.body.style.paddingRight = `${scrollFix}px`;
      document.body.classList.add("_lock");
    } else if (con === false) {
      document.body.classList.remove("_lock");
    } else if (con === undefined) {
      if (!document.body.classList.contains("_lock")) {
        document.body.classList.add("_lock");
      } else {
        document.body.classList.remove("_lock");
      }
    } else {
      console.error("Неопределенный аргумент у функции bodyLock()");
    }
  }

  initPopups() {
    const popups = document.querySelectorAll(".poppa");
    const popupsStorage = document.createElement("div");

    popupsStorage.classList.add("poppa__storage");
    document.body.append(popupsStorage);

    popups.forEach((poppa) => this.makePopupWrapper(poppa));

    window.addEventListener("click", (e) => {
      if (e.target.classList.contains("poppa__aligner")) {
        this.closePop(e.target.querySelector(".poppa").id);
      }
    });
  }

  makePopup(popup, id = new Date().getTime()) {
    popup.id = `p-${id}`;
    this.makePopupWrapper(popup);
  }
  makeOpenerButton(button, id) {
    button.dataset.poppaOpen = id;
    button.addEventListener("click", () => {
      this.handleOpen(button);
    });
  }

  makePopupWrapper(poppa) {
    let { id } = poppa;

    const overlay = document.createElement("div");
    overlay.classList.add("poppa__overlay");
    overlay.classList.add(`poppa__overlay--${id}`);
    overlay.dataset.poppaName = id;

    const aligner = document.createElement("div");
    aligner.classList.add("poppa__aligner");

    const closer = document.createElement("button");
    closer.classList.add("poppa__closer");
    closer.innerText = "Закрыть";
    closer.dataset.poppaClose = id;
    const handleClose = () => {
      this.handleClose(closer);
    };
    closer.addEventListener("click", handleClose);
    // TODO: Сделай накидывание нужных ариа атрибутов

    document.querySelector(".poppa__storage").append(overlay);
    aligner.append(poppa);
    overlay.append(aligner);
    overlay.append(closer);

    this.instances.push(overlay);
  }

  initButtons() {
    const openButtons = document.querySelectorAll("[data-poppa-open]");
    openButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.handleOpen(button);
      });
    });

    const closeButtons = document.querySelectorAll("[data-poppa-close]");
    closeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.handleClose(button);
      });
    });
  }

  handleOpen(button) {
    const id = button.dataset.poppaOpen;
    const poppa = document.querySelector(`#${id}`);
    if (poppa) {
      this.openPop(id);
    } else {
      this.makeInfoPop(`Попапа "#${id}" нет. Проверь айди`);
    }
  }
  openPop(id) {
    const pop = this.getPop(id);
    this.getPopupsStorage().append(pop);
    setTimeout(() => {
      pop.classList.add("_show");
    });
    window.location.hash = id;
    const event = new Event("poppa-open");
    pop.dispatchEvent(event);
    pop.querySelector(".poppa").dispatchEvent(event);
    this.bodyLock(true);
  }

  handleClose(button) {
    const id = button.dataset.poppaClose;
    const poppa = document.querySelector(`#${id}`);
    if (poppa) {
      this.closePop(id);
    } else {
      this.makeInfoPop(`Попапа "#${id}" нет. Проверь айди`);
    }
  }

  closePop(id) {
    const pop = this.getPop(id);
    if (pop.classList.contains("_show")) {
      pop.classList.remove("_show");
    }
    this.resetHash();
    const event = new Event("poppa-close");
    pop.dispatchEvent(event);
    pop.querySelector(".poppa").dispatchEvent(event);
    this.bodyLock(false);
  }

  makeInfoPop(text, removeAfter = 6000) {
    const info = document.createElement("div");
    const id = "pop-" + new Date().getTime();
    info.classList.add("poppa");
    info.classList.add("poppa--invalid");
    info.innerHTML = text;
    info.id = id;

    document.body.append(info);

    this.makePopupWrapper(info);
    this.openPop(id);

    setTimeout(() => {
      this.getPop(id).remove();
    }, removeAfter);
  }

  getPop(id) {
    return document.querySelector(`[data-poppa-name="${id}"]`);
  }
  getTotalPopups() {
    return document.querySelectorAll(`[data-poppa-name]`);
  }

  getLastOpenedId() {
    // let storage = this.getPopupsStorage();
    // storage = Array.from(storage.children);
    // return storage[storage.length - 1].dataset.poppaName;
    const opened = [...document.querySelectorAll("._show[data-poppa-name]")];
    return opened.length == 0
      ? false
      : opened[opened.length - 1].dataset.poppaName;
  }

  openPoppaHash() {
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      const poppa = document.querySelector(`.poppa#${hash}`);
      if (poppa) {
        this.openPop(hash);
      }
    }
  }
  resetHash() {
    const windowTop = window.pageYOffset;
    window.location.hash = "";
    window.scrollTo(0, windowTop);
  }
}

const b_Poppa = new Poppa();
window.poppa = b_Poppa;
