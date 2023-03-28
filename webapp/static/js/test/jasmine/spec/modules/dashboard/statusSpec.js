import { setStatusComplete, setStatusPartial } from "../../../../../modules/dashboard/status.js";

describe('Status', function() {

    let dock_icon = document.createElement("div");
    dock_icon.style = {};
    dock_icon.style.opacity = '0';
  
    describe('Status complete', function() {
      
        it('should show the dock_icon as complete', function() {
            setStatusComplete(dock_icon);
            expect(dock_icon.style.opacity).toEqual('1');
        });
    
    });

    describe('Status partial', function() {
      
        it('should show the dock_icon as partial', function() {
            setStatusPartial(dock_icon);
            expect(dock_icon.style.opacity).toEqual('0.3');
        });
    
    });

});

    