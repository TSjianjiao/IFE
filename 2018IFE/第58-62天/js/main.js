/**
 * @file 主文件
 */

 // 返回filed类
const createField = FootballField.getFactory('field');
// 容器大小单位是像素  球场大小单位是米
let filed = new createField({
    fieldContainerHeight:600,
    fieldContainerWidth:800,
    filedWidth: 120,
    filedHeight: 90
})
 // 返回player类
const createPlayer = FootballField.getFactory('player');
let player_1 = new createPlayer(filed, {
    x:0,
    y:0
});
let player_2 = new createPlayer(filed, {
    x:0,
    y:0
});

// 球加速度
const ACC = -7;
// 返回ball类
const createBall = FootballField.getFactory('ball');
let ball = new createBall(filed, {
    radius:0.5,
    position:{x:0, y:0},
})


// 测试
// 更改球员位置
document.getElementById('playerX').addEventListener('input', e => {
    const Y = document.getElementById('playerY').value;
    player_1.setPositions({
        x: e.target.value,
        y:Y,
    });
    document.getElementById('playerXP').innerText = `${e.target.value}m`;
})
document.getElementById('playerY').addEventListener('input', e => {
    const X = document.getElementById('playerX').value;
    player_1.setPositions({
        x: X,
        y: e.target.value,
    });
    document.getElementById('playerYP').innerText = `${e.target.value}m`;
})
// document.getElementById('playerX2').addEventListener('input', e => {
//     const Y = document.getElementById('playerY2').value;
//     player_2.setPositions({
//         x: e.target.value,
//         y:Y,
//     });
//     document.getElementById('playerXP2').innerText = `${e.target.value}m`;
// })
// document.getElementById('playerY2').addEventListener('input', e => {
//     const X = document.getElementById('playerX2').value;
//     player_2.setPositions({
//         x: X,
//         y: e.target.value,
//     });
//     document.getElementById('playerYP2').innerText = `${e.target.value}m`;
// })
// 球角度设置
document.getElementById('ballAngleInput').addEventListener('input', e=>{
    document.getElementById('ballAngle').innerText = `${e.target.value}°`;
    const θ = e.target.value * 0.017453293;
    let xBias = Math.cos(θ) * 10 * ball.scale;
    let yBias = Math.sin(θ) * 10 * ball.scale;
    let dirX = Math.floor(Number(ball.position.x) + xBias);
    let dirY = Math.floor(Number(ball.position.y) - yBias);
    document.getElementById('target-ball').setAttribute('style', 
                                                    `position:absolute; 
                                                    top:${dirY}px; left:${dirX}px; 
                                                    width:10px; height:10px;
                                                    z-index:1`);
})
// 球员角度设置
document.getElementById('playerAngleInput').addEventListener('input', e=>{
    document.getElementById('playerAngle').innerText = `${e.target.value}°`;
    const θ = e.target.value * 0.017453293;
    let xBias = Math.cos(θ) * 10 * player_1.scale;
    let yBias = Math.sin(θ) * 10 * player_1.scale;
    let dirX = Math.floor(Number(player_1.x) + xBias);
    let dirY = Math.floor(Number(player_1.y) - yBias);
    document.getElementById('target-player').setAttribute('style', 
                                                    `position:absolute; 
                                                    top:${dirY}px; left:${dirX}px; 
                                                    width:10px; height:10px;
                                                    z-index:1`);
})
// document.getElementById('playerAngleInput2').addEventListener('input', e=>{
//     document.getElementById('playerAngle2').innerText = `${e.target.value}°`;
//     const θ = e.target.value * 0.017453293;
//     let xBias = Math.cos(θ) * 10 * player_2.scale;
//     let yBias = Math.sin(θ) * 10 * player_2.scale;
//     let dirX = Math.floor(Number(player_2.x) + xBias);
//     let dirY = Math.floor(Number(player_2.y) - yBias);
//     document.getElementById('target-player-2').setAttribute('style', 
//                                                     `position:absolute; 
//                                                     top:${dirY}px; left:${dirX}px; 
//                                                     width:10px; height:10px;
//                                                     z-index:1`);
// })
// 踢球
document.getElementById('kick-1').onclick = ()=>{
    if(ball.ballDom.style.left == player_1.playerDom.style.left 
        && ball.ballDom.style.top == player_1.playerDom.style.top) {
            player_1.kickBall({
                direction:document.getElementById('ballAngleInput').value, // 角度
                acceleration:ACC,// m/s^2
            })
        }
}

// 更改球员数据
document.getElementById('playerSpeed').addEventListener('input', e => {
    player_1.speed = Number(e.target.value);
    player_1.maxSpeed = Math.floor(3 + (Number(e.target.value) - 1) * ( 9 / 98 ));
    document.getElementById('playerSp').innerText = e.target.value;
})
document.getElementById('playerExplosiveness').addEventListener('input', e => {
    player_1.explosiveness = Number(e.target.value);
    player_1.toMaxSpeed = Math.floor((3 / 98) * (1 - Number(e.target.value)) + 4);
    document.getElementById('playerEx').innerText = e.target.value;
})
document.getElementById('playerStrength').addEventListener('input', e => {
    player_1.strength = Number(e.target.value);
    player_1.keepSpeed = Math.floor((5 / 98) * (Number(e.target.value) - 1) + 10);
    document.getElementById('playerSt').innerText = e.target.value;
})
document.getElementById('playerTech').addEventListener('input', e => {
    player_1.tech = Number(e.target.value);
    player_1.relaStdDev = (0.29 / 98) * (1 - Number(e.target.value)) + 0.3;
    player_1.steDev = player_1.relaStdDev * player_1.maxBallInitialSpeed;
    document.getElementById('playerTec').innerText = e.target.value;
})
document.getElementById('playerPower').addEventListener('input', e => {
    player_1.power = Number(e.target.value);
    player_1.maxBallInitialSpeed = Math.floor(45 * Number(e.target.value) / 98 + 445 / 98);
    document.getElementById('playerPow').innerText = e.target.value;
})

// 追球
// document.getElementById('chasing').addEventListener('click', ()=>{
//     player_2.chasing(ball);
// })
document.getElementById('chasing-1').addEventListener('click', ()=>{
    player_1.chasing(ball);
})

// 朝设置方向跑
document.getElementById('run').addEventListener('click', ()=>{
    // console.log(ball.position)
    // console.log(player_1)
    const angle = document.getElementById('playerAngleInput').value;
    const θ = angle * 0.017453293;
    let xBias = Math.cos(θ) * 20 * player_1.scale;
    let yBias = Math.sin(θ) * 20 * player_1.scale;
    let dirX = Math.floor(Number(player_1.x) + xBias);
    let dirY = Math.floor(Number(player_1.y) - yBias);
    player_1.run({
        x:dirX,
        y:dirY
    }, function cb(){console.log('奔跑完成')})

})

// 设置球的位置
document.getElementById('ballX').addEventListener('input', e => {
    const Y = document.getElementById('ballY').value;
    ball.setPositions({
        x: e.target.value,
        y:Y,
    });
    document.getElementById('ballXP').innerText = `${e.target.value}m`;
})
document.getElementById('ballY').addEventListener('input', e => {
    const X = document.getElementById('ballX').value;
    ball.setPositions({
        x: X,
        y:e.target.value,
    });
    document.getElementById('ballYP').innerText = `${e.target.value}m`;
})

// 带球运动然后踢球
document.getElementById('withBallKick').addEventListener('click', () => {
    if(ball.ballDom.style.left === player_1.playerDom.style.left 
        && ball.ballDom.style.top === player_1.playerDom.style.top) {
        let playerAngel = document.getElementById('playerAngleInput').value;
        let ballAngel = document.getElementById('ballAngleInput').value;

        const θ = playerAngel * 0.017453293;
        let xBias = Math.cos(θ) * 20 * player_1.scale;
        let yBias = Math.sin(θ) * 20 * player_1.scale;
        let dirX = Math.floor(Number(player_1.x) + xBias);
        let dirY = Math.floor(Number(player_1.y) - yBias);
        let timerId = player_1.withBall({
            x:dirX,
            y:dirY
        }, ball);
        setTimeout(kick, 500)
        // 过一段时间踢球
        function kick() {
            clearInterval(timerId);
            player_1.kickBall({
                direction:ballAngel, // 角度
                acceleration:ACC,// m/s^2
            })
        }
    }
})
// 指定球移动
document.getElementById('ball-move').addEventListener('click', () => {
    ball.move({
        direction:document.getElementById('ballAngleInput').value,
        initialVelocity: 20,
        acceleration:ACC
    })
})
// 追逐后踢出
document.getElementById('chasing-kick').addEventListener('click', () => {
    player_1.chasingAndKick(ball);
})

