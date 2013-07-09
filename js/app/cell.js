define(
    function(){
        "use strict";

        function Cell( sprite ){
            this.sprite = sprite;

            this.height = 16;
            this.width  = 16;

            this.type = "cell";

            this.isHighlighted = false;
            this.clickCooldown = 0;
        };

        Cell.prototype.getInfo = function(){
            return this.sprite.name;
        };

        return Cell;
    }
);
