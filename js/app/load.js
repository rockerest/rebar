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

            Load.square( view );
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

            Load.square( sides );
        };

        Load.square = function( sides ){
            var cells   = state.cells,
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

        return Load;
    }
)
