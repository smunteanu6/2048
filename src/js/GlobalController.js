function GlobalController (UI, Game) {

  const position = (x, y) => x * 4 + y;

  let highScore = 0, score = 0;
  let initializationInProgress = false;

  const free = { cells: [...Array(16)].fill(true), length: 16 }

  function move (x1, y1, x2, y2) {
    const p1 = position(x1, y1);
    const p2 = position(x2, y2);
    UI.moveCell(p1, p2);
    free.cells[p1] = true;
    free.cells[p2] = false;
  }

  function merge (x1, y1, x2, y2, value) {
    const p1 = position(x1, y1);
    const p2 = position(x2, y2);
    UI.mergeCell(p1, p2), score += value;
    if (score > highScore) highScore = score;
    UI.setScore(score), UI.setHighScore(highScore);
    free.cells[p1] = true, free.length++;
  }

  function chooseCell () {
    let remain = Math.floor(Math.random() * free.length);
    for (let position = 0; position < 16; position ++) {
      if (free.cells[position]) remain--;
      if (remain < 0) return position;
    }
  }

  function addRandomCell () {
    const pow = Number(Math.random() > 0.9);
    const pos = chooseCell();
    UI.addCell(pos, 1 << (pow + 1), pow);
    free.cells[pos] = false;
    free.length--;
    Game.addCell(pos, 1 << (pow + 1));
  }

  function gameOver() {
    initializationInProgress = true;
    UI.gameOver();
  }

  function turn (direction) {
    UI.completeAnimations();
    if (!Game.swipe(direction, move, merge)) return addRandomCell();
  }

  function initialize () {
    initializationInProgress = true;
    Game.initialize();
    UI.initialize();
    UI.setScore(0);
    free.cells.fill(true);
    free.length = 16, score = 0;
    addRandomCell(), addRandomCell();
    initializationInProgress = false;
  }

  document.addEventListener('keyup', function (event) {
    if (initializationInProgress) return;
    if (event.code == 'KeyD' || event.code == 'ArrowRight') turn('right');
    if (event.code == 'KeyS' || event.code == 'ArrowDown') turn('down');
    if (event.code == 'KeyA' || event.code == 'ArrowLeft') turn('left');
    if (event.code == 'KeyW' || event.code == 'ArrowUp') turn('up');

    if (!free.length && !Game.checkContinuity()) return gameOver();
  });

  UI.dom.restartButton.addEventListener('click', initialize);

  return { UI, Game, initialize }

}

export default GlobalController;