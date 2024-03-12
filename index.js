let gameState = {
  map: [[null, null, null], 
        [null, null, null], 
        [null, null, null]],
  result: null,
  moveCount: 0
};

function checkWin() {
  // 检查行、列和对角线的胜利条件
  for(let i = 0; i < 3; i++) {
    if(gameState.map[i][0] !== null && gameState.map[i][0] === gameState.map[i][1] && gameState.map[i][1] === gameState.map[i][2]) {
      return gameState.map[i][0];
    }
    if(gameState.map[0][i] !== null && gameState.map[0][i] === gameState.map[1][i] && gameState.map[1][i] === gameState.map[2][i]) {
      return gameState.map[2][i];
    }
  }
  if(gameState.map[0][0] !== null && gameState.map[0][0] === gameState.map[1][1] && gameState.map[1][1] === gameState.map[2][2]) {
    return gameState.map[2][2];
  }
  if(gameState.map[0][2] !== null && gameState.map[0][2] === gameState.map[1][1] && gameState.map[1][1] === gameState.map[2][0]) {
    return gameState.map[2][0];
  }
  return null;
}

function resetGame() {
  gameState.moveCount = 0;
  gameState.map = [[null, null, null], 
                   [null, null, null], 
                   [null, null, null]];
  gameState.result = null;
  document.querySelector('.gameResultDisplay').innerText = "胜负未分";
  document.querySelectorAll('.box').forEach(function(item){
    item.innerText = '';
    item.style.color = ''; // 重置颜色
  });
}

function initGame() {
  document.querySelector('.chessBoard').addEventListener('click', function(event) {
    if (event.target.classList.contains('box') && !gameState.result) {
      const box = event.target;
      //console.log(box);
      const number = box.dataset.number - 1;
      const row = Math.floor(number / 3);
      const col = number % 3;
      if (gameState.map[row][col] === null) {
        gameState.map[row][col] = gameState.moveCount % 2 === 0 ? 'o' : 'x';
        box.innerText = gameState.map[row][col];
        if (box.innerText === 'o') {
          box.style.color = 'red';
        }
        gameState.result = checkWin();
        console.log(gameState.result)
        gameState.moveCount++;
        document.querySelector('.moveCount').innerText = gameState.moveCount;
        document.querySelector('.gameResultDisplay').innerText = gameState.result ? gameState.result + " 赢了" : "胜负未分";
      }
    }
  });

  document.querySelector('.reset').addEventListener('click', resetGame);
}

initGame();