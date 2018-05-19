(function () {
    window.Game = function () {
        var g = {
            actions: {},                                                  // 记录按键动作
            keydowns: {},                                                 // 记录按键keycode
            state: 1,                                                     // 游戏状态值，初始默认为1
            state_START: 1,                                               // 开始游戏
            state_RUNNING: 2,                                             // 游戏开始运行
            state_STOP: 3,                                                // 暂停游戏
            state_GAMEOVER: 4,                                            // 游戏结束
            state_UPDATE: 5,                                              // 游戏通关
            canvas: document.getElementById("canvas"),                    // canvas元素
            ctx: document.getElementById("canvas").getContext("2d"),  // canvas画布
            timer: null,                                                  // 轮询定时器
            fps: 60                                                    // 动画帧数，默认60
        };
        Object.assign(this, g)
    }
    Game.prototype.draw = function(paddle, ball, blockList, score){
        var g = this
        // 清除画布
        g.ctx.clearRect(0, 0, g.canvas.width, g.canvas.height)
        // 绘制背景图
        g.drawBg();
        // 绘制挡板
        g.drawImage(paddle);
        // 绘制小球
        g.drawImage(ball);
        // 绘制砖块
        g.drawAllBlock(blockList)
        // 绘制分数
        g.drawText(score)
    }
    // 绘制图片
    Game.prototype.drawImage =function(obj) {
        this.ctx.drawImage(obj.image, obj.x, obj.y)
    }
    // 绘制背景图
    Game.prototype.drawBg =function() {
        var bg = main.imageFromPath(main.allImg.background)
        this.ctx.drawImage(bg, 0, 0)
    }
    // 绘制所有砖块
    Game.prototype. drawAllBlock =function(list) {
        for (var item of list) {
            this.drawImage(item)
        }
    }
    // 绘制计数板
    Game.prototype. drawText =function(obj) {
        this.ctx.font = '24px Microsoft YaHei'
        this.ctx.fillStyle = '#fff'
        // 绘制分数
        this.ctx.fillText(obj.text + obj.allScore, obj.x, obj.y)
        // 绘制关卡
        this.ctx.fillText(obj.textLv + obj.lv, this.canvas.width - 100, obj.y)
    }
    Game.prototype.clear = function(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
    // 游戏结束
    Game.prototype. gameOver =function() {
        // 清除定时器
        clearInterval(this.timer)
        // 清除画布
         this.clear();
        // 绘制背景图
         this.drawBg()
        // 绘制提示文字
        this.ctx.font = '48px Microsoft YaHei';
        this.ctx.fillStyle = '#fff';
        this.ctx.fillText('游戏结束', 404, 226);
    }
    // 游戏晋级
    Game.prototype. goodGame =function() {
        // 清除定时器
        clearInterval(this.timer)
        // 清除画布
       this.clear()
        // 绘制背景图
        this.drawBg()
        // 绘制提示文字
        this.ctx.font = '48px Microsoft YaHei';
        this.ctx.fillStyle = '#fff';
        this.ctx.fillText('恭喜晋级下一关卡', 308, 226)
    }
    // 游戏通关
    Game.prototype.finalGame =function() {
        // 清除定时器
        clearInterval(this.timer)
        // 清除画布
        this.clear();
        // 绘制背景图
        this.drawBg()
        // 绘制提示文字
        this.ctx.font = '48px Microsoft YaHei'
        this.ctx.fillStyle = '#fff'
        this.ctx.fillText('恭喜通关全部关卡', 308, 226)
    }
    // 注册事件
    Game.prototype. registerAction=function(key, callback) {
        this.actions[key] = callback
    }
    // 小球碰撞砖块检测
    Game.prototype. checkBallBlock =function(g, paddle, ball, blockList, score) {
        var p = paddle, b = ball;
        // 小球碰撞挡板检测
        if (p.collide(b)) {
            // 当小球运动方向趋向挡板中心时，Y轴速度取反，反之则不变
            if (Math.abs(b.y + b.h/2 - p.y + p.h/2) > Math.abs(b.y + b.h/2 + b.speedY - p.y + p.h/2)) {
                b.speedY *= -1
            } else {
                b.speedY *= 1
            }
            // 设置X轴速度
            b.speedX = p.collideRange(b)
        }
        // 小球碰撞砖块检测
        blockList.forEach(function (item, i, arr) {
            if (item.collide(b)) { // 小球、砖块已碰撞
                if (!item.alive) { // 砖块血量为0时，进行移除
                    arr.splice(i, 1)
                }
                // 当小球运动方向趋向砖块中心时，速度取反，反之则不变
                if ((b.y < item.y && b.speedY < 0) || (b.y > item.y && b.speedY > 0)) {
                    if (!item.collideBlockHorn(b)) {
                        b.speedY *= -1
                    } else { // 当小球撞击砖块四角时，Y轴速度不变
                        b.speedY *= 1
                    }
                } else {
                    b.speedY *= 1
                }
                // 当小球撞击砖块四角时，X轴速度取反
                if (item.collideBlockHorn(b)) {
                    b.speedX *= -1
                }
                // 计算分数
                score.computeScore()
            }
        })
        // 挡板移动时边界检测
        if (p.x <= 0) { // 到左边界时
            p.isLeftMove = false
        } else {
            p.isLeftMove = true
        }
        if (p.x >= 1000 - p.w) { // 到右边界时
            p.isRightMove = false
        } else {
            p.isRightMove = true
        }
        // 移动小球
        b.move(g)
    }
    // 设置逐帧动画
    Game.prototype.setTimer=function (paddle, ball, blockList, score) {
        var g = this
        g.timer = setInterval(function () {
            // actions集合
            var actions = Object.keys(g.actions)
            for (var i = 0; i < actions.length; i++) {
                var key = actions[i]
                if(g.keydowns[key]) {
                    // 如果按键被按下，调用注册的action
                    g.actions[key]()
                }
            }
            // 当砖块数量为0时，挑战成功
            if (blockList.length == 0) {
                // 升级通关
                g.state = g.state_UPDATE
                // 挑战成功，渲染下一关卡场景
                g.goodGame()
            }
            // 判断游戏是否结束
            if (g.state === g.state_GAMEOVER) {
                g.gameOver()
            }
            // 判断游戏开始时执行事件
            if (g.state === g.state_RUNNING) {
                g.checkBallBlock(g, paddle, ball, blockList, score)
                // 绘制游戏所有素材
                g.draw(paddle, ball, blockList, score)
            } else if (g.state === g.state_START){
                // 绘制游戏所有素材
                g.draw(paddle, ball, blockList, score)
            }
        }, 1000/g.fps)
    }
    
     //初始化函数
     //main: 游戏入口函数对象
    Game.prototype.init = function(main) {
        var
            g = this,
            paddle = main.paddle,
            ball = main.ball,
            blockList = main.blockList,
            score = main.score
        // 设置键盘按下及松开相关注册函数
        window.addEventListener('keydown', function (event) {
            g.keydowns[event.keyCode] = true
        })
        window.addEventListener('keyup', function (event) {
            g.keydowns[event.keyCode] = false
        })
        g.registerAction = function (key, callback) {
            g.actions[key] = callback
        }
        // 注册左方向键移动事件
        g.registerAction('37', function(){
            // 判断游戏是否处于运行阶段
            if (g.state === g.state_RUNNING && paddle.isLeftMove) {
                paddle.moveLeft()
            }
        })
        // 注册右方向键移动事件
        g.registerAction('39', function(){
            // 判断游戏是否处于运行阶段
            if (g.state === g.state_RUNNING && paddle.isRightMove) {
                paddle.moveRight()
            }
        })
        window.addEventListener('keydown', function (event) {
            switch (event.keyCode) {
                // 注册空格键发射事件
                case 32 :
                    if (g.state === g.state_GAMEOVER) { // 游戏结束时
                        // 开始游戏
                        g.state = g.state_START
                        // 初始化
                        main.start()
                    } else {
                        // 开始游戏
                        ball.fired = true
                        g.state = g.state_RUNNING
                    }
                    break
                // r 键进入下一关卡
                case 82 :
                    // 游戏状态为通关，且不为最终关卡时
                    if (g.state === g.state_UPDATE && _main.LV !== MAXLV) { // 进入下一关
                        // 开始游戏
                        g.state = g.state_START
                        // 初始化下一关卡
                        main.start(++main.LV)
                    } else if (g.state === g.state_UPDATE && main.LV === MAXLV) { // 到达最终关卡
                        g.finalGame()
                    }
                    break
                // q 键暂停游戏事件
                case 81 :
                    g.state = g.state_STOP;
                    break
            }
        })
        // 设置轮询定时器
        g.setTimer(paddle, ball, blockList, score)
    }



})()