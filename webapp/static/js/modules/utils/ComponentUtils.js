export function setupButton(clickedButton, onButtonClick) {

    if (clickedButton) {

        clickedButton.addEventListener("click", onButtonClick);

    }

}
