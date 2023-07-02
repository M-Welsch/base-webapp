import * as ElementUtils from "/webapp/static/js/modules/utils/ElementUtils.js"

describe('ElementUtils', function () {

    describe('Add event listeners', function () {

        var testElement = getTestElement();

        it('should add the event click listener', function () {
            ElementUtils.onElementClick(testElement);
            expect(ElementUtils.hasClickListener(testElement)).toEqual(true);
        });
        
        it('should add the event change listener', function () {
            ElementUtils.onElementChange(testElement);
            expect(ElementUtils.hasChangeListener(testElement)).toEqual(true);
        });

    });

});

function getTestElement() {
    var divElement = document.createElement("div");
    return divElement;
}