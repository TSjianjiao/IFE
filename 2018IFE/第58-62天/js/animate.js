/* https://github.com/zhangxinxu/Tween
 * t: current time（当前时间）；
 * b: beginning value（初始值）；
 * c: change in value（变化量）；
 * d: duration（持续时间）。
*/
var tween = {
    linear:function(t,b,c,d){
        return c*t/d + b;
    },
    easeIn:function(t,b,c,d){
        return c * ( t /= d ) * t + b;
    },
    easeOut: function(t, b, c, d) {
        return c * ((t = t/d - 1) * t * t + 1) + b;
    },
    strongEaseIn:function(t,b,c,d){
        return c * ( t /= d ) * t * t * t * t + b;
    },
    strongEaseOut:function(t,b,c,d){
        return c * ( ( t = t / d -1 ) * t * t * t * t +1 ) + b;
    },
    sineaseIn:function(t,b,c,d){
        return c * ( t /= d ) * t * t + b;  
    },
    sineaseOut:function(t,b,c,d){
        return c * ( ( t = t / d -1 ) * t * t *t +1 ) + b;
    }
};
/**
 * 缓动动画类
 */
class Animate {
    constructor(dom) {
        this.dom = dom;
        this.startTime = 0;
        this.startPos = 0;
        this.endPos = 0;
        this.propertyName = null;
        this.easing = null;
        this.duration = null;
    }
    start(propertyName, startPos, endPos,duration,easing) {
        this.startTime = +new Date;
        this.startPos = startPos;
        this.propertyName = propertyName;
        this.endPos = endPos;
        this.duration = duration;
        this.easing = tween[easing];
    
        var self = this;
        var timeId = setInterval(function(){
            if(self.step() === false){
                clearInterval(timeId);
            }
        },30);
        return timeId
    }
    playerStart(propertyName, startPos, endPos, duration, easing, finished) {
        this.startTime = +new Date;
        this.startPos = startPos;
        this.propertyName = propertyName;
        this.endPos = endPos;
        this.duration = duration;
        this.easing = tween[easing];
        let ball = document.getElementsByClassName('ball')[0];
        var self = this;
        var timeId = setInterval(function(){
            if(self.step() === false){
                clearInterval(timeId);
                finished();
            }
        },30);
        return timeId
    }
    step() {
        var t = +new Date;
        if(t >= this.startTime + this.duration){
            this.update(this.endPos);
            return false;
        }
        var pos = this.easing(t-this.startTime, this.startPos, this.endPos - this.startPos, this.duration);
        this.update(pos);
    }
    update(pos) {
        this.dom.style[this.propertyName] = pos + 'px';
    }
}