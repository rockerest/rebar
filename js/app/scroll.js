define(
    ["app/draw"],
    function( Draw ){
        "use strict";

        var Scroll = {},
            state;

        Scroll.init = function( collection ){
            state   = collection;

            Draw.init( state );
        };

        Scroll.main = function(){
            var canvas              = state.canvas.getCanvas(),
                mouse               = state.canvas.getMouse(),
                now                 = (function(){ var d = new Date; return d.getTime(); }()),
                RIGHT_SCROLL        = (mouse.x >= canvas.width - 40),
                WAS_RIGHT_SCROLL    = (mouse.px >= canvas.width - 40),
                BOTTOM_SCROLL       = (mouse.y >= canvas.height - 40),
                WAS_BOTTOM_SCROLL   = (mouse.py >= canvas.height - 40),
                TOP_SCROLL          = (mouse.y <= 40),
                WAS_TOP_SCROLL      = (mouse.py <= 40),
                LEFT_SCROLL         = (mouse.x <= 40),
                WAS_LEFT_SCROLL     = (mouse.px <= 40),
                IS_SCROLL           = ( RIGHT_SCROLL || LEFT_SCROLL || TOP_SCROLL || BOTTOM_SCROLL ),
                WAS_SCROLL          = ( WAS_RIGHT_SCROLL || WAS_LEFT_SCROLL || WAS_TOP_SCROLL || WAS_BOTTOM_SCROLL ),
                CAN_SCROLL          = (now >= state.scroll.lastScrolledAt + 90 ) && IS_SCROLL,
                dir;

            if( mouse.over ){
                dir = "right";
                if( RIGHT_SCROLL && Scroll.isValidScrollDirection( dir ) ){
                    Draw.scrollbar( dir );
                    if( CAN_SCROLL ){
                        Scroll.direction( dir );
                    }
                }

                dir = "left";
                if( LEFT_SCROLL && Scroll.isValidScrollDirection( dir ) ){
                    Draw.scrollbar( dir );
                    if( CAN_SCROLL ){
                        Scroll.direction( dir );
                    }
                }

                dir = "top";
                if( TOP_SCROLL && Scroll.isValidScrollDirection( dir ) ){
                    Draw.scrollbar( dir );
                    if( CAN_SCROLL ){
                        Scroll.direction( dir );
                    }
                }

                dir = "bottom";
                if( BOTTOM_SCROLL && Scroll.isValidScrollDirection( dir ) ){
                    Draw.scrollbar( dir );
                    if( CAN_SCROLL ){
                        Scroll.direction( dir );
                    }
                }
            }
        };

        Scroll.direction = function( dir ){
            var sides   = [ "top", "right", "bottom", "left" ],
                coords  = {
                    "x": 0,
                    "y": 0
                },
                view    = state.view,
                scroll  = state.scroll,
                mouse   = state.canvas.getMouse(),
                now     = (function(){ var d = new Date; return d.getTime(); }());

            switch( dir ){
                case "right":
                    view[sides[1]]++;
                    view[sides[3]]++;
                    coords.x = -16;
                    break;
                case "bottom":
                    view[sides[0]]++;
                    view[sides[2]]++;
                    coords.y = -16;
                    break;
                case "top":
                    view[sides[0]]--;
                    view[sides[2]]--;
                    coords.y = 16;
                    break;
                case "left":
                    view[sides[1]]--;
                    view[sides[3]]--;
                    coords.x = 16;
                default:
                    break;
            }

            scroll.lastScrolledAt = now;

            mouse.dx += coords.x;
            mouse.dy += coords.y;
        };

        Scroll.isValidScrollDirection = function( dir ){
            var view    = state.view,
                valid   = true;

            switch( dir ){
                case "right":
                    valid = view.right < state.size.columns;
                    break;
                case "left":
                    valid = view.left > 0;
                    break;
                case "top":
                    valid = view.top > 0;
                    break;
                case "bottom":
                    valid = view.bottom < state.size.rows;
                    break;
                default:
                    valid = false;
            }

            return valid;
        };

        return Scroll;
    }
);
