define(
    [ "app/cell", "app/tile" ],
    function( Cell, Tile ){

        var Load = {},
            state;

        Load.init = function( collection ){
            state = collection;
        };

        Load.backgroundView = function(){
            var view    = state.view;

            Load.backgroundSquare( view );
        };

        Load.backgroundScrollBuffer = function(){
            var view    = state.view,
                sides   = {};

            // Ternary logic copied from scroll.js
            // TODO: Figure out how I got into a circular dependency situation....
            sides.left      = view.left > 0                     ? view.left - 1     : view.left;
            sides.right     = view.right < state.size.columns   ? view.right + 1    : view.right;
            sides.top       = view.top > 0                      ? view.top - 1      : view.top;
            sides.bottom    = view.bottom < state.size.rows     ? view.bottom + 1   : view.bottom;

            Load.backgroundSquare( sides );
        };

        Load.backgroundSquare = function( sides ){
            var cells   = state.layers[0],
                i,j;

            for( i = sides.left; i < sides.right; i++ ){
                for( j = sides.top; j < sides.bottom; j++ ){
                    if( cells[i] === undefined ){
                        cells[i] = {};
                    }

                    if( cells[i][j] === undefined ){
                        cells[i][j] = new Cell( Tile.getRandomTile() );
                    }
                }
            }
        };

        Load.overlay = function(){

        };

        Load.cellFromHighestLayer = function( coords ){
            var layers      = state.layers,
                numLayers   = layers.length,
                numColumns,i,layer,j,cell;

            for( i = numLayers; i > -1 ; i-- ){
                if( layers[i] === undefined ){
                    continue;
                }
                else{
                    layer   = layers[i];

                    if( layer[ coords.col + state.view.left ] === undefined ){
                        continue;
                    }
                    else{
                        cell = layer[ coords.col + state.view.left ][ coords.row + state.view.top ];

                        if( cell !== undefined ){
                            break;
                        }
                    }
                }
            }

            if( cell === undefined ){
                throw new TypeException( "Coordinates at [" + coords.col + ", " + coords.row + "] did not resolve to a Cell in any layer." );
            }
            else{
                return cell;
            }
        }

        return Load;
    }
)
