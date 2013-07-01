define(
    ["app/draw", "app/info", "app/mouse"],
    function( Draw, Info, Mouse ){
        var Animate = {},
            state;

        Animate.main = function( collection ){
            state = collection;

            Draw.init( state );
            Mouse.init( state );
            Info.init( state );
            Animate.loop();
        };

        Animate.loop = function(){
            requestAnimationFrame( Animate.loop );
            Draw.main();
            Mouse.main();
            Info.main( state );
        }

        return Animate;
    }
);
