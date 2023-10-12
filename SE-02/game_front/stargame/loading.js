
  const canvas = document.getElementById("myCanvas");
  const context = canvas.getContext("2d");

        // 创建一个Image对象并加载图片
        const image = new Image();
        image.src = "images/image (7).png"; // 请替换为你的图片路径
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
            context.drawImage(image, offsetX, offsetY, scaledWidth, scaledHeight);

            // 绘制透明文本框
            const textBoxX = 0; // 文本框的 X 坐标
            const textBoxY = 154; // 文本框的 Y 坐标
            const textBoxWidth = 360; // 文本框的宽度
            const textBoxHeight = 486; // 文本框的高度
            const textBoxColor = "rgba(255, 255, 255, 0.7)"; // 透明白色
            context.fillStyle = textBoxColor;
            context.fillRect(textBoxX, textBoxY, textBoxWidth, textBoxHeight);

            const textBoxX2 = 20; // 文本框的 X 坐标
            const textBoxY2 = 520; // 文本框的 Y 坐标
            const textBoxWidth2 = 140; // 文本框的宽度
            const textBoxHeight2 = 50; // 文本框的高度
            const textBoxColor2 = "rgba(194, 114, 114)"; // 透明
            const textBoxX3 = 195; // 文本框的 X 坐标
            const textBoxY3 = 520; // 文本框的 Y 坐标
            const textBoxWidth3 = 140; // 文本框的宽度
            const textBoxHeight3 = 50; // 文本框的高度
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

            context.fillStyle = textBoxColor2;

            // 绘制圆角文本框
            context.roundRect(textBoxX2, textBoxY2, textBoxWidth2, textBoxHeight2, 10).fill();
            context.roundRect(textBoxX3, textBoxY3, textBoxWidth3, textBoxHeight3, 10).fill();

            const text1 = "本地对战";
            const text2 = "请选择游戏局数：";
            const text3 = "player1请投入您的初始筹码: ";
            const text4 = "player2请投入您的初始筹码: ";
            const text5 = "确定";
            const text6 = "退出";
            const x1 = 60;
            const y1 = 115;
            const x2 = 20;
            const y2 = 30;
            const y3 = 140;
            const y4 = 250;
            context.font = `60px cursive`;
            context.lineWidth = 8;
            context.fillStyle = "#BF5454";
            context.strokeStyle = "#000000"; // 黑色描边
            context.strokeText(text1, x1, y1);
            context.fillText(text1, x1, y1);
            context.font = `26px cursive`;
            context.fillStyle = "#000000";
            context.fillText(text2, x2, textBoxY+y2);
            context.fillText(text3, x2, textBoxY+y3);
            context.fillText(text4, x2, textBoxY+y4);

            context.font="36px cursive";
            context.fillStyle="#000000";
            const textWidth = context.measureText(text6).width;
            const textHeight = 20; // 假设文本高度为20px

            // 计算文本的居中坐标
            const centerX = textBoxX2 + (textBoxWidth2 - textWidth) / 2;
            const centerY = textBoxY2 + (textBoxHeight2 + textHeight) / 2;

            // 在文本框内居中绘制文本
            context.fillText(text6, centerX, centerY);
            const textWidth3 = context.measureText(text5).width;

            // 计算文本的居中坐标
            const centerX3 = textBoxX3 + (textBoxWidth3 - textWidth3) / 2;
            const centerY3 = textBoxY3 + (textBoxHeight3 + textHeight) / 2;

            // 在文本框内居中绘制文本
            context.fillText(text5, centerX3, centerY3);
            function drawAlertBox(context, message, x, y, width, height) {
        // 绘制文本框背景
                context.fillStyle = "rgba(255, 255, 255, 0.9)"; // 设置背景颜色，这里是红色半透明
                context.fillRect(x, y, width, height);

                // 绘制文本
                context.font = "20px Arial"; // 设置文本字体和大小
                context.fillStyle = "#000000"; // 设置文本颜色为白色
                context.fillText(message, x + 10, y + 30); // 在文本框内绘制文本，假设文本框上边距为10，左边距为30
            }
            // 添加点击事件监听器
           // 获取文本框元素
           canvas.addEventListener("click", function (event) {
                const clickX = event.clientX - canvas.getBoundingClientRect().left;
                const clickY = event.clientY - canvas.getBoundingClientRect().top;

                // 检查点击是否在文本框 textBox2 的区域内
                if (
                    clickX >= textBoxX3 &&
                    clickX <= textBoxX3 + textBoxWidth3 &&
                    clickY >= textBoxY3 &&
                    clickY <= textBoxY3 + textBoxHeight3
                ) {
                    // 在此处添加要跳转的页面 URL
                    // 点击发生在文本框内
                    // 进行你的操作，如检查选择框的值和跳转到下一个页面
                // 获取选择框的值
                const gameCount1 = parseInt(document.getElementById("gameCount1").value, 10);
                const gameCount2 = parseInt(document.getElementById("gameCount2").value, 10);
                const gameCount3 = parseInt(document.getElementById("gameCount3").value, 10);

                // 检查是否在取值范围内
                const isValid1 = gameCount1 >= 1 && gameCount1 <= 1000000000000;
                const isValid2 = gameCount2 >= 100 && gameCount2 <= 1000000000000;
                const isValid3 = gameCount3 >= 100 && gameCount3 <= 1000000000000;

                // 如果有一个或多个选择框的值不在范围内，执行相应操作
                if (!isValid1 || !isValid2 || !isValid3) {
                    // 将选择框变红
                    if (!isValid1) {
                        document.getElementById("gameCount1").style.borderColor = "red";
                    } else {
                        document.getElementById("gameCount1").style.borderColor = "#ccc"; // 恢复默认边框颜色
                    }

                    if (!isValid2) {
                        document.getElementById("gameCount2").style.borderColor = "red";
                    } else {
                        document.getElementById("gameCount2").style.borderColor = "#ccc"; // 恢复默认边框颜色
                    }

                    if (!isValid3) {
                        document.getElementById("gameCount3").style.borderColor = "red";
                    } else {
                        document.getElementById("gameCount3").style.borderColor = "#ccc"; // 恢复默认边框颜色
                    }

                    drawAlertBox(context, "请更改选择框的值，确保在取值范围内。", 0, 30, 360, 40);
                } else {
                    // 所有选择框的值都在范围内，执行跳转到下一个页面的操作
                    window.location.href = "12.html";
                }
                }
            });
           canvas.addEventListener("click", function (event) {
                const clickX = event.clientX - canvas.getBoundingClientRect().left;
                const clickY = event.clientY - canvas.getBoundingClientRect().top;

                // 检查点击是否在文本框 textBox2 的区域内
                if (
                    clickX >= textBoxX2 &&
                    clickX <= textBoxX2 + textBoxWidth2 &&
                    clickY >= textBoxY2 &&
                    clickY <= textBoxY2 + textBoxHeight2
                ) {
                    // 在此处添加要跳转的页面 URL
                    window.location.href = "Decide the priority.html";
                }
            });
            // 获取输入框元素
            window.onload = function() {
            const gameCount1Input = document.getElementById("gameCount1");
            const gameCount2Input = document.getElementById("gameCount2");
            const gameCount3Input = document.getElementById("gameCount3");

            // 监听输入框的变化事件
            gameCount1Input.addEventListener("change", saveValues);
            gameCount2Input.addEventListener("change", saveValues);
            gameCount3Input.addEventListener("change", saveValues);

            // 保存用户输入的值到本地存储
            function saveValues() {
                localStorage.setItem("gameCount1", gameCount1Input.value);
                localStorage.setItem("gameCount2", gameCount2Input.value);
                localStorage.setItem("gameCount3", gameCount3Input.value);
            }
            // 在第一个页面中添加调试输出
            console.log("gameCount1 saved to local storage: " + localStorage.getItem("gameCount1"));
        }
        // 构建请求对象
        const requestData = {
          method: 'POST', // 或其他 HTTP 方法，如 GET
          body: JSON.stringify({gameCount1,gameCount2,gameCount3}), // 将参数转为 JSON 字符串
          headers: {
            'Content-Type': 'application/json'
          }
        };

        // 发起请求到后端
        fetch('/startGame', requestData)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            // 在这里处理从后端返回的数据
          })
          .catch(error => {
            console.error('Error:', error);
          });
        }
