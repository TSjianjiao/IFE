/**
 * @file 球场
 */

class FootballField {
    constructor(type) {
        if(new.target === FootballField) {
            throw new Error('不能实例化');
        }
        this.type = type;
        let scale = 0;
    }
    // 工厂生成实例接口
    static getFactory(type) {
        switch(type) {
            case 'field':
                return Field
            case 'player':
                return Player
            case 'ball' :
                return Ball
            default:
                throw new Error('参数输入错误');
        }
    }
}

/**
 * 场地类
 */
class Field extends FootballField{
    constructor({filedWidth = 0, 
                filedHeight = 0, 
                fieldContainerWidth = 0, 
                fieldContainerHeight = 0} = {}) {
        super('field');
        this.observer = Observer.getInstance();
        this.id = -2;
        // 场地设置
        this.canvasDom = document.getElementById('my-canvas');
        this.ctx = this.canvasDom.getContext('2d');
        this.filedWidth = filedWidth;// 单位是m
        this.filedHeight = filedHeight;
        // 容器设置
        this.containerDom = document.getElementById('container');
        this.fieldContainerWidth = fieldContainerWidth;// 单位是像素
        this.fieldContainerHeight = fieldContainerHeight;
        this.scale = Number(this.fieldContainerHeight / this.filedHeight / 1.2);
        // 球场坐标
        this.fieldX = null; // 单位像素
        this.fieldY = null;
        this.init()
    }
    init() {
        // 容器
        this.containerDom.setAttribute('style', 
        `width:${this.fieldContainerWidth}px; height:${this.fieldContainerHeight}px`);
        // 矩形 缩小了1.2倍
        const WIDTH = this.filedWidth  * this.scale;
        const HEIGHT = this.filedHeight  * this.scale;
        this.canvasDom.setAttribute('width', WIDTH);
        this.canvasDom.setAttribute('height', HEIGHT);
        // 绘制球场
        this.fieldX = (Number(this.fieldContainerWidth) - WIDTH) / 2;
        this.fieldY = (Number(this.fieldContainerHeight) - HEIGHT) / 2;
        this.canvasDom.setAttribute('style', 
        `position:absolute; top:${this.fieldY}px; left:${this.fieldX}px`);
        this.ctx.fillStyle="#0c5206";
        this.ctx.fillRect(0, 0, WIDTH, HEIGHT);

        // 借用梁高飞同学的球场
        // https://github.com/Elanpro/Elanpro.github.io/blob/master/ife0/JavaScript/54_57/js/football-field-factory.js
        // 四个边角
        this.ctx.strokeStyle = "#fff";
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.arc(0,0,10,0,Math.PI/2);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.arc(WIDTH,0,10,0,-Math.PI/2);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.arc(0,HEIGHT,10,-Math.PI/2,0);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.arc(WIDTH,HEIGHT,10,0,-Math.PI/2);
        this.ctx.stroke();

        // 中间分线和大圆圈(半径9.15米)
        this.ctx.moveTo(WIDTH/2,0);
        this.ctx.lineTo(WIDTH/2,HEIGHT);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.arc(WIDTH/2,HEIGHT/2,9.15  * this.scale,0,Math.PI*2);
        this.ctx.stroke();

        // 左侧球门区域
        this.ctx.beginPath();
        this.ctx.moveTo(0,HEIGHT / 2-14.4* this.scale);
        this.ctx.lineTo(12.82 * this.scale,HEIGHT / 2-14.4 * this.scale);
        this.ctx.lineTo(12.82 * this.scale,HEIGHT / 2+14.4 * this.scale);
        this.ctx.lineTo(0,HEIGHT / 2 + 14.4 * this.scale);
        this.ctx.moveTo(0,HEIGHT / 2 + 8.25 * this.scale);
        this.ctx.lineTo(4.5 * this.scale, HEIGHT/2+8.25 * this.scale);
        this.ctx.lineTo(4.5 * this.scale, HEIGHT/2-8.25 * this.scale);
        this.ctx.lineTo(0,HEIGHT/2-8.25 * this.scale);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.arc(9.15 * this.scale,HEIGHT/2,1,0,Math.PI*2);
        this.ctx.stroke();
        this.ctx.fillStyle = "#fff";
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(9.15 * this.scale,HEIGHT/2,7.32 * this.scale,-Math.PI/3,Math.PI/3);
        this.ctx.stroke();

        // 右侧球门区域
        this.ctx.beginPath();
        this.ctx.moveTo(WIDTH,HEIGHT/2-14.4 * this.scale);
        this.ctx.lineTo(WIDTH-12.82 * this.scale,HEIGHT/2-14.4 * this.scale);
        this.ctx.lineTo(WIDTH-12.82 * this.scale,HEIGHT/2+14.4 * this.scale);
        this.ctx.lineTo(WIDTH,HEIGHT/2+14.4 * this.scale);
        this.ctx.moveTo(WIDTH,HEIGHT/2+8.25 * this.scale);
        this.ctx.lineTo(WIDTH-4.5 * this.scale,HEIGHT/2+8.25 * this.scale);
        this.ctx.lineTo(WIDTH-4.5 * this.scale,HEIGHT/2-8.25 * this.scale);
        this.ctx.lineTo(WIDTH,HEIGHT/2-8.25 * this.scale);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.arc(WIDTH-9.15 * this.scale,HEIGHT/2,1,0,Math.PI*2);
        this.ctx.stroke();
        this.ctx.fillStyle = "#fff";
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(WIDTH-9.15 * this.scale,HEIGHT/2,7.32 * this.scale,Math.PI*2/3,-Math.PI*2/3);
        this.ctx.stroke();
    }
}

/**
 * 球员类
 */
let playerId = 0;
class Player extends FootballField{
    constructor(field, position) {
        super('player');
        this.observer = Observer.getInstance();
        this.id = playerId++;
        // 相对球场原坐标
        this.origin = {
            x:field.fieldX,// 单位是像素
            y:field.fieldY
        }
        this.field = field;
        this.scale = Number(this.field.scale);
        this.playerDom = null;
        // 球员位置  单位px
        if (position === 'random') {
            this.x = Math.random() * field.filedWidth * Number(field.scale) + Number(this.origin.x);
            this.y = Math.random() * field.filedHeight * Number(field.scale) + Number(this.origin.y);
        }
        else {
            this.x = position.x * Number(field.scale) + Number(this.origin.x);
            this.y = position.y * Number(field.scale) + Number(this.origin.y);
        }
        this.radius = 1;
        // 球员数据
        this.speed = 1; // 速度值 （影响最高速度
        this.maxSpeed = 1;// 速度值对应的最高速度
        this.explosiveness = 1;// 爆发力值 （影响到达最高速度耗时
        this.toMaxSpeed = 1;// 达到最高速度耗时
        this.strength = 1;// 体力值 （影响最高速度持续时间
        this.keepSpeed = 1;// 高速度持续时间
        this.tech = 1; // 技术值 (影响踢球准确度 
        this.relaStdDev = 0.01; // 相对标准差（自己取的名字..） （越大方差越大→→→图像越扁平 取值范围 均值的1%-30% 
                            // 都按照一个方差的范围 68%来随机偏移
        // 比如相对标准差为30% 期望速度为10m/s 那么方差为3m/s 取一个方差的范围 也就是有68%的概率取到[7, 10]
        this.steDev = 1;
        // 方向影响因子b (角度 * 1/360 + 1 = b) 
        // 运动踢静止
        // 运动角度和期望射出角之差 (0~360)
        this.b = 1;
        // 方向影响因子c  
        // 静止踢运动
        // 球原本角度和期望射出角之差 (0~360)
        this.c = 0;
        this.power = 1; // 力量 (影响提出球的初速度
        this.maxBallInitialSpeed = 1 // 足球的最高初速度
        this.init();
    }
    init() {
        const RADIUS = Math.ceil(this.radius *  this.scale);
        this.playerDom = document.createElement('div');
        // 绘制
        this.playerDom.setAttribute('class', 'player');
        this.playerDom.setAttribute('style', `left:${this.x}px; top:${this.y}px;
                                    width:${RADIUS * 2}px; height:${RADIUS * 2}px;`);
        this.playerDom.innerText = this.id;
        document.getElementById('container').appendChild(this.playerDom);
        // 设置球员数据
        this.speed = Math.floor(Math.random() * 110);
        this.maxSpeed = Math.floor(3 + (this.speed - 1) * ( 9 / 98 ));
        this.explosiveness = Math.floor(Math.random()) * 110;
        this.toMaxSpeed = Math.floor((3 / 98) * (1 - this.explosiveness) + 4);
        this.strength = Math.floor(Math.random() * 110);
        this.keepSpeed = Math.floor((5 / 98) * (this.strength - 1) + 10);
        this.tech = Math.floor(Math.random() * 110);
        this.relaStdDev = (0.29 / 98) * (1 - this.tech) + 0.3;
        this.power = Math.floor(Math.random() * 110);
        this.maxBallInitialSpeed = Math.floor(45 * this.power / 98 + 445 / 98);
        // 方差
        this.steDev = this.relaStdDev * this.maxBallInitialSpeed;
    }
    /**
     * 更改球员位置
     */
    setPositions({x, y}) {
        const RADIUS = Math.ceil(this.radius *  this.scale);
        this.x = x * this.scale + Number(this.origin.x);
        this.y = y * this.scale + Number(this.origin.y);
        this.playerDom.setAttribute('style', `left:${this.x}px; top:${this.y}px;
        width:${RADIUS * 2}px; height:${RADIUS * 2}px;`);
    }
    /**
     * 奔跑
     */
    run(dir, cb) {
        // 总的距离 用x方向作参考
        // 传入的目标点单位是px
        let X = Number(dir.x);
        let Y = Number(dir.y);
        // 与目标点的夹角
        const θ = Math.floor(Math.atan((Y - this.y) / (X - this.x)) / 0.017453293);
        // console.log(θ)
        // const θ = (Y - this.y) / (X - this.x)
        const ACC = this.maxSpeed / this.toMaxSpeed;
        // 到达最大速度时，跑过的距离
        const DISTANCE_1 = this.maxSpeed * this.toMaxSpeed / 2;
        // 匀速阶段 距离
        const DISTANCE_2 = this.maxSpeed * this.keepSpeed;
        // 缓动函数
        let time;
        // 移动距离转化为m
        const x = Math.sqrt(Math.pow(X - this.x, 2) + Math.pow(Y - this.y, 2)) / this.scale;
        // console.log(X, Y, x, θ)
        if(DISTANCE_1 >= x) {
            // 总时间
           time = Math.sqrt(2 * x / ACC);
        }
        else if (DISTANCE_1 < x && x <= DISTANCE_2) {
            const LEFT = x - DISTANCE_1;
            time = Math.floor(this.toMaxSpeed + (LEFT / this.maxSpeed));
        }
        else {
            time = this.toMaxSpeed + this.keepSpeed;
        }
        var runAnimate_y = new Animate(this.playerDom);
        var runAnimate_x = new Animate(this.playerDom);
        // 修改了start函数 增加一个起始位置参数 不然动画运动有bug
        runAnimate_y.playerStart('top', this.y, Y, time * 1000,'strongEaseOut', cb);
        runAnimate_x.start('left', this.x, X, time * 1000,'strongEaseOut');
        // 更新位置
        this.x = X;
        this.y = Y;
    }
    /**
     * 踢球
     */
    kickBall({direction, acceleration}) {
        // 因为技术值的关系 实际初速度和方向会有偏差
        let initialVelocity = getNumberInNormalDistribution(this.maxBallInitialSpeed, this.steDev);
        if(initialVelocity > this.maxBallInitialSpeed) initialVelocity = this.maxBallInitialSpeed;
        let angle = getNumberInNormalDistribution(Number(direction), this.steDev);
        if(angle < 0) angle = 0;
        // 运动时与球的方向 也会影响初速度
        this.observer.setPublish('kick', {direction, initialVelocity, acceleration});
    }
    /**
     * 追球
     */
    chasing(ball) {
        // 总的距离 用x方向作参考
        // 传入的目标点单位是px
        let X = Number(ball.position.x);
        let Y = Number(ball.position.y);
        const ACC = this.maxSpeed / this.toMaxSpeed;
        // 到达最大速度时，跑过的距离
        const DISTANCE_1 = this.maxSpeed * this.toMaxSpeed / 2;
        // 匀速阶段 距离
        const DISTANCE_2 = this.maxSpeed * this.keepSpeed;
        let time;
        // 移动距离转化为m
        const x = Math.sqrt(Math.pow(X - this.x, 2) + Math.pow(Y - this.y, 2)) / this.scale;
        if(DISTANCE_1 >= x) {
            // 总时间
           time = Math.sqrt(2 * x / ACC);
        }
        else if (DISTANCE_1 < x && x < DISTANCE_2) {
            const LEFT = x - DISTANCE_1;
            time = Math.ceil(this.toMaxSpeed + LEFT / this.maxSpeed);
        }
        else {
            time = this.toMaxSpeed + this.keepSpeed;
        }
        // 当运动员到达终点时间比球滚动短时 
        // if (ball.ballMoveTime >= time) {
        //     // 重新计算路线
        //     let S = ball.initialVelocity * time + 1/2 * ball.acceleration * Math.pow(time, 2);
        //     let xBias = Math.cos(ball.angle) * S * this.scale;
        //     let yBias = Math.sin(ball.angle) * S * this.scale;
        //     X = ball.ballOringinPosition.x + xBias;
        //     Y = ball.ballOringinPosition.y - yBias; 
        //     // time = time - 2.5 < 0 ? time : time - 2.5;
        // }
        let runAnimate_y = new Animate(this.playerDom);
        let runAnimate_x = new Animate(this.playerDom);
        // 修改了start函数 增加一个起始位置参数 不然动画运动有bug
        // 还需要获得球的坐标
        let timer_1 = runAnimate_y.start('top', this.y, Y, time * 1000,'strongEaseOut');
        let timer_2 = runAnimate_x.start('left', this.x, X, time * 1000,'strongEaseOut');
        let timer = setInterval(()=>{
            if(Math.abs(Number(this.playerDom.style.left.replace('px', '')) 
                - Number(ball.ballDom.style.left.replace('px', ''))) == 0) {
                // 发布停球消息
                console.log('停球')
                this.observer.setPublish('stopBall', {x:this.playerDom.style.left, y:this.playerDom.style.top})
                clearInterval(timer);
                clearInterval(timer_1);
                clearInterval(timer_2);
            }
        }, 30)
        // 更新位置
        this.x = X;
        this.y = Y;
    }
    /**
     * 带球运动
     */
    withBall(dir, ball) {
        this.run(dir, finished);
        let timerId = setInterval(() => {
            ball.ballDom.style.top = this.playerDom.style.top;
            ball.ballDom.style.left = this.playerDom.style.left;
        },30)
        // 到达终点 清除定时器
        function finished() {
            clearInterval(timerId);
        }
        return timerId
    }
    /**
     * 跑向球然后踢出
     */
    chasingAndKick(ball) {
        // 总的距离 用x方向作参考
        // 传入的目标点单位是px
        let X = Number(ball.position.x);
        let Y = Number(ball.position.y);
        let ballMoveAngle = Number(ball.angle);
        let playerMoveAngl = Math.atan((X-this.x)/(Y/this.y)) / 0.017453293;
        const ACC = this.maxSpeed / this.toMaxSpeed;
        // 到达最大速度时，跑过的距离
        const DISTANCE_1 = this.maxSpeed * this.toMaxSpeed / 2;
        // 匀速阶段 距离
        const DISTANCE_2 = this.maxSpeed * this.keepSpeed;
        let time;
        // 移动距离转化为m
        const x = Math.sqrt(Math.pow(X - this.x, 2) + Math.pow(Y - this.y, 2)) / this.scale;
        if(DISTANCE_1 >= x) {
            // 总时间
           time = Math.sqrt(2 * x / ACC);
        }
        else if (DISTANCE_1 < x && x < DISTANCE_2) {
            const LEFT = x - DISTANCE_1;
            time = Math.ceil(this.toMaxSpeed + LEFT / this.maxSpeed);
        }
        else {
            time = this.toMaxSpeed + this.keepSpeed;
        }
        let runAnimate_y = new Animate(this.playerDom);
        let runAnimate_x = new Animate(this.playerDom);
        // 修改了start函数 增加一个起始位置参数 不然动画运动有bug
        // 还需要获得球的坐标
        let timer_1 = runAnimate_y.start('top', this.y, Y, time * 1000,'strongEaseOut');
        let timer_2 = runAnimate_x.start('left', this.x, X, time * 1000,'strongEaseOut');
        let timer = setInterval(()=>{
            if(Math.abs(Number(this.playerDom.style.left.replace('px', '')) 
                - Number(ball.ballDom.style.left.replace('px', ''))) <= 3) {
                let acceleration = -7;
                this.b =  Math.abs((ballMoveAngle - playerMoveAngl) * 1/360 + 1);
                this.steDev = this.steDev * this.b;
                let direction = document.getElementById('ballAngleInput').value;
                // if((Math.abs(ballAngel - ballMoveAngle)) / 90 == 0 || (Math.abs(ballAngel - ballMoveAngle)) / 90 == 2) {
                //     this.c = 0;
                // }
                // else {
                //     this.c = ((ballAngel - ballMoveAngle) / 90) * 1/3;
                // }
                // direction = ballAngel + this.c;
                // console.log(this.c)
                this.kickBall({direction, acceleration});
                clearInterval(timer);
            }
        }, 30)
        // 更新位置
        this.x = X;
        this.y = Y;
    }
}

/**
 * 球类
 */
class Ball extends FootballField{
    constructor(field, {radius, position} = {}) {
        super('Ball');
        this.id = -1;
        this.observer = Observer.getInstance();
        this.radius = radius;
        this.position = position;
        this.ballDom = null;
        this.field = field;
        this.acceleration = null;
        this.initialVelocity = null;
        this.angle = null;
        this.ballOringinPosition = null;
        this.lfetTimerId = null;
        this.topTimerId = null;
        // 相对球场原坐标
        this.origin = {
            x:field.fieldX,
            y:field.fieldY
        }
        this.scale = Number(field.scale);
        this.ballMoveTime = 0;
        this.init();
        // 监听停球事件
        this.stop();
        // 监听被踢事件
        this.kicked();
    }
    // 初始化
    init() {
        this.position = 
            this.position !== 'random' ? 
                {x: this.position.x * this.scale, y: this.position.y * this.scale} 
                    : {x: Math.random() * this.field.filedWidth  * this.scale, 
                        y: Math.random() * this.field.filedHeight  * this.scale};
        // 相对与球场的原点
        this.position.x += Number(this.origin.x);
        this.position.y += Number(this.origin.y);
        const RADIUS = this.radius  * this.scale;
        // 绘制
        this.ballDom = document.createElement('div');
        this.ballDom.setAttribute('class', 'ball');
        this.ballDom.setAttribute('style', `left:${this.position.x}px; top:${this.position.y}px;
                                    width:${RADIUS * 2}px; height:${RADIUS * 2}px;`);
        document.getElementById('container').appendChild(this.ballDom);
    }
    /**
     * 设置球的位置
     */
    setPositions({x, y}) {
        const RADIUS = this.radius  * this.scale;
        this.position = {
            x: x * this.scale,
            y: y * this.scale
        };
        // 相对与球场的原点
        this.position.x += Number(this.origin.x);
        this.position.y += Number(this.origin.y);
        this.ballDom.setAttribute('style', `left:${this.position.x}px; top:${this.position.y}px;
        width:${RADIUS * 2}px; height:${RADIUS * 2}px;`);
    }
    // 滚动
    /**     ↗|
     *    ↗  |
     *  ↗    |
     * ------+ 已知斜边也就是路程，还有角度，使用sin和cos就能求出坐标偏量
     */
    move({direction, initialVelocity, acceleration}) {
        this.acceleration = acceleration;
        this.initialVelocity = initialVelocity;
        // 路程 -V0^2 / 2a
        const S = - Math.pow(initialVelocity, 2) / (2 * acceleration);
        // 时间 (自然运动到速度为零) a = (Vt - V0) / t
        const T = -initialVelocity / acceleration;
        // 转化为弧度
        const θ = direction * 0.017453293;
        this.angle = θ;
        let xBias = Math.cos(θ) * S * this.scale;
        let yBias = Math.sin(θ) * S * this.scale;
        // let dirX = Math.floor(this.position.x + xBias);
        // let dirY = Math.floor(this.position.y - yBias); 
        let currentX = Number(this.ballDom.style.left.replace('px', ''))
        let currentY = Number(this.ballDom.style.top.replace('px', '') )
        let dirX = Math.floor( currentX + xBias);
        let dirY = Math.floor( currentY- yBias); 
        // console.log(this.position, `angle:${direction}`, `x:${Math.floor(xBias)}`, `y:${Math.floor(yBias)}`)
        let ballAnimate_y = new Animate(this.ballDom);
        let ballAnimate_x = new Animate(this.ballDom);
        // 修改了start函数 增加一个起始位置参数 不然动画运动有bug
        this.leftTimerId = ballAnimate_y.start('top', currentY, dirY, T * 1000,'strongEaseOut');
        this.topTimerId = ballAnimate_x.start('left', currentX, dirX, T * 1000,'strongEaseOut');
        this.ballMoveTime = T;

        this.ballOringinPosition = {
            x:this.position.x,
            y:this.position.y
        }
        // 更新位置
        this.position.x = dirX;
        this.position.y = dirY;
        
    }
    // 停球
    stop() {
        const RADIUS = this.radius * this.scale;
        this.observer.setListener('stopBall', this.id, (e)=>{
            this.ballDom.setAttribute('style', 
                `left:${e.x}; top:${e.y};
                width:${RADIUS * 2}px; height:${RADIUS * 2}px;`)
                clearInterval(this.leftTimerId);
                clearInterval(this.topTimerId);
        })
    }
    /**
     * 被踢
     */
    kicked() {
        this.observer.setListener('kick', this.id, e => {
            clearInterval(this.leftTimerId);
            clearInterval(this.topTimerId);
            this.move({direction:e.direction, initialVelocity:e.initialVelocity, acceleration:e.acceleration})
        });
    }
}

/**
 * 获取服从正态分布的随机数
 * https://www.cnblogs.com/zztt/p/4025207.html
 * @param {number} mean 平均数
 * @param {number} std_dev 标准差
 */
function getNumberInNormalDistribution(mean,std_dev){
    return mean+(randomNormalDistribution()*std_dev);
}

function randomNormalDistribution(){
    var u=0.0, v=0.0, w=0.0, c=0.0;
    do{
        //获得两个（-1,1）的独立随机变量
        u=Math.random()*2-1.0;
        v=Math.random()*2-1.0;
        w=u*u+v*v;
    }while(w==0.0||w>=1.0)
    //这里就是 Box-Muller转换
    c=Math.sqrt((-2*Math.log(w))/w);
    //返回2个标准正态分布的随机数，封装进一个数组返回
    //当然，因为这个函数运行较快，也可以扔掉一个
    //return [u*c,v*c];
    return u*c;
}