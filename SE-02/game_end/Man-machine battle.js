const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5500; 

let play1_chip = 1000;
let play2_chip = 1000;
let count1 = 0;
let count2 = 0;
const d = new Array(10);
let h = 0;

function show_blocked(i, j, Locked_zone_1, Locked_zone_2) {
  if (i === -1) console.log("两位玩家的锁定区： [[],");
  else {
    process.stdout.write("两位玩家的锁定区： [[");
    for (let m = 0; m <= i; m++) {
      process.stdout.write(Locked_zone_1[m].toString());
      if (m !== i) process.stdout.write(',');
    }
    console.log("], ");
  }

  if (j === -1) console.log("]]");
  else {
    process.stdout.write("[");
    for (let m = 0; m <= j; m++) {
      process.stdout.write(Locked_zone_2[m].toString());
      if (m !== j) process.stdout.write(',');
    }
    console.log("]]");
  }
}

function fin_bonus(nums) {
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
    console.log("大顺子加60分！");
  } else if (isSmallStraight) {
    console.log("小顺子加30分!");
    score = 30;
  } else {
    let c = 1;
    for (let k = 1; k < 5; k++) {
      if (nums[k] === nums[k - 1]) {
        c++;
        if (c === 5) {
          score += 100; // 五连
          console.log("五连加100分！");
        }
      } else {
        if (c === 2) {
          score += 10; // 双对
          sign1 = 1;
          console.log("双对加10分！");
        } else if (c === 3) {
          score += 10; // 三连
          sign2 = 1;
          console.log("三连加10分！");
        } else if (c === 4) {
          score += 40; // 四连
          console.log("四连加40分！");
        }
        c = 1;
      }
    }
  }

  if (sign1 === 1 && sign2 === 1) {
    score += 20;
    console.log("葫芦加20分！");
  }

  console.log(score);
  return score;
}

function final_settle(Locked_zone_1, Locked_zone_2, co_be) {
  count1 = 0;
  count2 = 0;
  let bonus1 = 0;
  let bonus2 = 0;
  Locked_zone_1.sort();
  bonus1 = fin_bonus(Locked_zone_1);
  Locked_zone_2.sort();
  bonus2 = fin_bonus(Locked_zone_2);
  count1 += bonus1;
  count2 += bonus2;

  process.stdout.write("player1的牌型为[");
  for (let m = 0; m < 5; m++) {
    process.stdout.write(Locked_zone_1[m].toString());
    if (m !== 4) process.stdout.write(",");
    count1 += Locked_zone_1[m];
  }
  console.log("]，得分为", count1, "，总倍率为", co_be);

  process.stdout.write("player2的牌型为[");
  for (let m = 0; m < 5; m++) {
    process.stdout.write(Locked_zone_2[m].toString());
    if (m !== 4) process.stdout.write(",");
    count2 += Locked_zone_2[m];
  }
  console.log("]，得分为", count2, "，总倍率为", co_be);

  play1_chip += (count1 - count2) * co_be;
  play2_chip += (count2 - count1) * co_be;

  if (count1 >= count2)
    console.log("player1从player2手中赢得了", count1 - count2, "点筹码!");
  else
    console.log("player2从player1手中赢得了", count2 - count1, "点筹码!");
}

function play1_Ai_blocked(Locked_zone_1, dice1, i) {
  let count = 1;
  h = 0;
  for (let m = 1; m < 4 - i; m++) {
    if (dice1[m] === dice1[m - 1]) {
      count++;
    } else {
      if (count >= 3 || (count === 2 && dice1[m - 1] >= 5)) {
        let x = m;
        for (let q = count; q > 0; q--) {
          d[h++] = x--;
        }
      } else {
        for (let p = 0; p <= i; p++) {
          if (Locked_zone_1[p] === dice1[m - 1]) {
            let x = m;
            for (let q = count; q > 0; q--) {
              d[h++] = x--;
            }
            break;
          }
        }
      }
      count = 1;
    }

    if (m === 3 - i) {
      if (count >= 3 || (count === 2 && dice1[m] >= 5)) {
        let x = m;
        for (let q = count; q > 0; q--) {
          d[h++] = x--;
        }
      } else {
        for (let p = 0; p <= i; p++) {
          if (Locked_zone_1[p] === dice1[m]) {
            let x = m;
            for (let q = count; q > 0; q--) {
              d[h++] = x--;
            }
            break;
          }
        }
      }
      count = 1;
    }
  }

  d.sort();
}

function play1_Ai_be(i, Locked_zone_1) {
    let count = 1;
    let bei = 0;
  
    for (let k = 1; k <= i; k++) {
      if (Locked_zone_1[k] === Locked_zone_1[k - 1]) {
        count++;
      } else {
        if (count === 4 && Locked_zone_1[k - 1] >= 5) {
          bei = 3;
          return bei;
        } else if (count === 3) {
          bei = 2;
        } else if (count === 2) {
          bei += 1;
        }
        count = 1;
      }
  
      if (k === i) {
        if (count === 4 && Locked_zone_1[k - 1] >= 5) {
          bei = 3;
          return bei;
        } else if (count === 3) {
          bei = 2;
        } else if (count === 2) {
          bei += 1;
        }
        count = 1;
      }
    }
  
    return bei;
  }
  
        function main() {
            rl.question("请输入游戏局数：", (Rounds) => {
              let s;
              const dice1 = new Array(10);
              const dice2 = new Array(10);
          
              Rounds = parseInt(Rounds);
              let i = -1;
              let j = -1;
              let be1 = 0;
              let be2 = 0;
              let co_be = 1;
              let rou = 3;
          
              console.log("两位玩家当前筹码点值： [" + play1_chip + ", " + play2_chip + "]");
          
              if (play1_chip <= 0) {
                console.log("player1已无筹码，游戏结束！！！");
                rl.close();
              } else if (play2_chip <= 0) {
                console.log("player2已无筹码，游戏结束！！！");
                rl.close();
              } else if (play1_chip <= 500) {
                rl.question("player1筹码数已经低于初始值一半，确定还要继续吗，(输入q即可结束游戏，输入任意键则继续游戏)！！！", (c) => {
                  if (c === 'q') {
                    rl.close();
                  } else {
                    playRound();
                  }
                });
              } else if (play2_chip <= 500) {
                rl.question("player2筹码数已经低于初始值一半，确定还要继续吗，(输入q即可结束游戏，输入任意键则继续游戏)！！！", (c) => {
                  if (c === 'q') {
                    rl.close();
                  } else {
                    playRound();
                  }
                });
              } else {
                playRound();
              }
          
              function playRound() {
                let rnd = 0;
                const play1_turn = () => {
                  if (rnd >= rou) {
                    if (rnd === rou) {
                      i = i + rou;
                      show_blocked(i, j, Locked_zone_1, Locked_zone_2);
                      Locked_zone_1 = Locked_zone_1.concat(dice1.slice(0, 5 - i - 1));
                      show_blocked(i, j, Locked_zone_1, Locked_zone_2);
                    }
          
                    rnd = 0;
                    if (co_be > 1) {
                      rl.question("player1请选择加倍（输入0, 1, 2, 3）：", (input) => {
                        be1 = parseInt(input);
                        be1 = be1 < 0 || be1 > 3 ? 0 : be1;
                        co_be += be1;
                        console.log("player1选择加" + be1 + "倍率");
                        console.log("player2选择加" + be2 + "倍率");
                        console.log("当前倍率来到" + co_be + "倍！");
                        play2_turn();
                      });
                    } else {
                      play2_turn();
                    }
                  } else {
                    show_blocked(i, j, Locked_zone_1, Locked_zone_2);
                    process.stdout.write("player1的骰子区：[");
                    for (let m = 0; m < 5 - i - 1; m++) {
                      dice1[m] = Math.floor(Math.random() * 6) + 1;
                      process.stdout.write(dice1[m].toString());
                      if (m !== 5 - i - 2) process.stdout.write(",");
                    }
                    console.log("]");
          
                    if (rnd !== 0) {
                      console.log("player1请选择锁定骰子（输入-1表示不锁定）：");
                      const Locked_zone_1_copy = Locked_zone_1.slice();
                      Locked_zone_1_copy.sort();
                      const dice1_copy = dice1.slice();
                      dice1_copy.sort();
          
                      play1_Ai_blocked(Locked_zone_1_copy, dice1_copy, i);
                      d.length = h;
                      const new_locked = d.map((val) => val + 1);
                      Locked_zone_1 = Locked_zone_1.concat(new_locked);
                      console.log("player1锁定了骰子：" + new_locked.join(" "));
                    }
          
                    process.stdout.write("player2的骰子区：[");
                    for (let m = 0; m < 5 - j - 1; m++) {
                      dice2[m] = Math.floor(Math.random() * 6) + 1;
                      process.stdout.write(dice2[m].toString());
                      if (m !== 5 - j - 2) process.stdout.write(",");
                    }
                    console.log("]");
          
                    console.log("player2请选择锁定骰子（输入-1表示不锁定）：");
                    rl.question("Locked_zone_2[5]=dice2[?]", (sInput) => {
                      const s = parseInt(sInput) - 1;
                      if (s !== -1) {
                        Locked_zone_2.push(dice2[s]);
                      }
                      rnd++;
                      play1_turn();
                    });
                  }
                };
          
                const play2_turn = () => {
                  if (rnd >= rou) {
                    if (rnd === rou) {
                      j = j + rou;
                      show_blocked(i, j, Locked_zone_1, Locked_zone_2);
                      Locked_zone_2 = Locked_zone_2.concat(dice2.slice(0, 5 - j - 1));
                      show_blocked(i, j, Locked_zone_1, Locked_zone_2);
                    }
          
                    rnd = 0;
                    final_settle(Locked_zone_1, Locked_zone_2, co_be);
                    rl.close();
                  } else {
                    show_blocked(i, j, Locked_zone_1, Locked_zone_2);
                    process.stdout.write("player2的骰子区：[");
                    for (let m = 0; m < 5 - j - 1; m++) {
                      dice2[m] = Math.floor(Math.random() * 6) + 1;
                      process.stdout.write(dice2[m].toString());
                      if (m !== 5 - j - 2) process.stdout.write(",");
                    }
                    console.log("]");
                    console.log("player2请选择锁定骰子（输入-1表示不锁定）：");
                    rl.question("Locked_zone_2[5]=dice2[?]", (sInput) => {
                      const s = parseInt(sInput) - 1;
                      if (s !== -1) {
                        Locked_zone_2.push(dice2[s]);
                      }
                      rnd++;
                      play2_turn();
                    });
                  }
                };
          
                let Locked_zone_1 = new Array(10);
                let Locked_zone_2 = new Array(10);
                let tem = i;
                for (let m = 0; m < 5 - tem - 1; m++) {
                    Locked_zone_1.push(dice1[m]);
                  }
                  let tem2 = j;
                  for (let m = 0; m < 5 - tem2 - 1; m++) {
                    Locked_zone_2.push(dice2[m]);
                  }
                  play1_turn();
                }
            
                rl.on('close', () => {
                  process.exit(0);
                });
              }
            )};
            main();
            app.listen(port, () => {
              console.log(`后端服务器已启动，监听端口 ${port}`);
            });