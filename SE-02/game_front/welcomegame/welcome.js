const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

// 创建一个Image对象并加载图片
const image = new Image();
image.src = "images/image(3).png"; // 请替换为你的图片路径

// 图像加载完成后，绘制图像
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

    context.drawImage(image, offsetX, offsetY, scaledWidth, scaledHeight);

    // 绘制文本和黑边
    const text1 = "孤";
    const text2 = "注";
    const text3 = "一";
    const text4 = "骰";
    const text5 = "规则介绍";
    const text6 = "开始游戏";
    const text7="设置";
    const text8="个人";
    const text9="排行榜";
    const x = 7;
    const y1 = 100;
    const y2 = 200;
    const x1 = 274;
    const y3 = 500;
    const y4 = 600;
    const fontSize = 80;
    const x2 = 100;
    const y5 = 330;
    const y6 = 400;
    const x3 = 320;
    const y7 = 75;
    const y8 = 148;
    const x4 = 300;
    const y9 = 220;
    // 绘制文本1到文本4
    context.font = `${fontSize}px cursive`;
    context.lineWidth = 6;
    context.fillStyle = "#c52c2c9e";
    context.strokeStyle = "#000"; // 黑色描边
    context.strokeText(text1, x, y1);
    context.strokeText(text2, x, y2);
    context.strokeText(text3, x1, y3);
    context.strokeText(text4, x1, y4);
    context.fillText(text1, x, y1);
    context.fillText(text2, x, y2);
    context.fillText(text3, x1, y3);
    context.fillText(text4, x1, y4);

    // 绘制文本5的样式
    context.font = "40px cursive";
    context.lineWidth = 3;
    context.strokeStyle = "#000"; // 黑色描边
    context.strokeText(text5, x2, y5);
    context.strokeText(text6, x2, y6);
    context.fillStyle = "#b00c0c9e";
    context.fillText(text5, x2, y5);
    context.fillText(text6, x2, y6);
    // 绘制SVG图标
    const svgIcon = new Image();
    svgIcon.src = "images/shezhi.svg"; // 请替换为您的SVG图标路径
    svgIcon.onload = function () {
        context.drawImage(svgIcon, canvas.width - 40, 20, 40, 40);
    };
    context.font="20px cursive";
    context.fillStyle="#ffffff";
    context.fillText(text7,x3,y7);
    const svgIcon2 = new Image();
    svgIcon2.src = "images/geren.svg"; // 请替换为您的SVG图标路径
    svgIcon2.onload = function () {
        context.drawImage(svgIcon2, canvas.width - 40, 90, 40, 40);
    };
    context.font="20px cursive";
    context.fillStyle="#ffffff";
    context.fillText(text8,x3,y8);
    const svgIcon3 = new Image();
    svgIcon3.src = "images/paixingbang.svg"; // 请替换为您的SVG图标路径
    svgIcon3.onload = function () {
        context.drawImage(svgIcon3, canvas.width - 40, 160, 40, 40);
    };
    context.font="20px cursive";
    context.fillStyle="#ffffff";
    context.fillText(text9,x4,y9);
    // 添加点击事件处理程序，跳转到另一个页面
    canvas.addEventListener("click", function (event) {
        const clickX = event.clientX - canvas.getBoundingClientRect().left;
        const clickY = event.clientY - canvas.getBoundingClientRect().top;

        // 检查点击是否在文本5的区域内
        if (
            clickX >= x2 &&
            clickX <= x2 + context.measureText(text5).width &&
            clickY >= y5 - 40 && // 考虑文本高度
            clickY <= y5
        ) {
            // 在此处添加要跳转的页面 URL
            window.location.href = "Rule_introduction.html";
        }
    });
    canvas.addEventListener("click", function (event) {
        const clickX = event.clientX - canvas.getBoundingClientRect().left;
        const clickY = event.clientY - canvas.getBoundingClientRect().top;

        // 检查点击是否在文本5的区域内
        if (
            clickX >= x3 &&
            clickX <= x3 + context.measureText(text7).width &&
            clickY >= y7 - 40 && // 考虑文本高度
            clickY <= y7
        ) {
            // 在此处添加要跳转的页面 URL
            window.location.href = "设置.html";
        }
    });
    canvas.addEventListener("click", function (event) {
        const clickX = event.clientX - canvas.getBoundingClientRect().left;
        const clickY = event.clientY - canvas.getBoundingClientRect().top;

        // 检查点击是否在文本5的区域内
        if (
            clickX >= x2 &&
            clickX <= x2 + context.measureText(text6).width &&
            clickY >= y6 - 40 && // 考虑文本高度
            clickY <= y6
        ) {
            // 在此处添加要跳转的页面 URL
            window.location.href = "stargame.html";
        }
    });
};