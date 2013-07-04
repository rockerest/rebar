define(
    function(){
        "use strict";

        function Cell( sprite ){
            this.sprite = sprite;

            this.height = 16 // sprite.h;
            this.width  = 16 // sprite.w;

            this.isHighlighted = false;
            this.clickCooldown = 0;
        };

        Cell.prototype.getInfo = function(){
            return this.sprite.name;
        };

        Cell.prototype.getType = function(){
            var type = "cell";

            if( this.sprite.frames !== undefined ){
                type = "animated";
            }

            return type;
        };

        return Cell;
    }
);
