define(
    ["app/draw"],
    function( Draw ){
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
                view                = state.view,
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
                CAN_SCROLL          = (now >= state.scroll.lastScrolledAt + 90 ) && IS_SCROLL;

            if( mouse.over ){
                if( RIGHT_SCROLL && Scroll.isValidScrollDirection( "right" ) ){
                    Draw.scrollbar( "right" );
                    if( CAN_SCROLL ){
                        state.scroll.lastScrolledAt = now;
                        state.view.left++;
                        state.view.right++;
                    }
                }

                if( LEFT_SCROLL && Scroll.isValidScrollDirection( "left" ) ){
                    Draw.scrollbar( "left" );
                    if( CAN_SCROLL ){
                        state.scroll.lastScrolledAt = now;
                        state.view.left--;
                        state.view.right--;
                    }
                }

                if( TOP_SCROLL && Scroll.isValidScrollDirection( "top" ) ){
                    Draw.scrollbar( "top" );
                    if( CAN_SCROLL ){
                        state.scroll.lastScrolledAt = now;
                        state.view.top--;
                        state.view.bottom--;
                    }
                }

                if( BOTTOM_SCROLL && Scroll.isValidScrollDirection( "bottom" ) ){
                    Draw.scrollbar( "bottom" );
                    if( CAN_SCROLL ){
                        state.scroll.lastScrolledAt = now;
                        state.view.top++;
                        state.view.bottom++;
                    }
                }
            }
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
