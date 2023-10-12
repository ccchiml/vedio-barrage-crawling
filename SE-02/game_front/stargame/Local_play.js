const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");
    const text1 = "游戏总局数：";
    const text2 = "player1筹码:";
    const text3 = "player2筹码:";
    const text4 = "投掷";

    // 从本地存储中读取用户输入的值并转换为整数
    const gameCount1 = parseInt(localStorage.getItem("gameCount1"), 10);
    const gameCount2 = parseInt(localStorage.getItem("gameCount2"), 10);
    const gameCount3 = parseInt(localStorage.getItem("gameCount3"), 10);

    const x1=90;
    const y1=50;
    // 绘制 gameCount1 到画布上
    context.font = `28px cursive`;
    context.lineWidth = 3;
    context.fillStyle = "#BF5454";
    context.strokeStyle = "#000"; // 黑色描边
    context.strokeText(text1 + gameCount1, x1 , y1);
    context.fillText(text1+ gameCount1, x1 , y1);

    context.font = `13px cursive`;
    context.lineWidth = 3;
    context.fillStyle = "#BF5454";
    context.strokeStyle = "#000"; // 黑色描边
    context.strokeText(text2 + gameCount2, x1-75 , y1+60);
    context.fillText(text2 + gameCount2, x1-75 , y1+60);
    context.strokeText(text3 + gameCount3, x1+125 , y1+60);
    context.fillText(text3 + gameCount3, x1+125 , y1+60);

    const textBoxX = 116; // 文本框的 X 坐标
    const textBoxY = 560; // 文本框的 Y 坐标
    const textBoxWidth = 140; // 文本框的宽度
    const textBoxHeight = 50; // 文本框的高度
    const textBoxColor = "#BF5454"; // 透明


    CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
        if (w < 2 * r) r = w / 2;
        if (h < 2 * r) r = h / 2;
        this.beginPath();
        this.moveTo(x + r, y);
        this.arcTo(x + w, y, x + w, y + h, r);
        this.arcTo(x + w, y + h, x, y + h, r);
        this.arcTo(x, y + h, x, y, r);
        this.arcTo(x, y, x + w, y, r);
        this.closePath();
        return this;
    };

    context.fillStyle = textBoxColor;

    // 绘制圆角文本框
    context.roundRect(textBoxX, textBoxY, textBoxWidth, textBoxHeight, 10).fill();

    context.font="36px cursive";
    context.fillStyle="#000000";
    const textWidth = context.measureText(text4).width;
    const textHeight = 20; // 假设文本高度为20px

    // 计算文本的居中坐标
    const centerX = textBoxX + (textBoxWidth - textWidth) / 2;
    const centerY = textBoxY + (textBoxHeight + textHeight) / 2;

    // 在文本框内居中绘制文本
    context.fillText(text4, centerX, centerY);
    const svgIcon = new Image();
    svgIcon.src = "images/touzi.svg"; // 请替换为您的SVG图标路径
    // 创建SVG图像
    function touzi(){
    const svgIcon = new Image();
    svgIcon.src = "images/touzi.svg"; // 请替换为您的SVG图标路径
    svgIcon.onload = function () {
        context.drawImage(svgIcon, 133, 290, 70, 70);
    };}
    touzi();
    const svgIcon1 = new Image();
    svgIcon1.src = "images/icon_gzkokw1qhi/4.svg"; // 请替换为您的SVG图标路径
    svgIcon1.onload = function () {
   //     context.drawImage(svgIcon1, 10, 120, 40, 40);
    };

    // 骰子的六个面
    const diceFaces = [
        
        "images/icon_gzkokw1qhi/1.svg",
        "images/icon_gzkokw1qhi/2.svg",
        "images/icon_gzkokw1qhi/3.svg",
        "images/icon_gzkokw1qhi/4.svg",
        "images/icon_gzkokw1qhi/5.svg",
        "images/icon_gzkokw1qhi/6.svg"
    ];
    let diceImages = [];
    let rotationAngle = 0;
    let animationStartTime = null;
    let dice1 = [];
    let dice2 = [];
    let Locked_zone_1=[];
    let Locked_zone_2=[];
    let total1=0;
    let total2=0;
    let l1;
    let l2;
    // 在全局范围内声明一个变量来保存点击事件监听器
    let clickEventListener 
    let shouldExitFunction = false;
    function simulateClick1(s, i, isRolling) {
        canvas.removeEventListener("click", clickEventListener);
       
        return new Promise(resolve => {
            // 移除之前的事件监听器
            canvas.removeEventListener("click", clickEventListener);
            
            // 创建新的点击事件监听器
            clickEventListener = function (event) {
                console.log("sss");
                const clickX = event.clientX - canvas.getBoundingClientRect().left;
                const clickY = event.clientY - canvas.getBoundingClientRect().top;
                const textBoxX = 116;
                const textBoxY = 560;
                const textBoxWidth = 140;
                const textBoxHeight = 50;

                if (
                    clickX >= textBoxX &&
                    clickX <= textBoxX + textBoxWidth &&
                    clickY >= textBoxY &&
                    clickY <= textBoxY + textBoxHeight
                ) {
                    if (!isRolling) {
                        isRolling = true;
                        console.log(s);
                        rollDice(s, i);
                    }
                    console.log(total1);

                    // 在异步操作完成后，调用 resolve 来继续执行主函数
                    setTimeout(() => {
                        resolve();
                    }, 10000); // 100毫秒的延时
                }
            };

            // 添加新的点击事件监听器
            canvas.addEventListener("click", clickEventListener);
        });
    }


     


    function rollDice(s,m) {
        const animationDuration = 5000; // 5秒
        const startTime = performance.now();
        let hasDrawnText = false;

        function animate(currentTime) {
            const elapsedTime = currentTime - startTime;

            if (elapsedTime < animationDuration) {
                rotationAngle += (360 / animationDuration) * elapsedTime;

                // 保存当前绘图状态
                context.save();

                // 设置旋转中心点为骰子的中心
                const centerX = 133 + 70 / 2;
                const centerY = 290 + 70 / 2;
                context.translate(centerX, centerY);
                context.rotate((rotationAngle * Math.PI) / 180); // 将角度转换为弧度并进行旋转

                // 绘制旋转后的骰子
                context.drawImage(svgIcon, -70 / 2, -70 / 2, 70, 70);
              
                // 恢复之前保存的绘图状态
                context.restore();

                requestAnimationFrame(animate);
            } else {
                   if(!hasDrawnText ){
                    rotationAngle = 0;
                    //isRolling = false;
                    // 动画完成后显示骰子结果
                    
                    showDiceResult(s,m);
                    
                    texting(s);
                  
                    
                   }
                
                }
            }
            requestAnimationFrame(animate);
        }
        
        function showDiceResult(s, m) {
            // 清空之前的骰子图像
            let generatedDiceCount = 0;
            diceImages.length = 0;
            
            // 保存当前绘图状态
            context.save();

            // 设置骰子结果的位置
            const resultX = 100; // 修改为适合您的位置
            const resultY = 400; // 修改为适合您的位置

            for (let i = 0; i < m; i++) {
                // 随机生成一个介于1和6之间的整数，以获取随机的骰子数字
                const randomDiceNumber = Math.floor(Math.random() * 6) + 1;
                
                const diceImage = new Image();
                const diceFace = getRandomDiceFace(randomDiceNumber); // 根据数字获取图像路径
                diceImage.src = diceFace;

                // 使用闭包保存当前循环的索引和骰子数字
                (function(index, number) {
                    diceImage.onload = function () {
                        context.drawImage(diceImage, resultX + index * 45, resultY, 35, 35);
                        
                        // 将骰子数字存储在全局变量 dice1 数组中
                        dice1[index] = number;

                        generatedDiceCount++; // 增加生成的骰子图像数量
                        
                        if (generatedDiceCount ===  m ) {
                            // 如果已生成玩家拥有的骰子数量个骰子图像，恢复之前保存的绘图状态
                            context.restore();

                            // 输出存储的骰子数字
                            console.log("Dice Info Array:", dice1);
                        }
                    };
                })(i, randomDiceNumber);

                diceImages.push(diceImage); // 将生成的图像保存到数组中
            }
        }

        function getRandomDiceFace(number) {
            // 根据数字选择相应的图像路径
            switch (number) {
                case 1:
                    return "images/icon_gzkokw1qhi/1.svg";
                case 2:
                    return "images/icon_gzkokw1qhi/2.svg";
                case 3:
                    return "images/icon_gzkokw1qhi/3.svg";
                case 4:
                    return "images/icon_gzkokw1qhi/4.svg";
                case 5:
                    return "images/icon_gzkokw1qhi/5.svg";
                case 6:
                    return "images/icon_gzkokw1qhi/6.svg";
                default:
                    // 处理无效数字的情况
                    return "";
            }
        }
        function clearCanvas(x,y,w,h) {
            context.clearRect(x, y, w ,h);
        }
        function clearTransparentTextBox() {
                        const textBoxX2 = 55; // 文本框的 X 坐标
                        const textBoxY2 = 150; // 文本框的 Y 坐标
                        const textBoxWidth2 = 250; // 文本框的宽度
                        const textBoxHeight2 = 200; // 文本框的高度
                        context.clearRect(textBoxX2, textBoxY2, textBoxWidth2, textBoxHeight2);
                
                       
                    }
        function texting(s){
     
        // 绘制透明文本
                    let currentText;
                    const textBoxX2 = 55; // 文本框的 X 坐标
                    const textBoxY2 = 150; // 文本框的 Y 坐标
                    const textBoxWidth2 = 250; // 文本框的宽度
                    const textBoxHeight2 = 200; // 文本框的高度
                    const textBoxColor2 = "rgba(255, 255, 255, 0.5)"; // 透明白色
                    context.fillStyle = textBoxColor2;
                    context.fillRect(textBoxX2, textBoxY2, textBoxWidth2, textBoxHeight2);

                     // 绘制文本
                     currentText = s === 1 ? "请player1选择锁定的骰子" : "请player2选择锁定的骰子";
                    context.font = `18px cursive`;
                    context.fillStyle = "#000000";
                    context.fillText(currentText, textBoxX2 + 10, textBoxY2 + 20);
                    hasDrawnText = true; 

                    // 绘制按钮
                    const buttonWidth = 40; // 按钮宽度
                    const buttonHeight = 30; // 按钮高度
                    const buttonSpacing = 12; // 按钮之间的间距
                    hasDrawnText = true; 
                    for (let i = 1; i <= 5; i++) {
                    const buttonX = textBoxX2 + (i - 1) * (buttonWidth + buttonSpacing);
                    const buttonY = textBoxY2 + textBoxHeight2 - buttonHeight - 120; // 调整按钮位置以适应文本框

                    // 绘制按钮
                    context.fillStyle = "#BF5454"; // 设置按钮颜色
                    context.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);

                    // 绘制按钮上的文本
                    context.fillStyle = "#ffffff"; // 设置文本颜色
                    context.font = "16px Arial";
                    context.fillText(i.toString(), buttonX + 15, buttonY + 22);}
                        
                    const textBoxX3 = 116; // 文本框的 X 坐标
                    const textBoxY3 = 300; // 文本框的 Y 坐标
                    const textBoxWidth3 = 120; // 文本框的宽度
                    const textBoxHeight3 = 40; // 文本框的高度
                    const textBoxColor3 = "#BF5454"; // 透明
                    CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
                        if (w < 2 * r) r = w / 2;
                        if (h < 2 * r) r = h / 2;
                        this.beginPath();
                        this.moveTo(x + r, y);
                        this.arcTo(x + w, y, x + w, y + h, r);
                        this.arcTo(x + w, y + h, x, y + h, r);
                        this.arcTo(x, y + h, x, y, r);
                        this.arcTo(x, y, x + w, y, r);
                        this.closePath();
                        return this;
                    };

                    context.fillStyle = textBoxColor3;

                    // 绘制圆角文本框
                    context.roundRect(textBoxX3, textBoxY3, textBoxWidth3, textBoxHeight3, 10).fill();
                    
                    const text2="确定";
                    context.font="30px cursive";
                    context.fillStyle="#000000";
                    const textWidth = context.measureText(text2).width;
                    const textHeight = 20; // 假设文本高度为20px

                    // 计算文本的居中坐标
                    const centerX3 = textBoxX3 + (textBoxWidth3 - textWidth) / 2;
                    const centerY3 = textBoxY3 + (textBoxHeight3 + textHeight) / 2;

                    // 在文本框内居中绘制文本
                    context.fillText(text2, centerX3, centerY3);
                    let lockedDiceIndex = -1;
                    let selectedDiceIndices = [];
                    let totalSelectedDice = 0; // 添加一个变量来记录用户选择的骰子数量
                    function markDiceAsSelected(index) {
                        if (!selectedDiceIndices.includes(index)) {
                            selectedDiceIndices.push(index);
                            totalSelectedDice++; // 更新选择的骰子数量
                        }
                    }

                    function unmarkDiceAsSelected(index) {
                        const selectedIndex = selectedDiceIndices.indexOf(index);
                        if (selectedIndex !== -1) {
                            selectedDiceIndices.splice(selectedIndex, 1);
                            totalSelectedDice--; // 更新选择的骰子数量
                        }
                    }
                  

                    // 在绘制按钮时，根据按钮的状态绘制外观
                    function drawButton(buttonX, buttonY, buttonWidth, buttonHeight, isSelected, index) {
                        context.fillStyle = isSelected ? "#320202" : "#BF5454"; // 根据选中状态设置按钮颜色
                        context.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);

                        context.fillStyle = "#ffffff"; // 设置文本颜色为白色
                        context.font = "16px Arial";
                        context.fillText(index.toString(), buttonX + 15, buttonY + 22);
                    }
                    buttonStates = [false, false, false, false, false];
                    function clearCanvas(x,y,w,h) {
                                            context.clearRect(x, y, w ,h);
                                        }
                    canvas.addEventListener("click", function(event) {
                        event.preventDefault(); // 取消默认行为
                        event.stopImmediatePropagation(); // 停止事件传播
                        event.stopPropagation(); // 停止事件传播

                        const mouseX = event.clientX - canvas.getBoundingClientRect().left;
                        const mouseY = event.clientY - canvas.getBoundingClientRect().top;

                        // 根据鼠标位置等条件来决定调用哪个函数
                        for (let i = 1; i <= 5; i++) {
                        const buttonX = textBoxX2 + (i - 1) * (buttonWidth + buttonSpacing);
                        const buttonY = textBoxY2 + textBoxHeight2 - buttonHeight - 120;

                        if (
                            mouseX >= buttonX &&
                            mouseX <= buttonX + buttonWidth &&
                            mouseY >= buttonY &&
                            mouseY <= buttonY + buttonHeight
                        ) {
                            console.log(`Button ${i} clicked.`);
                            buttonStates[i - 1] = !buttonStates[i - 1];
                            drawButton(buttonX, buttonY, buttonWidth, buttonHeight, buttonStates[i - 1], i);

                            if (buttonStates[i - 1]) {
                                
                                    Locked_zone_1.push(dice1[i - 1]);
                                    markDiceAsSelected(i - 1);
                                    total1++;
                                    console.log("total1:", total1); // 添加调试输出
                                
                            }
                            else {
                                    // 按钮取消选中时执行的操作
                                    unmarkDiceAsSelected(i - 1);
                                }
                                console.log(Locked_zone_1);
                                
                        }
                    } 
                    canvas.removeEventListener("click", clickEventListener);
                    // 如果点击了文本框，执行相应操作
                    if (
                            mouseX >= textBoxX3 &&
                            mouseX <= textBoxX3 + textBoxWidth3 &&
                            mouseY >= textBoxY3 &&
                            mouseY <= textBoxY3 + textBoxHeight3
                        ) {

                            lockSelectedDice(s); // 锁定玩家选择的骰子
                            
                            // 清除按钮的选择状态和相关变量
                            clearButtonSelection();
                            canvas.removeEventListener("click", clickEventListener);
                          //  clearTransparentTextBox();
                            clearCanvas(0, 390, 400, 50);
                            console.log("11");
                          
                        }
                    });
                    
                    // 添加一个函数来处理锁定骰子
                    function lockSelectedDice(s) {
                        //const lockedDice =s ? Locked_zone_1 : Locked_zone_2;
                        console.log(Locked_zone_1);
                        let selectedDiceX;
                        let selectedDiceY;
                        // 在文本框点击事件中，绘制已选中的骰子图像
                        selectedDiceIndices.forEach((index) => {
                            if (index >= 0 && index < diceImages.length) {
                                const selectedDiceImage = diceImages[index];
                                if(s==1){
                                selectedDiceX = canvas.width - 350;
                                selectedDiceY = 60+l1++*60;
                            } // 调整为适当的位置
                                else{
                                selectedDiceX = canvas.width - 50;
                                selectedDiceY = 60 + l2++ * 60; }// 调整为适当的位置
                                context.drawImage(selectedDiceImage, selectedDiceX, selectedDiceY, 40, 40);
                               
                                //lockedDice.push(index); // 将锁定的骰子索引添加到当前玩家的锁定骰子数组中
                                
                            }
                        });
                        
                        
                        // 清空之前的锁定状态
                        selectedDiceIndices.length = 0;          
                    }
                    function clearButtonSelection() {
                        for (let i = 0; i < buttonStates.length; i++) {
                            buttonStates[i] = false; // 取消按钮选择状态
                            unmarkDiceAsSelected(i); // 取消对应骰子的选择状态
                        }
                    } 
}
function select1() {
    canvas.removeEventListener("click", clickEventListener);
        const textBoxX2 = 55; // 文本框的 X 坐标
        const textBoxY2 = 150; // 文本框的 Y 坐标
        const textBoxWidth2 = 230; // 文本框的宽度
        const textBoxHeight2 = 200; // 文本框的高度
        const textBoxColor2 = "rgba(255, 255, 255, 0.2)"; // 透明白色
        context.fillStyle = textBoxColor2;
        context.fillRect(textBoxX2, textBoxY2, textBoxWidth2, textBoxHeight2);

        // 绘制文本
        const currentText = "请player1选择增加的倍率";
        context.font = `18px cursive`;
        context.fillStyle = "#000000";
        context.fillText(currentText, textBoxX2 + 10, textBoxY2 + 20);

        // 绘制按钮
        const buttonWidth = 40; // 按钮宽度
        const buttonHeight = 40; // 按钮高度
        const buttonSpacing = 20; // 按钮之间的间距

        let countdown = 10; // 初始倒计时时间（以秒为单位）
        let countdownInterval;

        function updateCountdown() {
            console.log("aaaaaa");
            context.clearRect(textBoxX2 + 90, textBoxY2 -50, 68, 50); // 清除之前的倒计时数字
            context.fillStyle = "#000000";
            context.font = "44px Arial"; 
            context.fillText(countdown.toString(), textBoxX2 +90, textBoxY2 - 15);

            if (countdown === 0) {
            clearInterval(countdownInterval); // 停止倒计时
            // 在这里执行倒计时结束时的操作
           
            } else {
            countdown--;
            }
        }

        function startCountdown() {
            updateCountdown();
            countdownInterval = setInterval(updateCountdown, 1000);
        }

        for (let i = 0; i <= 3; i++) {
            const buttonX = textBoxX2 + i* (buttonWidth + buttonSpacing);
            const buttonY = textBoxY2 + textBoxHeight2 - buttonHeight - 70; // 调整按钮位置以适应文本框

            // 绘制按钮
            context.fillStyle = "#BF5454"; // 设置按钮颜色
            context.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);

            // 绘制按钮上的文本
            context.fillStyle = "#ffffff"; // 设置文本颜色
            context.font = "16px Arial";
            context.fillText(i.toString(), buttonX + 15, buttonY + 22);

            // 添加按钮点击事件
            canvas.addEventListener("click", function (event) {
            const mouseX = event.clientX - canvas.getBoundingClientRect().left;
            const mouseY = event.clientY - canvas.getBoundingClientRect().top;

            if (
                mouseX >= buttonX &&
                mouseX <= buttonX + buttonWidth &&
                mouseY >= buttonY &&
                mouseY <= buttonY + buttonHeight
            ) {
                clearInterval(countdownInterval); // 点击按钮时停止倒计时
                // 在这里执行按钮点击后的操作
                context.clearRect(textBoxX2 + 90, textBoxY2 -50, 68, 50); // 清除之前的倒计时数字
                clearCanvas(56, 120, 240, 250);
                touzi();
                select2();

            }
            });
        }

        startCountdown(); // 开始倒计时
        }
        function select2() {
        const textBoxX2 = 55; // 文本框的 X 坐标
        const textBoxY2 = 150; // 文本框的 Y 坐标
        const textBoxWidth2 = 230; // 文本框的宽度
        const textBoxHeight2 = 200; // 文本框的高度
        const textBoxColor2 = "rgba(255, 255, 255, 0.2)"; // 透明白色
        context.fillStyle = textBoxColor2;
        context.fillRect(textBoxX2, textBoxY2, textBoxWidth2, textBoxHeight2);

        // 绘制文本
        const currentText = "请player2选择增加的倍率";
        context.font = `18px cursive`;
        context.fillStyle = "#000000";
        context.fillText(currentText, textBoxX2 + 10, textBoxY2 + 20);

        // 绘制按钮
        const buttonWidth = 40; // 按钮宽度
        const buttonHeight = 40; // 按钮高度
        const buttonSpacing = 20; // 按钮之间的间距

        let countdown = 10; // 初始倒计时时间（以秒为单位）
        let countdownInterval;

        function updateCountdown() {
            console.log("aaaaaa");
            context.clearRect(textBoxX2 + 90, textBoxY2 -50, 68, 50); // 清除之前的倒计时数字
            context.fillStyle = "#000000";
            context.font = "44px Arial"; 
            context.fillText(countdown.toString(), textBoxX2 +90, textBoxY2 - 15);

            if (countdown === 0) {
            clearInterval(countdownInterval); // 停止倒计时
            // 在这里执行倒计时结束时的操作
           
            } else {
            countdown--;
            }
        }

        function startCountdown() {
            updateCountdown();
            countdownInterval = setInterval(updateCountdown, 1000);
        }

        for (let i = 0; i <= 3; i++) {
            const buttonX = textBoxX2 + i* (buttonWidth + buttonSpacing);
            const buttonY = textBoxY2 + textBoxHeight2 - buttonHeight - 70; // 调整按钮位置以适应文本框

            // 绘制按钮
            context.fillStyle = "#BF5454"; // 设置按钮颜色
            context.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);

            // 绘制按钮上的文本
            context.fillStyle = "#ffffff"; // 设置文本颜色
            context.font = "16px Arial";
            context.fillText(i.toString(), buttonX + 15, buttonY + 22);

            // 添加按钮点击事件
            canvas.addEventListener("click", function (event) {
            const mouseX = event.clientX - canvas.getBoundingClientRect().left;
            const mouseY = event.clientY - canvas.getBoundingClientRect().top;

            if (
                mouseX >= buttonX &&
                mouseX <= buttonX + buttonWidth &&
                mouseY >= buttonY &&
                mouseY <= buttonY + buttonHeight
            ) {
                clearInterval(countdownInterval); // 点击按钮时停止倒计时
                // 在这里执行按钮点击后的操作
                context.clearRect(textBoxX2 + 90, textBoxY2 -50, 68, 50); // 清除之前的倒计时数字
                clearCanvas(56, 120, 240, 250);
                
            }
            });
        }

        startCountdown(); // 开始倒计时
        }
        function xinxi1(){
            const text1 ="第 " ;
                const text2=" 局";
                const x1 = 30;
                const y1 = 90;
                context.font = `28px cursive`;
                context.lineWidth = 3;
                context.fillStyle = "#BF5454";
                context.strokeStyle = "#000"; // 黑色描边
                context.strokeText(text1+rounds+text2, x1, y1);
                context.fillText(text1+rounds+text2, x1, y1);}
            function xinxi2(){
                const text3="当前倍率：";
                context.font = `28px cursive`;
                context.lineWidth = 3;
                context.fillStyle = "#BF5454";
                context.strokeStyle = "#000"; // 黑色描边
                const x1 = 30;
                const y1 = 90;
                context.strokeText(text3+co_be, x1+150, y1);
                context.fillText(text3+co_be, x1+150, y1);
            }
            function xinxi3(){

            const text2 = "player1筹码:";
            const text3 = "player2筹码:";

            const x1=90;
            const y1=50;


            context.font = `13px cursive`;
            context.lineWidth = 3;
            context.fillStyle = "#BF5454";
            context.strokeStyle = "#000"; // 黑色描边
            context.strokeText(text2 + play1_chip, x1-75 , y1+60);
            context.fillText(text2 + play1_chip, x1-75 , y1+60);
            context.strokeText(text3 + play2_chip, x1+125 , y1+60);
            context.fillText(text3 + play2_chip, x1+125 , y1+60);
            }

        

            function defen() {

                const image = new Image(); // 创建一个Image对象
                image.src = "images/8.jpg"; // 设置图像的路径

                // 等待图像加载完成
                image.onload = function () {
                    const scale = 0.5; // 缩小比例
                    const width = image.width * scale; // 计算缩小后的宽度
                    const height = image.height * scale; // 计算缩小后的高度

                    // 绘制缩小的图像
                    context.drawImage(image, 80, 150, 250, 200);

                    // 绘制文本
                    const text = "本局结束，结果如下";
                    context.fillStyle = "#000000"; // 设置文本颜色
                    context.font = "20px Arial"; // 设置文本字体和大小
                    context.fillText(text, 100, height - 400); // 绘制文本

                    const text1 = "";
                    const text2 = "";
                    const text3 = "";
                    const text4 = "";
                    const text5 = "";
                    context.fillStyle = "#BF5454"; // 设置文本颜色
                    context.font = "14px Arial"; // 设置文本字体和大小
                    setTimeout(function() {
                    context.fillText(text1, 100, height - 380); // 绘制文本
                    context.fillText(text2, 100, height - 360); // 绘制文本
                    context.fillText(text3, 100, height - 340); // 绘制文本
                    context.fillText(text4, 100, height - 320); // 绘制文本
                    context.fillText(text5, 100, height - 300); // 绘制文本
                }, 1000); // 设置停顿时间为1秒
                    // 在这里可以执行其他操作，例如保存Canvas图像等
                    
                };
              
                }
    // 将main函数移到image.onload函数内部
    async function main() {
        
        
        let Rounds = gameCount1; // 游戏局数
        const text1 ="第 " ;
        const text2=" 局";
        const x1 = 30;
        const y1 = 90;
        context.font = `28px cursive`;
        context.lineWidth = 3;
        context.fillStyle = "#BF5454";
        context.strokeStyle = "#000"; // 黑色描边
        context.strokeText(text1+Rounds+text2, x1, y1);
        context.fillText(text1+Rounds+text2, x1, y1);
        const play1_chip = gameCount2;//player1初始筹码值
        const play2_chip = gameCount3;//player2
        let dice1 = [];
        let dice2 = [];

        while (Rounds) {

            Rounds--;
            let Locked_zone_1 = new Array(10).fill(0);
            let Locked_zone_2 = new Array(10).fill(0);
            let i = 5,j = 5;
            let be1 = 0,be2 = 0,co_be = 1;
            const text3="当前倍率：";
            context.font = `28px cursive`;
            context.lineWidth = 3;
            context.fillStyle = "#BF5454";
            context.strokeStyle = "#000"; // 黑色描边
            context.strokeText(text3+co_be, x1+150, y1);
            context.fillText(text3+co_be, x1+150, y1);

            let rou = 3;

            console.log(`两位玩家当前筹码点值： [${play1_chip}, ${play2_chip}]`);

            
            while (rou) {
            total1=0;
            total2=0;
            l1=1;//绘制初始高度
            l2=1;//绘制初始高度
            rou--;
            await  simulateClick1(1, i,false)
            canvas.removeEventListener("click", clickEventListener);
            console.log("end");
            i = i - total1;
            //console.log(i);
            await  simulateClick1(2, j,false)
            j=j-total2;
            clearTransparentTextBox();
            touzi();
            fetch('/playgame', requestData)
          .then(response => response.json())
          .then(data => {
            console.log(co_be,be1,be2);
            defen();
          })
          .catch(error => {
            console.error('Error:', error);
          });
            console.log("endd");
                // 在这里执行其他主函数中的操作
                  
            }

            fetch('/playgame', requestData)
          .then(response => response.json())
          .then(data => {
            console.log(play1_chip,play2_chip);
            xinxi1();
            xinxi2();
            xinxi3();
          })
          .catch(error => {
            console.error('Error:', error);
          });
            console.log("endd");
                // 在这里执行其他主函数中的操作
           
        }  
        }
   
    main(); // 调用main函数
