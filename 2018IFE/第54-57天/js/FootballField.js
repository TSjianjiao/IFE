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
        // 场地设置
        this.canvasDom = document.getElementById('my-canvas');
        this.ctx = this.canvasDom.getContext('2d');
        this.filedWidth = filedWidth;
        this.filedHeight = filedHeight;
        // 容器设置
        this.containerDom = document.getElementById('container');
        this.fieldContainerWidth = fieldContainerWidth;
        this.fieldContainerHeight = fieldContainerHeight;
        this.scale = Number(this.fieldContainerHeight / this.filedHeight / 1.2);
        // 球场坐标
        this.fieldX = null;
        this.fieldY = null;
        this.init()
    }
    init() {
        // 容器
        this.containerDom.setAttribute('style', 
        `width:${this.fieldContainerWidth}px; height:${this.fieldContainerHeight}px`);
        // 矩形 缩小了1.2倍
        const WIDTH = this.filedWidth * this.scale;
        const HEIGHT = this.filedHeight * this.scale;
        this.canvasDom.setAttribute('width', WIDTH);
        this.canvasDom.setAttribute('height', HEIGHT);
        // 绘制球场
        this.fieldX = (Number(this.fieldContainerWidth) - WIDTH) / 2;
        this.fieldY = (Number(this.fieldContainerHeight) - HEIGHT) / 2;
        this.canvasDom.setAttribute('style', 
        `position:absolute; top:${this.fieldY}px; left:${this.fieldX}px`);
        this.ctx.fillStyle="#0c5206";
        this.ctx.fillRect(0, 0, WIDTH, HEIGHT);
    }
}

/**
 * 球员类
 */
let playerId = 0;
class Player extends FootballField{
    constructor(field, {x=0, y=0}={}) {
        super('player');
        this.observer = Observer.getInstance();
        this.id = playerId++;
        // 相对球场原坐标
        this.origin = {
            x:field.fieldX,
            y:field.fieldY
        }
        this.field = field;
        this.playerDom = null;
        // 球员位置
        this.x = x * Number(field.scale) + Number(this.origin.x);
        this.y = y * Number(field.scale) + Number(this.origin.y);
        this.radius = 1;
        // 球员数据
        this.speed = 1; // 速度值 （影响最高速度
        this.maxSpeed = 1;// 速度值对应的最高速度
        this.explosiveness = 1;// 爆发力值 （影响到达最高速度耗时
        this.toMaxSpeed = 1;// 达到最高速度耗时
        this.strength = 1;// 体力值 （影响最高速度持续时间
        this.keepSpeed = 1;// 高速度持续时间
        this.init(field);
    }
    init(field) {
        const SCALE = Number(field.scale);
        const RADIUS = Math.ceil(this.radius * SCALE);
        this.playerDom = document.createElement('div');
        // 绘制
        this.playerDom.setAttribute('class', 'player');
        this.playerDom.setAttribute('style', `left:${this.x}px; top:${this.y}px;
                                    width:${RADIUS * 2}px; height:${RADIUS * 2}px;`);
        document.getElementById('container').appendChild(this.playerDom);
        // 设置球员数据
        this.speed = Math.floor(Math.random() * 110);
        this.maxSpeed = Math.floor(3 + (this.speed - 1) * ( 9 / 98 ));
        this.explosiveness = Math.floor(Math.random()) * 110;
        this.toMaxSpeed = Math.floor((3 / 98) * (1 - this.explosiveness) + 4);
        this.strength = Math.floor(Math.random() * 110);
        this.keepSpeed = Math.floor((5 / 98) * (this.strength - 1) + 10);
    }
    /**
     * 奔跑
     */
    run({to_x = 0, to_y = 0} = {}) {
        const SCALE = Number(this.field.scale);
        const RADIUS = Math.ceil(this.radius * SCALE);
        // 总的距离 用x方向作参考
        const X = Math.floor(to_x * SCALE);
        const Y = Math.floor(to_y * SCALE);
        const ACC = this.maxSpeed / this.toMaxSpeed;
        // 到达最大速度时，跑过的距离
        const DISTANCE_1 = Math.floor(this.maxSpeed * this.toMaxSpeed / 2);
        // 匀速阶段 距离
        const DISTANCE_2 = Math.floor(this.maxSpeed * this.keepSpeed);
        let time;
        const x = Number(to_x);
        if(DISTANCE_1 >= x) {
            // 总时间
           time = Math.floor(Math.sqrt(2 * x / ACC));
        }
        else if (DISTANCE_1 < x && x < DISTANCE_2) {
            const LEFT = x - DISTANCE_1;
            time = Math.floor(this.toMaxSpeed + LEFT / this.toMaxSpeed);
        }
        else {
            time = this.toMaxSpeed + this.keepSpeed + 1;
        }
        console.log(this.id, 
            `x:${x}`,
            `scale:${SCALE}`, 
            `maxSpeed:${this.maxSpeed}`,
            `toMaxSpeed:${this.toMaxSpeed}`,
            `keep:${this.keepSpeed}`,
            `ACC:${ACC}`, 
            `DISTANCE_1:${DISTANCE_1}`, 
            `DISTANCE_2:${DISTANCE_2}`, 
            `time:${time}`)
        // 更新位置
        this.x = X + Number(this.origin.x);
        this.y = Y + Number(this.origin.y);
        this.playerDom.setAttribute('style', `left:${this.x}px; top:${this.y}px;
        width:${RADIUS * 2}px; height:${RADIUS * 2}px; 
        transition: all ${time}s cubic-bezier(.05,.75,.42,1)`);
    }
}