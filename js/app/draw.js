define(
    ["app/load"],
    function( Load ){
        "use strict";

        var Draw = {},
            state;

        Draw.init = function( collection ){
            var ctx;
            state   = collection;
            ctx     = state.canvas.getContext();

            ctx.fillStyle = "rgba( 0, 0, 0, .6 )";
            ctx.strokeStyle = "rgba( 0, 0, 0, .6 )";

            Load.init( state );
            Load.backgroundView();
        };

        Draw.main = function(){
            state.canvas.reset();
            Load.backgroundScrollBuffer();
            Draw.background();
            Draw.overlay();
            //Draw.debugMousePaws();
        };

        Draw.background = function(){
            Draw.layer( 0 );
        };

        Draw.overlay = function(){
            Draw.layer( 1 );
        };

        Draw.layer = function( layer ){
                // where and which to draw
            var ctx     = state.canvas.getContext(),
                layer   = state.layers[ layer ],
                // what to draw
                sprites = state.images.sprites,
                anims   = state.images.animations,
                // when to draw
                view    = state.view,
                // preparing for loops
                i,j,x,y,w,h,sprite,cell,type,imgSrc;

            for( i = view.left, x = 0; i < view.right; i++, x++ ){
                if( layer[i] !== undefined ){
                    for( j = view.top, y = 0; j < view.bottom; j++, y++ ){
                        cell = layer[i][j];
                        if( cell !== undefined ){
                            type = cell.getType();
                            imgSrc = type == "animated" ? anims : sprites;
                            w = x * cell.width;
                            h = y * cell.height;

                            ctx.drawImage( imgSrc, cell.sprite.x, cell.sprite.y, cell.sprite.w, cell.sprite.h, w, h, cell.width, cell.height );
                            if( cell.isHighlighted ){
                                Draw.highlightTile( [w, h] );
                            }

                            if( type == "animated" ){
                                cell.animate();
                            }
                        }
                    }
                }
            }
        };

        Draw.highlightTile = function( coords ){
            Draw.rectangle({
                x: coords[0],
                y: coords[1],
                w: 16,
                h: 16,
                fill: state.settings.cell.highlight
            });
        };

        Draw.scrollbar = function( dir ){
            var canvas  = state.canvas.getCanvas(),
                draw    = true,
                x,y,h,w;

            switch( dir ){
                case "right":
                    x = canvas.width - 40;
                    y = 0;
                    w = 40;
                    h = canvas.height;
                    break;
                case "left":
                    x = 0;
                    y = 0;
                    w = 40;
                    h = canvas.height;
                    break;
                case "top":
                    x = 0;
                    y = 0;
                    w = canvas.width;
                    h = 40;
                    break;
                case "bottom":
                    x = 0;
                    y = canvas.height - 40;
                    w = canvas.width;
                    h = 40;
                    break;
                default:
                    draw = false;
            }

            if( draw ){
                Draw.rectangle({
                    x: x,
                    y: y,
                    w: w,
                    h: h,
                    fill: state.settings.scroll.barColor
                });
            }
        };

        Draw.rectangle = function( settings ){
            var ctx = state.canvas.getContext();

            if( settings.fill === undefined ){
                settings.fill = "rgba( 0, 0, 0, 1)";
            }

            ctx.fillStyle = settings.fill;
            ctx.fillRect( settings.x, settings.y, settings.w, settings.h );
        };

        Draw.roundedRectangle = function( settings ){
            var ctx = state.canvas.getContext();

            if( settings.fill === undefined || settings.fill == false ){
                settings.fill = false;
            }
            else{
                ctx.fillStyle = settings.fill;
            }

            if( settings.stroke === undefined || settings.stroke == false ){
                settings.stroke = false
            }
            else{
                ctx.strokeStyle = settings.stroke;
            }

            ctx.roundRect( settings.x, settings.y, settings.w, settings.h, settings.r, settings.fill, settings.stroke );
        };

        Draw.debugMousePaws = function(){
            var canvas  = state.canvas,
                mouse   = canvas.getMouse(),
                ctx     = canvas.getContext(),
                text    = "( " + mouse.x + ", " + mouse.y + " )",
                button  = mouse.button == 1 ? "left" : mouse.button == 3 ? "right" : mouse.button;

            if( mouse.down && !mouse.drag ){
                text += " " + button + " click";
            }
            else if( mouse.drag ){
                text += " dragging with button " + button;
            }

            ctx.fillStyle = "rgba( 0, 0, 0, .6 )";
            ctx.font = "1em sans-serif";
            ctx.textAlign = "left";
            ctx.textBaseline = "bottom";

            ctx.fillText( text, mouse.x + 7, mouse.y - 7 );
        };

        return Draw;
    }
);
