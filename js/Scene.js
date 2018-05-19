
(function () {
    window.Scene = function (lv) {
        this.lv = lv;                                        // 游戏难度级别
        this.canvas = document.getElementById("canvas");      // canvas对象
        this.blockList = [];
    };
    Scene.prototype.initBlockList = function () {
        this.createBlockList();
        var arr = [];
        for (var item of this.blockList) {
            for (var list of item) {
                if (list.type === 1) {
                    var obj = new Block(list.x, list.y)
                    arr.push(obj)
                } else if (list.type === 2) {
                    var obj = new Block(list.x, list.y, 2)
                    arr.push(obj)
                }
            }
        }
        return arr;
    };
    // 创建砖块坐标二维数组，并生成不同关卡
    Scene.prototype.createBlockList = function () {
        var lv = this.lv,                         // 游戏难度级别
            c_w = this.canvas.width,              // canvas宽度
            c_h = this.canvas.height,             // canvas高度
            xNum_max = c_w / 50,                    // x轴砖块最大数量
            yNum_max = 12,                        // y轴砖块最大数量
            x_start = 0,                          // x轴起始坐标，根据砖块数量浮动
            y_start = 60 ;                         // y轴起始坐标，默认从60起

        switch (lv) {
            case 1 : // 正三角形
                var xNum = 16,                               // x轴砖块第一层数量
                    yNum = 9;                                 // y轴砖块层数
                // 循环y轴
                for (var i = 0; i < yNum; i++) {
                    var arr = []
                    // 修改每层x轴砖块数量
                    if (i === 0) {
                        xNum = 1
                    } else if (i === 1) {
                        xNum = 2
                    } else {
                        xNum += 2
                    }
                    x_start = (xNum_max - xNum) / 2 * 50 ;            // 修改每层x轴砖块起始坐标
                    // 循环x轴
                    for (var k = 0; k < xNum; k++) {
                        if (i < 3) { // 前三排为特殊砖块
                            arr.push({
                                x: x_start + k * 50,
                                y: y_start + i * 20,
                                type: 2,
                            })
                        } else {
                            arr.push({
                                x: x_start + k * 50,
                                y: y_start + i * 20,
                                type: 1,
                            })
                        }
                    }
                    this.blockList.push(arr)
                }
                break;
            case 2 :  // 倒三角形
                var xNum = 16,                              // x轴砖块第一层数量
                    yNum = 9                                // y轴砖块层数
                // 循环y轴
                for (var i = 0; i < yNum; i++) {
                    var arr = []
                    // 修改每层x轴砖块数量
                    if (i === yNum - 1) {
                        xNum = 1
                    } else if (i === 0) {
                        xNum = xNum
                    } else {
                        xNum -= 2
                    }
                    x_start = (xNum_max - xNum) / 2 * 50             // 修改每层x轴砖块起始坐标
                    // 循环x轴
                    for (var k = 0; k < xNum; k++) {
                        if (i < 3) { // 前三排为特殊砖块
                            arr.push({
                                x: x_start + k * 50,
                                y: y_start + i * 20,
                                type: 2,
                            })
                        } else {
                            arr.push({
                                x: x_start + k * 50,
                                y: y_start + i * 20,
                                type: 1,
                            })
                        }
                    }
                    this.blockList.push(arr)
                }
                break;
            case 3 : // 工字形
                var xNum = 16,                              // x轴砖块第一层数量
                    yNum = 9                                // y轴砖块层数
                // 循环y轴
                for (var i = 0; i < yNum; i++) {
                    var arr = []
                    // 修改每层x轴砖块数量
                    if (i === 0) {
                        xNum = xNum
                    } else if (i > 4) {
                        xNum += 2
                    } else {
                        xNum -= 2
                    }
                    x_start = (xNum_max - xNum) / 2 * 50             // 修改每层x轴砖块起始坐标
                    // 循环x轴
                    for (var k = 0; k < xNum; k++) {
                        if (i < 3) { // 前三排为特殊砖块
                            arr.push({
                                x: x_start + k * 50,
                                y: y_start + i * 20,
                                type: 2,
                            })
                        } else {
                            arr.push({
                                x: x_start + k * 50,
                                y: y_start + i * 20,
                                type: 1,
                            })
                        }
                    }
                    this.blockList.push(arr)
                }
                break
        }
    }
})();