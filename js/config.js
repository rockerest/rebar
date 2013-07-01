"use strict";

requirejs.config({
    "baseUrl": "js/lib",
    "paths": {
        "app": "../app",
        "jquery": "https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min"
    }
});

// main app start
requirejs(
    ["jquery", "animationPolyfill", "roundRect", "app/init"],
    function( $, ap, rr, init ){
        $(function(){
            init.start();
        });
    }
);
