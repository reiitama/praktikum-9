const selectBox = document.querySelector(".selectbox"),
  selectX = selectBox.querySelector(".options .playerX"),
  selectO = selectBox.querySelector(".options .playerO"),
  gameBoard = document.querySelector(".gameboard"),
  players = document.querySelector(".players"),
  allBox = document.querySelectorAll("section span"),

  resultBox = document.querySelector(".result"),
  wonText = resultBox.querySelector(".won-text"),
  replay = resultBox.querySelector("button");

window.onload = () => {
  for (let i = 0; i < allBox.length; i++) {
    allBox[i].setAttribute("onclick", "clickedBox(this)");
  }
}

selectX.onclick = () => {
  selectBox.classList.add("hide");
  gameBoard.classList.add("show");
}

selectO.onclick = () => {
  selectBox.classList.add("hide");
  gameBoard.classList.add("show");
  players.setAttribute("class", "players active player");
}

let playerXIcon = "fas fa-times", playerOIcon = "far fa-circle", playerSign = "X", runAI = true;
function clickedBox(element) {
  if (players.classList.contains("player")) {
    playerSign = "O";
    element.innerHTML = `<i class="${playerOIcon}"></i>`;
    players.classList.remove("active");
    element.setAttribute("id", playerSign);
  }
  else {
    element.innerHTML = `<i class="${playerXIcon}"></i>`;
    element.setAttribute("id", playerSign);
    players.classList.add("active");
  }
  selectWinner();
  element.style.pointerEvents = "none";
  gameBoard.style.pointerEvents = "none";
  let randomTimeDelay = ((Math.random() * 1000) + 200).toFixed();
  setTimeout(() => {
    AI(runAI);
  }, randomTimeDelay);
  console.log(gameBoard);

}
function AI() {
  let array = [];
  if (runAI) {
    playerSign = "O";
    for (let i = 0; i < allBox.length; i++) {
      if (allBox[i].childElementCount == 0) {
        array.push(i);
      }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)];
    if (array.length > 0) {
      if (players.classList.contains("player")) {
        playerSign = "X";
        allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
        allBox[randomBox].setAttribute("id", playerSign);
        players.classList.add("active");
      }
      else {
        allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
        players.classList.remove("active");
        allBox[randomBox].setAttribute("id", playerSign);
      }
      selectWinner();
    }
    allBox[randomBox].style.pointerEvents = "none";
    gameBoard.style.pointerEvents = "auto";
    playerSign = "X";
  }
}
function getIdtiles(classname) {
  return document.querySelector(".box" + classname).id;
}
function checkIdSign(tiles1, tiles2, tiles3, sign) {
  if (getIdtiles(tiles1) == sign && getIdtiles(tiles2) == sign && getIdtiles(tiles3) == sign) {
    return true;
  }
  return false;
}
function selectWinner() {
  if (checkIdSign(1, 2, 3, playerSign) || checkIdSign(4, 5, 6, playerSign) || checkIdSign(7, 8, 9, playerSign) || checkIdSign(1, 4, 7, playerSign) || checkIdSign(2, 5, 8, playerSign) || checkIdSign(3, 6, 9, playerSign) || checkIdSign(1, 5, 9, playerSign) || checkIdSign(3, 5, 7, playerSign)) {
    runAI = false;
    AI(runAI);
    setTimeout(() => {
      resultBox.classList.add("show");
      gameBoard.classList.remove("show");
    }, 700);
    wonText.innerHTML = `Player ${playerSign}<br> memenangkan permainan!`;
  }
  else {
    if (getIdtiles(1) != "" && getIdtiles(2) != "" && getIdtiles(3) != "" && getIdtiles(4) != "" && getIdtiles(5) != "" && getIdtiles(6) != "" && getIdtiles(7) != "" && getIdtiles(8) != "" && getIdtiles(9) != "") {
      runAI = false;
      AI(runAI);
      setTimeout(() => {
        resultBox.classList.add("show");
        gameBoard.classList.remove("show");
      }, 700);
      wonText.textContent = "Permainan berakhir seri!";
    }
  }
}
replay.onclick = () => {
  window.location.reload();
}