define(
    ["app/cell"],
    function( Cell ){
        function Animation( sprite ){
            Cell.call( this, sprite );

            this.lastFrameRenderedAt = 0;
            this.currentFrame = 1;
        };

        Animation.prototype = new Cell();
        Animation.prototype.constructor = Animation;

        Animation.prototype.animate = function(){
            var now = (function(){ var d = new Date; return d.getTime(); }());

            if( now >= this.lastFrameRenderedAt + this.sprite.frames.cooldown ){
                if( this.currentFrame == 1 && this.lastFrameRenderedAt != 0 ){
                    this._cooldown = this.sprite.frames.cooldown;
                    this.sprite.frames.cooldown = this.sprite.frames.period;
                    this.sprite.frames.period = this._cooldown;

                    delete this._cooldown;
                }

                this.sprite.x += this.sprite.w;
                this.currentFrame++;
                this.lastFrameRenderedAt = now;

                if( this.currentFrame > this.sprite.frames.count ){
                    this.sprite.x = 0;
                    this.currentFrame = 1;

                    this._cooldown = this.sprite.frames.cooldown;
                    this.sprite.frames.cooldown = this.sprite.frames.period;
                    this.sprite.frames.period = this._cooldown;

                    delete this._cooldown;
                }
            }
        };

        Animation.prototype.getInfo = function(){
            return this.sprite.name + " (frame: " + this.currentFrame + ")";
        }

        return Animation;
    }
);
