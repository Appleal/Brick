(function () {
    window.Block = function (x, y, life=1) {
        this.x = x;
        this.y = y;
        this.w = 50;
        this.h = 20;
        this.life = life;
        this.image = life === 1 ? main.imageFromPath(main.allImg.block1) : main.imageFromPath(main.allImg.block2);
        this.alive = true;
    }
    //消除
    Block.prototype.kill = function () {
        this.life--;
        if (this.life === 0) {
            this.alive = false;
        } else {
            this.alive = true;
        }
    }
    //检测碰撞
    Block.prototype.collide = function (ball) {
        var b = ball;
        if (Math.abs((b.x + b.w / 2) - (this.x + this.w / 2)) < (b.w + this.w) / 2 &&
            Math.abs((b.y + b.h / 2) - (this.y + this.h / 2)) < (b.h + this.h) / 2) {
            this.kill();
            return true;
        } else {
            return false;
        }
    }
    //小球砖块碰撞后x轴的方向
    Block.prototype.collideBlockHorn = function (ball) {
        var b = ball;
        var delX = 0;
        var delY = 0;
        delX = Math.abs((b.x + b.w / 2) - (this.x + this.w / 2));
        delY = Math.abs((b.y + b.h / 2) - (this.y + this.h / 2));
        if (delX > this.w / 2 && delX < (b.w + this.w) / 2 && delY < (this.h / 2 + b.h / 2)) {//x轴方向与砖块四角相交
            if (b.x < this.x && b.speedX > 0 || b.x > this.x && b.speedX < 0) {
                //小球在砖块的左侧时
                return false;
            } else {//小球在砖块的右侧
                return true;
            }
        }
        return false;

    }
})()