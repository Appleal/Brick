(function () {
    window.Ball = function (main) {
        this.x = main.ball_x;                      // x轴坐标
        this.y = main.ball_y;                     // y轴坐标
        this.w = 18;                                // 图片宽度
        this.h = 18;                                // 图片高度
        this.speedX = 1;                            // x轴速度
        this.speedY = 5;                            // y轴速度
        this.image = main.imageFromPath(main.allImg.ball);    // 图片对象
        this.fired = false;                                  //是否运动，默认静止
    };
    Ball.prototype.move = function (game) {
        if (this.fired) {
            // 碰撞边界检测
            if (this.x < 0 || this.x > 1000 - this.w) {
                this.speedX *= -1
            }
            if (this.y < 0) {
                this.speedY *= -1
            }
            if (this.y > 500 - this.h) {
                // 游戏结束
                game.state = game.state_GAMEOVER;
            }
            // 移动
            this.x -= this.speedX;
            this.y -= this.speedY;
        }
    }
})()