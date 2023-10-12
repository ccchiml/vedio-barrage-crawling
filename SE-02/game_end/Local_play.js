const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5500; 
let play1_chip = 0;
let play2_chip = 0;
let count1 = 0;
let count2 = 0;
function showBlocked(i, j, Locked_zone_1, Locked_zone_2) {
  if (i === -1) console.log('两位玩家的锁定区： [[]],');
  else {
    console.log('两位玩家的锁定区： [[' + Locked_zone_1.join(',') + '],');
  }
  if (j === -1) console.log('[]]');
  else {
    console.log('[' + Locked_zone_2.join(',') + ']]');
  }
}

function findBonus(nums) {
  let score = 0;
  let sign1 = 0;
  let sign2 = 0;
  let isBigStraight = true;

  for (let k = 1; k < 5; k++) {
    if (nums[k] - nums[k - 1] !== 1) {
      isBigStraight = false;
      break;
    }
  }
  const isSmallStraight = nums[4] - nums[0] === 5;

  if (isBigStraight) {
    score = 60;
    console.log('大顺子加60分！');
  } else if (isSmallStraight) {
    console.log('小顺子加30分！');
    score = 30;
  } else {
    let c = 1;
    for (let k = 1; k < 5; k++) {
      if (nums[k] === nums[k - 1]) {
        c++;
        if (c === 5) {
          score += 100;
          console.log('五连加100分！');
        }
      } else {
        if (c === 2) {
          score += 10;
          sign1 = 1;
          console.log('双对加10分！');
        } else if (c === 3) {
          score += 10;
          sign2 = 1;
          console.log('三连加10分！');
        } else if (c === 4) {
          score += 40;
          console.log('四连加40分！');
        }
        c = 1;
      }
    }
  }
  if (sign1 === 1 && sign2 === 1) {
    score += 20;
    console.log('葫芦加20分！');
  }
  console.log(score);
  return score;
}

function finalSettle(Locked_zone_1, Locked_zone_2, co_be) {
  count1 = 0;
  count2 = 0;
  let bonus1 = 0;
  let bonus2 = 0;
  Locked_zone_1.sort();
  bonus1 = findBonus(Locked_zone_1);
  Locked_zone_2.sort();
  bonus2 = findBonus(Locked_zone_2);
  count1 += bonus1;
  count2 += bonus2;
  console.log('player1的牌型为[' + Locked_zone_1.join(',') + ']得分为' + count1 + '，总倍率为' + co_be);
  console.log('player2的牌型为[' + Locked_zone_2.join(',') + ']得分为' + count2 + '，总倍率为' + co_be);
  play1_chip += (count1 - count2) * co_be;
  play2_chip += (count2 - count1) * co_be;

  if (count1 >= count2)
    console.log('player1从player2手中赢得了' + (count1 - count2) * co_be + '点筹码！');
  else
    console.log('player2从player1手中赢得了' + (count2 - count1) * co_be + '点筹码！');
}
// 使用body-parser中间件来解析请求主体
app.use(bodyParser.json());

// 处理POST请求到/startGame端点
app.post('/startGame', (req, res) => {
  const {gameCount1,gameCount2,gameCount3 } = req.body;

  // 检查是否收到了gameName参数
  if (!gameCount1||!gameCount2||!gameCount3) {
    return res.status(400).json({ error: 'gamestar参数缺失' });
  }

  const response = { message: `成功开始游戏：${gameName}` };
  Rouds=gameCount1;
  play1_chip=gameCount2;
  play2_chip=gameCount3;
  function main() {
    rl.question((Rounds) => {

      let s;
      const dice1 = [];
      const dice2 = [];
      app.post('/playGame', (req, res) => {
      Rounds = parseInt(Rounds);
      
      let i = -1;
      let j = -1;
      let be1 = 0;
      let be2 = 0;
      let co_be = 1;
      let rou = 3;
  
      console.log('两位玩家当前筹码点值： [' + play1_chip + ', ' + play2_chip + ']');
  
      if (play1_chip <= 0) {
        const consolelog1 = {text:"player1已无筹码，游戏结束！！！"};
        res.send(consolelog1); // 发送JSON数据给前端
    //    console.log('player1已无筹码，游戏结束！！！');
        rl.close();
        return;
      }
  
      if (play2_chip <= 0) {
        const consolelog2 = {text:"player2已无筹码，游戏结束！！！"};
        res.send(consolelog2); // 发送JSON数据给前端
      //  console.log('player2已无筹码，游戏结束！！！');
        rl.close();
        return;
      }
  
      if (play1_chip <= 500) {
        const consolelog3 = {text:"player1筹码数已经低于初始值一半，确定还要继续吗！"};
        res.send(consolelog3); // 发送JSON数据给前端
        console.log('player1筹码数已经低于初始值一半，确定还要继续吗，(输入确定即可结束游戏，输入任意键则继续游戏)！！！');
        rl.question('', (c) => {
          if (c === '') {
            rl.close();
            return;
          }
          playGame();
        });
      } else {
        playGame();
      }
  
      function playGame() {
        while (rou) {
          rou--;
          showBlocked(i, j, Locked_zone_1, Locked_zone_2);
          const consolelog1 = {text1:"player1的骰子区:"};
          res.send(consolelog1); // 发送JSON数据给前端
        //  console.log('player1的骰子区：[');
          
          for (let m = 0; m < 5 - i - 1; m++) {
            dice1[m] = Math.floor(Math.random() * 6) + 1;
            process.stdout.write(dice1[m].toString());
            if (m !== 5 - i - 2) process.stdout.write(',');
          }
          console.log(']');
  
          if (rou !== 0) {
          // console.log('player1请选择锁定骰子（输入-1表示不锁定）：');
            rl.question('', (input) => {
              s = parseInt(input);
              while (s !== -1) {
                Locked_zone_1[++i] = dice1[--s];
                rl.question('', (input) => {
                  s = parseInt(input);
                });
              }
              playRound();
            });
          } else {
            playRound();
          }
          const gamdata = {rou};
          res.send(gamdata); // 发送JSON数据给前端
        }
      }
  
      function playRound() {
        showBlocked(i, j, Locked_zone_1, Locked_zone_2);
        const consolelog2 = {text2:"player2的骰子区:"};
          res.send(consolelog2); // 发送JSON数据给前端
     //   console.log('player2的骰子区：[');
  
        for (let m = 0; m < 5 - j - 1; m++) {
          dice2[m] = Math.floor(Math.random() * 6) + 1;
          process.stdout.write(dice2[m].toString());
          if (m !== 5 - j - 2) process.stdout.write(',');
        }
        console.log(']');
  
        if (rou !== 0) {
        //  console.log('player2请选择锁定骰子（输入-1表示不锁定）：');
          rl.question('', (input) => {
            s = parseInt(input);
            while (s !== -1) {
              Locked_zone_2[++j] = dice2[--s];
              rl.question('', (input) => {
                s = parseInt(input);
              });
            }
            getBets();
          });
        } else {
          getBets();
        }
      }
  
      function getBets() {
        if (rou !== 0) {
       //   console.log('player1请选择加倍（输入0, 1, 2, 3）：');
          rl.question('', (input) => {
            be1 = parseInt(input);
            if (be1 < 0 || be1 > 3) {
              const consolelog1 = {text:"player1选择加倍数错误，已重置为0"};
              res.send(consolelog1); // 发送JSON数据给前端
              console.log('player1选择加倍数错误，已重置为0');
              be1 = 0;
            }
        //   console.log('player2请选择加倍（输入0, 1, 2, 3）：');
            rl.question('', (input) => {
              be2 = parseInt(input);
              if (be2 < 0 || be2 > 3) {
                const consolelog2 = {text:"player2选择加倍数错误，已重置为0"};
                res.send(consolelog2); // 发送JSON数据给前端
                console.log('player2选择加倍数错误，已重置为0');
                be2 = 0;
              }
              co_be += be1 + be2;
              console.log('player1选择加' + be1 + '倍率');
              console.log('player2选择加' + be2 + '倍率');
              console.log('当前倍率来到' + co_be + '倍！');
              const gamedata = {be1,be2,co_be};
              res.send(cgamedata); // 发送JSON数据给前端
              playGame();
            });
          });
        } else {
          playGame();
        }
      }
    });
    let tem = i;
    for (let m = 0; m < 5 - tem - 1; m++) {
      Locked_zone_1[++i] = dice1[m];
    }
    tem = j;
    for (let m = 0; m < 5 - tem - 1; m++) {
    Locked_zone_2[++j] = dice2[m];
    }
    final_settle(Locked_zone_1, Locked_zone_2, co_be);
      rl.on('close', () => {
        console.log('游戏结束');
        process.exit(0);
      });
    });
  }
  // 返回JSON响应
  res.json(response);
});
main();
app.listen(port, () => {
  console.log(`后端服务器已启动，监听端口 ${port}`);
});
