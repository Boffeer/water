# Poppa

Окна сами получают нужную обертку и функционал, когда класс `Poppa` вызван хоть раз.
Окна открываются по хэшу в урле

## Окна

Оберни то, что должно стать всплывашкой в:
```html
<div class="poppa" id="your-modal-name">
	<!- Твой контент окна ->
</div>
```
`.poppa` при генерит кастомные js события на открытии и заркытии:
* `poppa-open`
* `poppa-close`

## Кнопки
По клику откроет окно, которое ты создал ранее. В атрибуте `data-poppa-open` укажи id попапа
Если поменять значение `data-poppa-open`, то будет открываться актуальное окно
```html
<button data-poppa-open="your-modal-name">Открыть окно</button>
```

По клику закроет окно, которое ты создал ранее. В атрибуте `data-poppa-open` укажи id попапа
Если поменять значение `data-poppa-close`, то будет открываться актуальное окно
```html
<button data-poppa-close="your-modal-name">Открыть окно</button>
```

## Методы

```js
window.Poppa.openPop(id)
```
```js
window.Poppa.closePop(id)
```

Создает с нуля окно с текстом `text` и убирает его после `removeAfter_ms`
```js
window.Poppa.makeInfoPop(text, removeAfter_ms)
```

Создает попап из `popupNode` и присваевает ему опиональный `id`.
```js
window.Poppa.makePopup(popupNode, id)
```

Заставляет `buttonNode` по клику открывать окно с id === `popupId`
```js
window.Poppa.makeOpenerButton(buttonNode, popupId)
```
