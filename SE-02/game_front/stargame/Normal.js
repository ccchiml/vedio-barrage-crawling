document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("myCanvas");
    const context = canvas.getContext("2d");
    const image = new Image();
    image.src = "images/image (7).png"; // 替换为您的图像路径
    let dotCount = 0;
    const maxDots = 4;

    // 设置动画参数
    const animationParams = {
        offsetX: 0,
        offsetY: 0,
        scaledWidth: 0,
        scaledHeight: 0,
    };

    image.onload = function () {
        canvas.width = 360;
        canvas.height = 640;
        const targetWidth = 452;
        const targetHeight = 653;
        const scaleFactor = Math.min(targetWidth / image.width, targetHeight / image.height);
        animationParams.scaledWidth = image.width * scaleFactor;
        animationParams.scaledHeight = image.height * scaleFactor;
        animationParams.offsetX = (canvas.width - animationParams.scaledWidth) / 2;
        animationParams.offsetY = (canvas.height - animationParams.scaledHeight) / 2;

        // 启动动画
        startAnimation();
    }

    function startAnimation() {
        animateLoadingText();
    }

    function animateLoadingText() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, animationParams.offsetX, animationParams.offsetY, animationParams.scaledWidth, animationParams.scaledHeight);

        context.font = "bold 50px cursive"; // 加粗字体
        context.fillStyle = "#ccc";
        context.fillText("正在匹配" + ".".repeat(dotCount), canvas.width / 2 - 140, canvas.height / 2 + animationParams.scaledHeight / 2 - 70);
// context.fillText("查找在线好友" + ".".repeat(dotCount), canvas.width / 2 - 180, canvas.height / 2 + animationParams.scaledHeight / 2 - 70);

        dotCount = (dotCount + 1) % (maxDots + 1); // 控制点的数量

        // 使用setTimeout来控制动画间隔时间
        setTimeout(animateLoadingText, 1000); // 500毫秒的间隔
    }
});