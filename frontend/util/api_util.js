var ApiActions = require('../actions/api_actions');

module.exports = {

  createGame: function (formData, callback) {
    $.ajax({
      type: 'POST',
      url: 'api/games',
      data: { game: formData },
      success: function(formData) {
        ApiActions.receiveGame(formData);
        callback && callback();
      },
      error: function(data) {
        console.log(data);
      }
    });
  },

  fetchPlayer: function (playerId) {
    $.ajax({
      type: 'GET',
      url: 'api/players/' + playerId,
      success: function (player) {
        ApiActions.receivePlayers([player]);
      },
      error: function (data) {
        console.log(data);
      }
    });
  },

  createPlayer: function(formData, callback) {
    $.ajax({
      type: 'POST',
      url: 'api/players',
      data: { player: formData },
      success: function (currentPlayer) {
        ApiActions.currentPlayerReceived(currentPlayer);
        callback && callback();
      },
      error: function (data) {
        console.log(data);
      }
    });
  },

  createBoard: function(boardInfo, callback) {
    console.log("Create Board");
    $.ajax({
      type: 'POST',
      url: 'api/boards',
      data: { board: boardInfo },
      success: function (board) {
        ApiActions.receiveBoard(board);
        callback && callback();
      },
      error: function (data) {
        console.log(data);
      }
    });
  },

  fetchBoard: function (boardId) {
    $.ajax({
      type: 'GET',
      url: 'api/boards/' + boardId,
      success: function (board) {
        ApiActions.receiveBoard(board);
      },
      error: function(data) {
        console.log(data);
      }
    });
  },

  fetchComputerBoard: function (boardId) {
    $.ajax({
      type: 'GET',
      url: 'api/boards/' + boardId,
      success: function (board) {
        ApiActions.receiveComputerBoard(board);
      },
      error: function(data) {
        console.log(data);
      }
    });
  },

  updateBoard: function(boardInfo, callback) {
    $.ajax({
      type: 'PUT',
      url: 'api/boards/' + boardInfo.board_id,
      data: { board: boardInfo },
      success: function (board) {
        ApiActions.receiveBoard(board);
        callback && callback();
      },
      error: function(data) {
        console.log(data);
      }
    });
  },

  createCell: function(cellInfo, callback) {
    $.ajax({
      type: 'POST',
      url: 'api/boards/' + cellInfo.board_id + '/cells',
      data: { cell: cellInfo },
      success: function (cell) {
        ApiActions.receiveCell(cell);
        callback && callback();
      },
      error: function(data) {
        console.log(data);
      }
    });
  },

  updateCell: function(cellInfo, callback) {
    $.ajax({
      type: 'PUT',
      url: 'api/boards/' + cellInfo.board_id + '/cells/' + cellInfo.id,
      data: { cell: cellInfo },
      success: function (cell) {
        ApiActions.updateCell(cell);
        callback && callback();
      },
      error: function(data) {
        console.log(data);
      }
    });
  },

  updateComputerCell: function(cellInfo, callback) {
    $.ajax({
      type: 'PUT',
      url: 'api/boards/1/cells/' + cellInfo.id,
      data: { cell: cellInfo },
      success: function (cell) {
        ApiActions.updateComputerCell(cell);
        callback && callback();
      },
      error: function(data) {
        console.log(data);
      }
    });
  },

  checkComputerCell: function(cellInfo, callback) {
    $.ajax({
      type: 'PUT',
      url: 'api/boards/1/cells/' + cellInfo.id,
      data: { cell: cellInfo },
      success: function (cell) {
        ApiActions.checkComputerCell(cell);
        callback && callback();
      },
      error: function(data) {
        console.log(data);
      }
    });
  },

  checkCell: function(cellInfo, callback) {
    $.ajax({
      type: 'PUT',
      url: 'api/boards/' + cellInfo.board_id + '/cells/' + cellInfo.id,
      data: { cell: cellInfo },
      success: function (cell) {
        ApiActions.checkCell(cell);
        callback && callback();
      },
      error: function(data) {
        console.log(data);
      }
    });
  },
};
