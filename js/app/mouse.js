define(
    ["app/tile", "app/draw", "app/scroll"],
    function( Tile, Draw, Scroll ){
        var Mouse = {},
            mouse = {
                over: false,
                down: false,
                drag: false,
                button: 1,
                x: 0,
                y: 0,
                px: 0,
                py: 0,
                dx: 0,
                dy: 0
            },
            state;

        Mouse.init = function( collection ){
            state   = collection;

            Scroll.init( state );
            Draw.init( state );
            Mouse.bindEventListeners();
        };

        Mouse.main = function(){
            var mouse = state.canvas.getMouse();

            if( mouse.drag ){
                Mouse.drag();
            }

            Scroll.main();
        };

        Mouse.click = function(){
            var mouse   = state.canvas.getMouse(),
                cells   = state.cells,
                coords  = Tile.findBestMatch( [mouse.x, mouse.y] ),
                cell    = state.cells[coords.col + state.view.left ][coords.row + state.view.top ],
                now     = (function(){ var d = new Date; return d.getTime(); }());

            if( now >= cell.clickCooldown ){
                cell.isHighlighted = !cell.isHighlighted;
                cell.clickCooldown = now + 250;
            }
        };

        Mouse.drag = function(){
            Draw.rectangle({
                "x": mouse.x > mouse.dx ? mouse.dx : mouse.x,
                "y": mouse.y > mouse.dy ? mouse.dy : mouse.y,
                "w": Math.abs(mouse.dx - mouse.x),
                "h": Math.abs(mouse.dy - mouse.y),
                "fill": "rgba( 0, 0, 0, .3 )"
            });
        };

        Mouse.bindEventListeners = function(){
            var canvas = state.canvas.getCanvas();

            canvas.addEventListener(
                "mousedown",
                function(e){
                    var rect = canvas.getBoundingClientRect();

                    mouse.button    = e.which;
                    mouse.px        = mouse.x;
                    mouse.py        = mouse.y;

                    mouse.x = e.clientX - rect.left;
                    mouse.y = e.clientY - rect.top;

                    mouse.down  = true;
                    mouse.over  = true;
                    e.preventDefault();
                },
                false
            );

            canvas.addEventListener(
                "mouseup",
                function(e) {
                    if( !mouse.drag ){
                        Mouse.click();
                    }

                    mouse.down  = false;
                    mouse.drag  = false;
                    mouse.over  = true;
                    e.preventDefault();
                },
                false
            );

            canvas.addEventListener(
                "mousemove",
                function(e) {
                    var rect        = canvas.getBoundingClientRect(),
                        dragIntent  = false;

                    mouse.px        = mouse.x;
                    mouse.py        = mouse.y;

                    mouse.x = e.clientX - rect.left;
                    mouse.y = e.clientY - rect.top;

                    dragIntent = Math.abs(mouse.x - mouse.px) > 1 || Math.abs(mouse.y - mouse.py) > 1;

                    mouse.over  = true;

                    if( mouse.down && dragIntent ){
                        if( mouse.drag == false ){
                            mouse.dx = mouse.px;
                            mouse.dy = mouse.py;
                        }

                        mouse.drag  = true;
                    }

                    e.preventDefault();
                },
                false
            );

            canvas.addEventListener(
                "contextmenu",
                function( e ){
                    e.preventDefault();
                },
                false
            );

            canvas.addEventListener(
                "mouseleave",
                function( e ){
                    mouse.over = false;
                },
                false
            );
        };

        Mouse.getMouse = function(){
            return mouse;
        };

        return Mouse;
    }
);
