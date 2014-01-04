// Generated by CoffeeScript 1.6.3
(function() {
  this.Grid = (function() {
    function Grid(_opts) {
      this.options = _opts;
    }

    Grid.prototype.dimensions = function() {
      return this._dimensions || (this._dimensions = this.options.dimensions || new THREE.Vector2(10, 10));
    };

    Grid.prototype.cols = function() {
      return this.dimensions().x;
    };

    Grid.prototype.rows = function() {
      return this.dimensions().y;
    };

    Grid.prototype.cell_size = function() {
      return this._cell_size || (this._cell_size = this.options.cell_size || new THREE.Vector3(200, 200, 200));
    };

    Grid.prototype.boxes = function() {
      return this._boxes || (this._boxes = this.generateBoxes());
    };

    Grid.prototype.generateBoxes = function() {
      var boxes, geometry, material, x, y, _i, _j, _ref, _ref1;
      geometry = new THREE.CubeGeometry(200, 200, 200);
      material = new THREE.MeshBasicMaterial({
        color: 0x0000ff,
        wireframe: true
      });
      boxes = [];
      for (y = _i = 0, _ref = this.rows() - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; y = 0 <= _ref ? ++_i : --_i) {
        for (x = _j = 0, _ref1 = this.cols() - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
          boxes.push(new THREE.Mesh(geometry, material));
        }
      }
      return boxes;
    };

    Grid.prototype.animateBoxes = function() {
      var box, i, _i, _len, _ref, _results;
      _ref = this.boxes();
      _results = [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        box = _ref[i];
        _results.push(box.rotation.x += 0.01 * (i + 1));
      }
      return _results;
    };

    Grid.prototype.addBoxesToScene = function(scene) {
      var box, _i, _len, _ref, _results;
      _ref = this.boxes();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        box = _ref[_i];
        console.log('adding');
        console.log(box);
        _results.push(scene.add(box));
      }
      return _results;
    };

    return Grid;

  })();

}).call(this);
