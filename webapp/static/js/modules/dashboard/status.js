import { backup_icon, dock_icon, mount_icon, power_icon } from "./icons.js";

export const docked_status = "docked";
export const powered_status = "powered";
export const mounted_status = "mounted";
export const backup_running_status = "backup_running";

export const status_types = {
    [docked_status]: dock_icon,
    [powered_status]: power_icon,
    [mounted_status]: mount_icon,
    [backup_running_status]: backup_icon
}

export const status_complete_opacity = "1";
export const status_partial_opacity = "0.3";

export function setStatus(current_status, status, status_element) {

    if (current_status[status]) {

        setStatusComplete(status_element);

    } else {

        setStatusPartial(status_element);

    }

}

function setStatusComplete(status_element) {

    setStatusOpacity(status_element, status_complete_opacity);

}

function setStatusPartial(status_element) {

    setStatusOpacity(status_element, status_partial_opacity);

}

function setStatusOpacity(status_element, status_opacity) {

    status_element.style.opacity = status_opacity;

}