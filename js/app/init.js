define(
    ["app/canvas", "app/cell", "app/animation", "app/tile", "app/animate" ],
    function( Canvas, Cell, Animation, Tile, Animate ){
        var init = {};

        init.doneLoading = function( sprites, animations ){
            state   = init.create( sprites, animations );
            Animate.main( state );
        }

        init.start = function(){
            var spriteMap   = new Image(),
                animMap     = new Image();

            spriteMap.src   = "img/spritemap.png";
            animMap.src     = "img/animations.png";

            spriteMap.onload = function(){
                animMap.onload = function(){
                    init.doneLoading( spriteMap, animMap );
                }
            }
        };

        init.create = function( sprites, animations ){
            var cols    = (document.documentElement.clientWidth * 3 ) / 16,
                rows    = ((document.documentElement.clientHeight * 5) - 5) /16,
                width   = document.documentElement.clientWidth,
                height  = document.documentElement.clientHeight - 5,
                c       = new Canvas({
                    "width": width,
                    "height": height
                }),
                cells   = {},
                overlay = {},
                tile,cell;

            for( i = 0; i < cols; i++ ){
                for( j = 0; j < rows; j++ ){
                    cell = new Cell( Tile.getRandomTile() );
                    if( cells[i] === undefined ){
                        cells[i] = {};
                    }

                    cells[i][j] = cell;
                }
            }

            // arbitrary testing
            var it = new Animation( Tile.getNamedAnimation( "horse" ) );
            overlay[3] = {};
            overlay[3][3] = it;

            return {
                "canvas": c,
                "images": {
                    "sprites": sprites,
                    "animations": animations
                },
                "cells": cells,
                "overlay": overlay,
                "view": {
                    "top": 0,
                    "right": Math.ceil( width / 16 ),
                    "bottom": Math.ceil( height / 16 ),
                    "left": 0
                },
                "scroll": {
                    "lastScrolledAt": 0
                }
            };
        };

        return init;
    }
);
