(function () {
  'use strict';
  var expect = require('chai').expect,
      stateValidator = require('../src/validate-state');

  describe('Validate valid move', function() {
    beforeEach(function () {
      stateValidator.init();
    });

    it('init should initialize the game board', function () {
      var expectedBoard = [
          [' ',' ',' '],
          [' ',' ',' '],
          [' ',' ',' ']
      ];
      stateValidator.init();
      expect(stateValidator.board()).eql(expectedBoard);
    });

    it('should update the board with the coordinates and symbol of the current move', function () {
      var expectedBoard = [
        [' ','X',' '],
        [' ','O',' '],
        [' ',' ',' ']
      ];

      stateValidator.move({x:0, y:1});
      stateValidator.move({x:1, y:1});

      expect(stateValidator.board()).eql(expectedBoard);
    });

    it('should return validity of the current move, and set symbols on board accordingly', function () {
      var expectedBoard = [
        [' ','X',' '],
        [' ','O',' '],
        [' ',' ',' ']
      ];

      expect(stateValidator.move({x:0, y:1})).equal('valid');
      expect(stateValidator.move({x:0, y:1})).equal('invalid');
      expect(stateValidator.move({x:1, y:1})).equal('valid');

      expect(stateValidator.board()).eql(expectedBoard);
    });

    describe('Win checker', function () {
      it('should return win with symbol if the move resulted in a win [row - x]', function () {
        stateValidator.move({x:0, y:0});
        stateValidator.move({x:1, y:1});
        stateValidator.move({x:0, y:1});
        stateValidator.move({x:1, y:2});


        expect(stateValidator.move({x:0, y:2})).equal('X wins the game');
      });

      it('should return win with symbol if the move resulted in a win [row - o]', function () {
        stateValidator.move({x:0, y:0});
        stateValidator.move({x:1, y:1});
        stateValidator.move({x:0, y:1});
        stateValidator.move({x:1, y:2});
        stateValidator.move({x:2, y:2});

        expect(stateValidator.move({x:1, y:0})).equal('O wins the game');
      });

      it('should return win with symbol if the move resulted in a win [col]', function () {
        stateValidator.move({x:0, y:0});
        stateValidator.move({x:1, y:1});
        stateValidator.move({x:1, y:0});
        stateValidator.move({x:1, y:2});


        expect(stateValidator.move({x:2, y:0})).equal('X wins the game');
      });

      it('should return win with symbol if the move resulted in a win [ primary diagonal]', function () {
        stateValidator.move({x:0, y:0});
        stateValidator.move({x:1, y:0});
        stateValidator.move({x:1, y:1});
        stateValidator.move({x:1, y:2});


        expect(stateValidator.move({x:2, y:2})).equal('X wins the game');
      });

      it('should return win with symbol if the move resulted in a win [ secondary diagonal]', function () {
        stateValidator.move({x:0, y:2});
        stateValidator.move({x:1, y:0});
        stateValidator.move({x:1, y:1});
        stateValidator.move({x:1, y:2});


        expect(stateValidator.move({x:2, y:0})).equal('X wins the game');
      });

      it('should restart the game after a wining move', function () {
        var expectedBoard = [
          [' ',' ',' '],
          [' ',' ',' '],
          ['X',' ',' ']
        ];

        stateValidator.move({x:0, y:0});
        stateValidator.move({x:1, y:1});
        stateValidator.move({x:1, y:0});
        stateValidator.move({x:1, y:2});
        stateValidator.move({x:2, y:0});

        stateValidator.move({x:2, y:0});

        expect(stateValidator.board()).eql(expectedBoard);
      });

    });


  });

})();
