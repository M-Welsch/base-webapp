import { setStatus, docked_status, mounted_status, status_complete_opacity, status_partial_opacity, powered_status, backup_running_status } from "../../../../../modules/dashboard/status.js";

describe('Status', function () {

    let dock_icon = getIconMock();
    let mount_icon = getIconMock();
    let power_icon = getIconMock();
    let backup_running_icon = getIconMock();
    let current_status = getCurrentStatusMock()

    describe('Set docked status', function () {

        it('should show the dock_icon as complete', function () {
            setStatus(current_status, docked_status, dock_icon);
            expect(dock_icon.style.opacity).toEqual(status_complete_opacity);
        });

    });

    describe('Set mounted status', function () {

        it('should show the mount_icon as partial', function () {
            setStatus(current_status, mounted_status, mount_icon);
            expect(mount_icon.style.opacity).toEqual(status_partial_opacity);
        });

    });

    describe('Set powered status', function () {

        it('should show the power_icon as partial', function () {
            setStatus(current_status, mounted_status, power_icon);
            expect(power_icon.style.opacity).toEqual(status_partial_opacity);
        });

    });

    describe('Set backup running status', function () {

        it('should show the backup_running_icon as partial', function () {
            setStatus(current_status, mounted_status, backup_running_icon);
            expect(backup_running_icon.style.opacity).toEqual(status_partial_opacity);
        });

    });
});

function getCurrentStatusMock() {
    return {
        [docked_status]: true,
        [mounted_status]: false,
        [powered_status]: false,
        [backup_running_status]: false
    };
}

function getIconMock() {
    let icon = document.createElement("img");
    icon.style = {};
    icon.style.opacity = '0';
    return icon;
}
