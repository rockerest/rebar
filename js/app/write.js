define({
    text: function( ctx, settings ){
        "use strict";

        if( settings.text === undefined ){
            settings.text = "";
        }

        if( settings.x === undefined ){
            settings.x = 0;
        }

        if( settings.y === undefined ){
            settings.y = 0;
        }

        if( settings.color === undefined ){
            settings.color = "#000000";
        }

        if( settings.align === undefined ){
            settings.align = "left";
        }

        if( settings.base === undefined ){
            settings.base = "middle";
        }

        if( settings.font === undefined ){
            settings.font = "1em sans-serif";
        }

        ctx.fillStyle     = settings.color;
        ctx.textAlign       = settings.align;
        ctx.textBaseline    = settings.base;
        ctx.font            = settings.font;

        ctx.fillText( settings.text, settings.x, settings.y );
    }
});
