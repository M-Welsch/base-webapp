import { backup_icon, dock_icon, mount_icon, power_icon } from "./icons.js";

const status_complete_opacity = "100%";
const status_partial_opacity = "30%";
const status_types = {
    "docked": dock_icon,
    "powered": power_icon,
    "mounted": mount_icon,
    "backup_running": backup_icon
}

export function setStatus(current_status) {

    for (const [status, status_element] of Object.entries(status_types)) {

        if (current_status[status]) {

            setStatusComplete(status_element);

        } else {

            setStatusPartial(status_element);

        }

    }

}

export function setStatusComplete(status_element) {

    setStatusOpacity(status_element, status_complete_opacity);

}

export function setStatusPartial(status_element) {

    setStatusOpacity(status_element, status_partial_opacity);

}

function setStatusOpacity(status_element, status_opacity) {
    
    status_element.style.opacity = status_opacity;

}