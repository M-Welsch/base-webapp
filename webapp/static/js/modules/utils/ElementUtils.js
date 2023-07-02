const CLICK_ACTION = "click";
const CHANGE_ACTION = "change";

export function onElementClick(element, onClick) {

    onElementAction(element, CLICK_ACTION, onClick);

}

export function onElementChange(element, onChange) {

    onElementAction(element, CHANGE_ACTION, onChange);

}

function onElementAction(element, actionType, onAction) {
    
    if (element) {

        element.addEventListener(actionType, onAction);

    }
}