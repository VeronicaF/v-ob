/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isObj = isObj;
function isObj(data) {
    return Object.prototype.toString.call(data) === '[object Object]';
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.observe = observe;

var _util = __webpack_require__(0);

var _Observer = __webpack_require__(3);

var _Watcher = __webpack_require__(5);

function observe(data) {
    if (!(0, _util.isObj)(data)) {
        return;
    }
    new _Observer.Observer(data);
}

var obj = {
    a: 'a',
    le1: {
        b: 'b'
    }
};
observe(obj);
console.log(obj);
new _Watcher.Watcher(obj, 'a', function () {
    alert('aaaaa');
});
new _Watcher.Watcher(obj, 'a', function () {
    alert('bbbbb');
});
obj.a = '12345';
console.log(obj);

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Observer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _Dep = __webpack_require__(4);

var _index = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Observer = exports.Observer = function () {
    function Observer(data) {
        _classCallCheck(this, Observer);

        this.walk(data);
    }

    _createClass(Observer, [{
        key: 'walk',
        value: function walk(data) {
            var _this = this;

            Object.keys(data).forEach(function (key) {
                _this.defineReactive(data, key, data[key]);
            });
        }
    }, {
        key: 'defineReactive',
        value: function defineReactive(obj, key, val) {
            if ((0, _util.isObj)(val)) {
                new Observer(val);
            }
            var dep = new _Dep.Dep();
            Object.defineProperty(obj, key, {
                configurable: true,
                enumerable: true,
                get: function reactiveGetter() {
                    if (_Dep.Dep.target) {
                        dep.append();
                    }
                    return val;
                }
            });
            Object.defineProperty(obj, key, {
                configurable: true,
                enumerable: true,
                set: function reactiveSetter(newVal) {
                    if (newVal !== val) {
                        if ((0, _util.isObj)(newVal)) {
                            (0, _index.observe)(newVal);
                        }
                        val = newVal;
                        dep.notify();
                    }
                }
            });
        }
    }]);

    return Observer;
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.pushTarget = pushTarget;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dep = exports.Dep = function () {
    function Dep() {
        _classCallCheck(this, Dep);

        this.subs = [];
    }

    _createClass(Dep, [{
        key: "addSub",
        value: function addSub() {
            this.subs.push(Dep.target);
        }
    }, {
        key: "append",
        value: function append() {
            Dep.target.addDep(this);
        }
    }, {
        key: "notify",
        value: function notify() {
            this.subs.forEach(function (sub) {
                return sub.cb();
            });
        }
    }]);

    return Dep;
}();

Dep.target = null;
function pushTarget(watch) {
    Dep.target = watch;
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Watcher = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Dep = __webpack_require__(4);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Watcher = exports.Watcher = function () {
    function Watcher(obj, exp, cb) {
        _classCallCheck(this, Watcher);

        this.exp = exp;
        this.cb = cb;
        this.deps = [];
        (0, _Dep.pushTarget)(this);
        obj[exp];
    }

    _createClass(Watcher, [{
        key: 'addDep',
        value: function addDep(dep) {
            this.deps.push(dep);
            dep.addSub(this);
        }
    }]);

    return Watcher;
}();

/***/ })
/******/ ]);