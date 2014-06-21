// Generated by CoffeeScript 1.6.3
(function() {
  var Disturbance, _ref, _ref1, _ref2, _ref3,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.DisturbancePicker = (function() {
    function DisturbancePicker(_opts) {
      this.options = _opts;
    }

    DisturbancePicker.prototype.allClasses = function() {
      return [HorizontalDisturbance, VerticalDisturbance, BumpDisturbance, CircularDisturbance, EqualizerDisturbance];
    };

    DisturbancePicker.prototype.randomClass = function() {
      return this.allClasses()[Math.floor(Math.random() * this.allClasses.length)];
    };

    DisturbancePicker.prototype.indexDisturbance = function(idx) {
      console.log("Creating disturbance from class index " + idx);
      return new (this.allClasses()[idx])(this.options);
    };

    DisturbancePicker.prototype.createDisturbance = function(klass) {
      console.log("Creating random disturbance");
      return new (klass || this.randomClass())(this.options);
    };

    return DisturbancePicker;

  })();

  Disturbance = (function() {
    function Disturbance(_opts) {
      this.options = _opts;
    }

    Disturbance.prototype.stepCount = function() {
      return this._stepCount || (this._stepCount = 0);
    };

    Disturbance.prototype.grid = function() {
      return this.options.grid;
    };

    Disturbance.prototype.step = function() {
      this.performStep();
      return this._stepCount = this.stepCount() + 1;
    };

    Disturbance.prototype.performStep = function() {};

    Disturbance.prototype.done = function() {};

    return Disturbance;

  })();

  this.HorizontalDisturbance = (function(_super) {
    __extends(HorizontalDisturbance, _super);

    function HorizontalDisturbance() {
      _ref = HorizontalDisturbance.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    HorizontalDisturbance.prototype.speed = 0.001;

    HorizontalDisturbance.prototype.performStep = function() {
      var box, i, _i, _len, _ref1, _results;
      _ref1 = this.options.grid.boxes();
      _results = [];
      for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
        box = _ref1[i];
        _results.push(box.rotation.x += this.speed * (i + 1));
      }
      return _results;
    };

    HorizontalDisturbance.prototype.done = function() {
      if (this.stepCount() * this.speed >= Math.PI) {
        return true;
      }
      return false;
    };

    return HorizontalDisturbance;

  })(Disturbance);

  this.VerticalDisturbance = (function(_super) {
    __extends(VerticalDisturbance, _super);

    function VerticalDisturbance() {
      _ref1 = VerticalDisturbance.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    VerticalDisturbance.prototype.speed = 0.001;

    VerticalDisturbance.prototype.performStep = function() {
      var x, y, _i, _ref2, _results;
      _results = [];
      for (x = _i = 0, _ref2 = this.options.grid.cols() - 1; 0 <= _ref2 ? _i <= _ref2 : _i >= _ref2; x = 0 <= _ref2 ? ++_i : --_i) {
        _results.push((function() {
          var _j, _ref3, _results1;
          _results1 = [];
          for (y = _j = 0, _ref3 = this.options.grid.rows() - 1; 0 <= _ref3 ? _j <= _ref3 : _j >= _ref3; y = 0 <= _ref3 ? ++_j : --_j) {
            _results1.push(this.options.grid.getBoxXY(x, y).rotation.y += this.speed * (x * this.grid().rows() + y));
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    VerticalDisturbance.prototype.done = function() {
      if (this.stepCount() * this.speed >= Math.PI) {
        return true;
      }
      return false;
    };

    return VerticalDisturbance;

  })(Disturbance);

  this.BumpDisturbance = (function(_super) {
    __extends(BumpDisturbance, _super);

    function BumpDisturbance() {
      _ref2 = BumpDisturbance.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    BumpDisturbance.prototype.performStep = function() {
      return this.options.grid.boxes()[0].position.z += (this.stepCount() - 5) * 10;
    };

    BumpDisturbance.prototype.done = function() {
      return this.stepCount() >= 11;
    };

    return BumpDisturbance;

  })(Disturbance);

  this.CircularDisturbance = (function(_super) {
    __extends(CircularDisturbance, _super);

    function CircularDisturbance(_opts) {
      CircularDisturbance.__super__.constructor.call(this, _opts);
      console.log("CircularDisturbance position: " + this.center().x + ", " + this.center().y);
    }

    CircularDisturbance.prototype.center = function() {
      return this._center || (this._center = this.grid().randomBox().position);
    };

    CircularDisturbance.prototype.totalSteps = function() {
      return this._totalSteps || (this._totalSteps = Math.floor(Math.random() * 500) + 100);
    };

    CircularDisturbance.prototype.sinStep = function() {
      return THREE.PI2 / this.totalSteps();
    };

    CircularDisturbance.prototype.sinRoot = function() {
      return this._sinRoot || (this._sinRoot = Math.random(THREE.PI2));
    };

    CircularDisturbance.prototype.factor = function() {
      return this._factor || (this._factor = Math.random(0.001) + 0.000001);
    };

    CircularDisturbance.prototype.rippleSpeed = function() {
      return this._rippleSpeed || (this._rippleSpeed = 0.1);
    };

    CircularDisturbance.prototype.performStep = function() {
      var amplitude, box, i, _i, _len, _ref3, _results;
      _ref3 = this.grid().boxes();
      _results = [];
      for (i = _i = 0, _len = _ref3.length; _i < _len; i = ++_i) {
        box = _ref3[i];
        amplitude = box.position.distanceTo(this.center()) * this.factor() * 0.01;
        _results.push(box.position.z += Math.cos(this.rippleSpeed() * this.stepCount()) * amplitude);
      }
      return _results;
    };

    CircularDisturbance.prototype.done = function() {
      return this.stepCount() >= this.totalSteps();
    };

    return CircularDisturbance;

  })(Disturbance);

  this.EqualizerDisturbance = (function(_super) {
    __extends(EqualizerDisturbance, _super);

    function EqualizerDisturbance() {
      _ref3 = EqualizerDisturbance.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    EqualizerDisturbance.prototype.center = function() {
      return this._center || (this._center = this.grid().randomBox().position);
    };

    EqualizerDisturbance.prototype.totalSteps = function() {
      return this._totalSteps || (this._totalSteps = Math.floor(Math.random() * 100));
    };

    EqualizerDisturbance.prototype.sinStep = function() {
      return THREE.PI2 / this.totalSteps();
    };

    EqualizerDisturbance.prototype.performStep = function() {
      var box, distance_to_center, i, _i, _len, _ref4, _results;
      _ref4 = this.grid().boxes();
      _results = [];
      for (i = _i = 0, _len = _ref4.length; _i < _len; i = ++_i) {
        box = _ref4[i];
        distance_to_center = box.position.distanceTo(this.center());
        _results.push(box.position.z += Math.sin(Math.random() * THREE.Math.PI2) * 30);
      }
      return _results;
    };

    EqualizerDisturbance.prototype.done = function() {
      return this.stepCount() >= this.totalSteps();
    };

    return EqualizerDisturbance;

  })(Disturbance);

}).call(this);
