const WEBAPP_EVENT_TYPES = {
    click: "click",
    change: "change"
}

export function onElementClick(element, onClick) {

    onElementEvent(element, WEBAPP_EVENT_TYPES.click, onClick);

}

export function onElementChange(element, onChange) {

    onElementEvent(element, WEBAPP_EVENT_TYPES.change, onChange);

}

function onElementEvent(element, eventType, onEvent) {

    if (element) {

        element.addEventListener(eventType, onEvent);

    }
}