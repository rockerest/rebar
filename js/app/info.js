define(
    ["app/tile", "app/draw", "app/write"],
    function( Tile, Draw, Write ){
        var Info = {},
            state;

        Info.main = function( collection ){
            state  = collection;

            Draw.init( state );
            Info.cellInfo();
        };

        Info.cellInfo = function(){
            var mouse       = state.canvas.getMouse(),
                coords      = Tile.findBestMatch( [mouse.x, mouse.y] ),
                cell        = Info.getHighestCell( coords ),
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

        Info.getHighestCell = function( coords ){
            var cell    = state.cells[coords.col + state.view.left ][coords.row + state.view.top ],
                overlay,highest;

            if( state.overlay[coords.col + state.view.left ] === undefined ){
                overlay = undefined;
            }
            else{
                overlay = state.overlay[coords.col + state.view.left ][coords.row + state.view.top ];
            }

            if( overlay === undefined ){
                highest = cell;
            }
            else{
                highest = overlay;
            }

            return highest;
        }

        return Info;
    }
);
