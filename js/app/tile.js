define(
    ["json!app/sprites.json"],
    function( Sprites ){
        "use strict";

        var Tile = {};

        Tile.getNumberedTile = function( number ){
            var names = Object.keys( Sprites.spritemap );

            return Sprites.spritemap[names[number]];
        };

        Tile.getNamedTile = function( name ){
            return Sprites.spritemap[name];
        };

        Tile.getNumberedAnimation = function( number ){
            var names = Object.keys( Sprites.animations );

            return Sprites.animations[names[number]];
        };

        Tile.getNamedAnimation = function( name ){
            return Sprites.animations[name];
        };

        Tile.getRandomTile = function(){
            return Tile.getNumberedTile( Math.floor( Math.random() * 3 ) );
        };

        Tile.findBestMatch = function( coords ){
            return {
                "col": Math.floor( coords[0] / 16 ),
                "row": Math.floor( coords[1] / 16 )
            };
        };

        return Tile;
    }
);
