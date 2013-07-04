define(
    ["app/tile", "app/load", "app/draw", "app/write"],
    function( Tile, Load, Draw, Write ){
        "use strict";

        var Info = {},
            state;

        Info.init = function( collection ){
            state   = collection;

            Draw.init( state );
        };

        Info.main = function( collection ){
            Info.cellInfo();
        };

        Info.cellInfo = function(){
            var mouse       = state.canvas.getMouse(),
                cell        = Load.cellFromHighestLayer( Tile.findBestMatch( [mouse.x, mouse.y] ) ),
                dkGray      = "rgba( 80, 80, 80, .75 )",
                white       = "rgba( 255, 255, 255, 1 )",
                text;

            Draw.roundedRectangle({
                x: mouse.x + 15,
                y: mouse.y + 1,
                w: 135,
                h: 30,
                r: 7,
                fill: dkGray,
                stroke: white
            });

            Write.text(
                state.canvas.getContext(),
                {
                    text: cell.getInfo(),
                    x: mouse.x + 22,
                    y: mouse.y + 8,
                    color: white,
                    align: "left",
                    base: "top",
                    font: "1em sans-serif"
                }
            );
        };

        return Info;
    }
);
