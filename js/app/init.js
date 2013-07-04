define(
    ["app/canvas", "app/animation", "app/tile", "app/animate", "image!img/spritemap.png", "image!img/animations.png" ],
    function( Canvas, Animation, Tile, Animate, sprites, animations ){
        "use strict";

        var init = {},
            state;

        init.start = function(){
            state   = init.create();
            Animate.main( state );
        };

        init.create = function(){
            var width   = document.documentElement.clientWidth,
                height  = document.documentElement.clientHeight,
                c       = new Canvas({
                    "width": width,
                    "height": height - 5
                }),
                overlay = {},
                tile,state,it;

            // arbitrary testing
            it = new Animation( Tile.getNamedAnimation( "horse" ) );
            overlay[3] = {};
            overlay[3][3] = it;

            state       = {
                "canvas": c,
                "images": {
                    "sprites": sprites,
                    "animations": animations
                },
                "layers": new Array(
                    {},
                    overlay
                ),
                "size": {
                    "height": height - 5,
                    "width": width,
                    "rows": Math.ceil(((height * 5) - 5) / 16),
                    "columns": Math.ceil((width * 3) / 16)
                },
                "view": {
                    "top": 0,
                    "right": Math.ceil( width / 16 ),
                    "bottom": Math.ceil( (height - 5) / 16 ),
                    "left": 0
                },

                "scroll": {
                    "lastScrolledAt": 0
                }
            };

            return state;
        };

        return init;
    }
);
