const WEBAPP_EVENT_TYPES = {
    click: "click",
    change: "change"
}

const WEBAPP_EVENT_TYPE_ATTRIBUTES = {
    click: "listenerOnClick",
    change: "listenerOnChange"
}

export function onElementClick(element, onClick) {

    onElementEvent(element, WEBAPP_EVENT_TYPES.click, onClick);

}

export function onElementChange(element, onChange) {

    onElementEvent(element, WEBAPP_EVENT_TYPES.change, onChange);

}

function onElementEvent(element, eventType, onEvent) {

    const eventTypeAttribute = WEBAPP_EVENT_TYPE_ATTRIBUTES[eventType];

    if (element && !element.hasAttribute(eventTypeAttribute)) {

        element.addEventListener(eventType, onEvent);

        element.setAttribute(eventTypeAttribute, "true");

    }


}

export function hasClickListener(element) {
    return hasEventListener(element, WEBAPP_EVENT_TYPES.click)
}

export function hasChangeListener(element) {
    return hasEventListener(element, WEBAPP_EVENT_TYPES.change)
}

function hasEventListener(element, eventType) {
    return element.getAttribute(WEBAPP_EVENT_TYPE_ATTRIBUTES[eventType]) === "true";
}