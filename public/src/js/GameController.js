const coordinates = position => [Math.floor(position / 4), position % 4];

function GameController () {

  const matrix = [...Array(4)].map(() => [...Array(4)].fill(null));

  function addCell (position, value) {
    const [row, col] = coordinates(position);
    matrix[row][col] = value;
  }

  const swipeControllers = {
    
    right: function (movecb, mergecb) {
      let completedAction = false;
      for (let row = 0; row < 4; row ++) {
        for (let col = 3, last = 3; col >= 0; col --) {
          if (matrix[row][col] && last != col) {
            if (matrix[row][col] == matrix[row][last]) matrix[row][last] *= 2, mergecb(row, col, row, last, matrix[row][last]), last--, completedAction = true;
            else if ((last -= !!matrix[row][last]) == col) continue;
            else matrix[row][last] = matrix[row][col], movecb(row, col, row, last), completedAction = true;
            matrix[row][col] = null;
          }
        }
      }
      return completedAction;
    },

    down: function (movecb, mergecb) {
      let completedAction = false;
      for (let col = 0; col < 4; col ++) {
        for (let row = 3, last = 3; row >= 0; row --) {
          if (matrix[row][col] && last != row) {
            if (matrix[row][col] == matrix[last][col]) matrix[last][col] *= 2, mergecb(row, col, last, col, matrix[last][col]), last--, completedAction = true;
            else if ((last -= !!matrix[last][col]) == row) continue;
            else matrix[last][col] = matrix[row][col], movecb(row, col, last, col), completedAction = true;
            matrix[row][col] = null;
          }
        }
      }
      return completedAction;
    },

    left: function (movecb, mergecb) {
      let completedAction = false;
      for (let row = 0; row < 4; row ++) {
        for (let col = 0, last = 0; col < 4; col ++) {
          if (matrix[row][col] && last != col) {
            if (matrix[row][col] == matrix[row][last]) matrix[row][last] *= 2, mergecb(row, col, row, last, matrix[row][last]), last++, completedAction = true;
            else if ((last += !!matrix[row][last]) == col) continue;
            else matrix[row][last] = matrix[row][col], movecb(row, col, row, last), completedAction = true;
            matrix[row][col] = null;
          }
        }
      }
      return completedAction;
    },

    up: function (movecb, mergecb) {
      let completedAction = false;
      for (let col = 0; col < 4; col ++) {
        for (let row = 0, last = 0; row < 4; row ++) {
          if (matrix[row][col] && last != row) {
            if (matrix[row][col] == matrix[last][col]) matrix[last][col] *= 2, mergecb(row, col, last, col, matrix[last][col]), last++, completedAction = true;
            else if ((last += !!matrix[last][col]) == row) continue;
            else matrix[last][col] = matrix[row][col], movecb(row, col, last, col), completedAction = true;
            matrix[row][col] = null;
          }
        }
      }
      return completedAction;
    }
  }

  function swipe (direction, movecb, mergecb) {
    return !swipeControllers[direction](movecb, mergecb);
  }

  function checkContinuity () {
    for (let row = 0; row < 3; row++)
      for (let col = 0; col < 3; col++)
        if (matrix[row][col] == matrix[row + 1][col] || matrix[row][col] == matrix[row][col + 1])
          return true;
    for (let lin = 0; lin < 3; lin++)
      if (matrix[lin][3] == matrix[lin + 1][3] || matrix[3][lin] == matrix[3][lin + 1])
        return true;
    return false;
  }

  function initialize () {
    for (const array of matrix)
      for (const ix in array)
        array[ix] = null;
  }

  return { addCell, swipe, matrix, checkContinuity, initialize }

}

export default GameController;