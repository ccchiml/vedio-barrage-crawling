const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

// 创建一个Image对象并加载图片
const image = new Image();
image.src = "images/image (8).png"; // 请替换为你的图片路径
// 图像加载完成后，绘制图像和文本框

image.onload = function () {
    canvas.width = 360; // 设置画布宽度
    canvas.height = 640; // 设置画布高度
    const targetWidth = 452;
    const targetHeight = 653;
    const scaleFactor = Math.min(targetWidth / image.width, targetHeight / image.height);
    const scaledWidth = image.width * scaleFactor;
    const scaledHeight = image.height * scaleFactor;
    const offsetX = (canvas.width - scaledWidth) / 2;
    const offsetY = (canvas.height - scaledHeight) / 2;

    // 绘制图像
   // context.drawImage(image, offsetX, offsetY, scaledWidth, scaledHeight);

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
    const image1 = document.getElementById("image1");
    const image2 = document.getElementById("image2");
   
    const images = [
        "images/9.png",
        "images/10.png",
        "images/11.png"
    ];
    let randomImageInterval1;
    let randomImageInterval2;
    let shouldRandomize1 = false;
    let shouldRandomize2 = false;

    // 为 image1 添加点击事件监听器
    image1.addEventListener("click", function () {
        shouldRandomize1 = true;
        randomizeImages1();
        setTimeout(stopRandomize1, 5000);
    });

    // 为 image2 添加点击事件监听器
    image2.addEventListener("click", function () {
        shouldRandomize2 = true;
        console.log("1");
        randomizeImages2();
        console.log("11")
        setTimeout(stopRandomize2, 5000);
    });

    function randomizeImages1() {
        randomImageInterval1 = setInterval(function () {
            if (shouldRandomize1) {
                const randomIndex = Math.floor(Math.random() * images.length);
                const randomImage = new Image();
                randomImage.src = images[randomIndex];
                randomImage.onload = function () {
                    context.clearRect(10, 250, 150, 150); // 清除之前绘制的图像
                    context.drawImage(randomImage, 10, 250, 150, 150);
                };
            }
        }, 200); // 每200毫秒切换一次图像
    }

    function randomizeImages2() {
        randomImageInterval2 = setInterval(function () {
            if (shouldRandomize2) {
                const randomIndex = Math.floor(Math.random() * images.length);
                const randomImage = new Image();
                randomImage.src = images[randomIndex];
                randomImage.onload = function () {
                    context.clearRect(200, 250, 150, 150); // 清除之前绘制的图像
                    context.drawImage(randomImage, 200, 250, 150, 150);
                };
            }
        }, 200); // 每200毫秒切换一次图像
    }

    function stopRandomize1() {
        shouldRandomize1 = false;
        clearInterval(randomImageInterval1);
        // 在这里选择要显示的图像并绘制它
        const selectedImageIndex = Math.floor(Math.random() * images.length);
        const selectedImage = new Image();
        selectedImage.src = images[selectedImageIndex];
        selectedImage.onload = function () {
            context.clearRect(10, 250, 150, 150); // 清除之前绘制的图像
            context.drawImage(selectedImage, 10, 250, 150, 150);
        };
    }

    function stopRandomize2() {
        shouldRandomize2 = false;
        clearInterval(randomImageInterval2);
        // 在这里选择要显示的图像并绘制它
        const selectedImageIndex = Math.floor(Math.random() * images.length);
        const selectedImage = new Image();
        selectedImage.src = images[selectedImageIndex];
        selectedImage.onload = function () {
            context.clearRect(200, 250, 150, 150); // 清除之前绘制的图像
            context.drawImage(selectedImage, 200, 250, 150, 150);
        };
    }
}