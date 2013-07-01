define(
    ["app/canvas", "app/animation", "app/tile", "app/animate" ],
    function( Canvas, Animation, Tile, Animate ){
        var init = {},
            state;

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
            var width   = document.documentElement.clientWidth,
                height  = document.documentElement.clientHeight,
                c       = new Canvas({
                    "width": width,
                    "height": height - 5
                }),
                cells   = {},
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
                "cells": cells,
                "overlay": overlay,
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
