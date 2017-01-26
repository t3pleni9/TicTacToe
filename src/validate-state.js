(function () {
  'use strict';

  var gameBoard = [];
  var currentMove = 0;
  var boardSymbols = ['X', 'O'];

  function checkRows(board) {
    return board.filter(function (row) {
          return !!row.reduce(function (a, b) {
            return (b !== ' ' && a === b) ? a : NaN;
          });
        }).length !== 0;

  }

  function transpose(board) {
    return board[0].map(function (col, i) {
      return board.map(function (row) {
        return row[i]
      })
    });
  }

  function checkCols(board) {
    return checkRows(transpose(board));
  }

  function diagonals(board) {
    return board[0].reduce(function (diagonal, elem, i) {
      diagonal[0].push(board[i][i]);
      diagonal[1].push(board[i][board.length - 1 - i]);

      return diagonal;
    }, [[], []]);
  }

  function checkDiagonals(board) {
    return checkRows(diagonals(board));
  }

  function winChecker() {
    return checkRows(gameBoard) || checkCols(gameBoard) || checkDiagonals(gameBoard);
  }

  function init() {
    gameBoard = [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' ']
    ];

    currentMove = 0;
  }

  //noinspection JSUnresolvedVariable
  module.exports = {
    board: function () {
      return gameBoard
    },
    init: init,
    move: function (nextMove) {
      if (gameBoard[nextMove.x][nextMove.y] !== ' ') {
        return 'invalid';
      }

      var boardSymbol = boardSymbols[currentMove];
      gameBoard[nextMove.x][nextMove.y] = boardSymbol;

      if (winChecker()) {
        init();
        return boardSymbol + ' wins the game';
      }

      currentMove = (currentMove + 1) % 2;
      return 'valid';

    }
  }
  ;
})();