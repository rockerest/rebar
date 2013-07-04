define(
    ["app/mouse"],
    function( Mouse ){
        "use strict";

        return function( settings ){

            var canvas  = document.createElement( 'canvas' ),
                context = canvas.getContext( '2d' );

            if( settings === undefined ){
                settings = {
                    "width": document.documentElement.clientWidth,
                    "height": document.documentElement.clientHeight - 5,
                    "id": "mainCanvas"
                };
            }

            canvas.width = (settings.width === undefined) ? document.documentElement.clientWidth : settings.width;
            canvas.height = (settings.height === undefined) ? document.documentElement.clientHeight - 5 : settings.height;
            canvas.id = (settings.id === undefined) ? "mainCanvas" : settings.id;

            document.body.appendChild( canvas );

            return {
                reset: function(){
                    canvas.width = canvas.width;
                    canvas.height = canvas.height;
                },

                getCanvas: function(){
                    return canvas;
                },

                getMouse: function(){
                    return Mouse.getMouse();
                },

                getContext: function(){
                    return context;
                }
            };
        };
    }
);
