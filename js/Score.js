(function () {
    window.Score = function (main) {
        this.x = main.score_x;                               // x轴坐标
        this.y = main.score_y;                               // y轴坐标
        this.text = '分数：';                                 // 文本分数
        this.textLv = '关卡：';                               // 关卡文本
        this.score = 200;                                     // 每个砖块对应分数
        this.allScore = 0;                                    // 总分
        this.blockList = main.blockList;                     // 砖块对象集合
        this.blockListLen = main.blockList.length;           // 砖块总数量
        this.lv = main.LV;
    };
    // 计算总分
    Score.prototype.computeScore = function() {
        var num = 0;
        var allNum = this.blockListLen;
        num = this.blockListLen - this.blockList.length;
        this.allScore = this.score * num
    }

})();