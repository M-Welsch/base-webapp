import * as Status from "/webapp/static/js/modules/dashboard/status.js"

describe('Status', function () {

    let dock_icon = getIconMock();
    let mount_icon = getIconMock();
    let power_icon = getIconMock();
    let backup_running_icon = getIconMock();
    let current_status = getCurrentStatusMock()

    describe('Set docked status', function () {

        it('should show the dock_icon as complete', function () {
            Status.setStatus(current_status, Status.docked_status, dock_icon);
            expect(dock_icon.style.opacity).toEqual(Status.status_complete_opacity);
        });

    });

    describe('Set mounted status', function () {

        it('should show the mount_icon as partial', function () {
            Status.setStatus(current_status, Status.mounted_status, mount_icon);
            expect(mount_icon.style.opacity).toEqual(Status.status_partial_opacity);
        });

    });

    describe('Set powered status', function () {

        it('should show the power_icon as partial', function () {
            Status.setStatus(current_status, Status.mounted_status, power_icon);
            expect(power_icon.style.opacity).toEqual(Status.status_partial_opacity);
        });

    });

    describe('Set backup running status', function () {

        it('should show the backup_running_icon as partial', function () {
            Status.setStatus(current_status, Status.mounted_status, backup_running_icon);
            expect(backup_running_icon.style.opacity).toEqual(Status.status_partial_opacity);
        });

    });
});

function getCurrentStatusMock() {
    return {
        [Status.docked_status]: true,
        [Status.mounted_status]: false,
        [Status.powered_status]: false,
        [Status.backup_running_status]: false
    };
}

function getIconMock() {
    let icon = document.createElement("img");
    icon.style = {};
    icon.style.opacity = '0';
    return icon;
}
