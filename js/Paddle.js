(function () {
    window.Paddle = function (main) {
        this.x = main.paddle_x;                                  // x轴坐标
        this.y = main.paddle_y;                                   // y轴坐标
        this.w = 102;                                              // 图片宽度
        this.h = 22;                                               // 图片高度
        this.speed = 10;                                           // x轴移动速度
        this.ballSpeedMax = 8;                                   // 小球反弹速度最大值
        this.image = main.imageFromPath(main.allImg.paddle);                 // 引入图片对象
        this.isLeftMove = true;                                   // 能否左移
        this.isRightMove = true;
    }
    Paddle.prototype.moveLeft = function () {
        this.x -= this.speed
    }
    Paddle.prototype.moveRight = function () {
        this.x += this.speed
    }
    // 小球、挡板碰撞检测
    Paddle.prototype.collide = function(ball) {
        var b = ball,p=this;
        if (Math.abs((b.x + b.w/2) - (p.x + p.w/2)) < (b.w + p.w)/2 &&
            Math.abs((b.y + b.h/2) - (p.y + p.h/2)) < (b.h + p.h)/2) {
            return true
        }
        return false
    }
    // 计算小球、挡板碰撞后x轴速度值
    Paddle.prototype.collideRange =function(ball) {
        var b = ball;
        var p = this;
        var rangeX = 0;
        rangeX = (p.x + p.w/2) - (b.x + b.w/2)
        if (rangeX < 0) { // 小球撞击挡板左侧
            return rangeX / (b.w/2 + p.w/2) * p.ballSpeedMax
        } else if (rangeX > 0) { // 小球撞击挡板右侧
            return rangeX / (b.w/2 + p.w/2) * p.ballSpeedMax
        }
    }

})()