/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_flux__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_flux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_flux__);


let AppDispatcher = new __WEBPACK_IMPORTED_MODULE_0_flux___default.a.Dispatcher();
/* harmony default export */ __webpack_exports__["a"] = (AppDispatcher);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const Constants = {
  CHANGE_EVENT: 'change',
  ADD_COMMENT: 'comments.add',
  SET_COMMENTS: 'comments.set_comments',
  UPVOTE_COMMENT: 'comments.upvote'
};

/* harmony default export */ __webpack_exports__["a"] = (Constants);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_comment_section__ = __webpack_require__(5);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_dispatcher__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api__ = __webpack_require__(4);




class Actions {

  constructor(restaurantId) {
    this.restaurantId = restaurantId;
    // long polling
    // this.watchInterval = setInterval(this.watch.bind(this), 1000);
  }

  setComments(params) {
    __WEBPACK_IMPORTED_MODULE_0__app_dispatcher__["a" /* default */].dispatch({
      actionType: __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* default */].SET_COMMENTS,
      comments: params
    });
  }

  upvoteComment(comment) {
    __WEBPACK_IMPORTED_MODULE_2__api__["a" /* default */].put(`/restaurants/${this.restaurantId}/comments/${comment.id}/upvote`).then(comment => {
      __WEBPACK_IMPORTED_MODULE_0__app_dispatcher__["a" /* default */].dispatch({
        actionType: __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* default */].UPVOTE_COMMENT,
        comment: comment
      });
    });
  }

  addComment(params) {
    __WEBPACK_IMPORTED_MODULE_2__api__["a" /* default */].post(`/restaurants/${this.restaurantId}/comments`, {
      comment: params
    }).then(comment => {
      __WEBPACK_IMPORTED_MODULE_0__app_dispatcher__["a" /* default */].dispatch({
        actionType: __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* default */].ADD_COMMENT,
        comment: comment
      });
    });
  }

  watch() {
    __WEBPACK_IMPORTED_MODULE_2__api__["a" /* default */].get(`/restaurants/${this.restaurantId}/comments`).then(comments => {
      this.setComments(comments);
    });
  }
}
/* harmony default export */ __webpack_exports__["a"] = (Actions);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Api {

  static token() {
    let el = document.querySelector('meta[name="csrf-token"]');
    return el ? el.getAttribute('content') : '';
  }

  static headers() {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': this.token(),
      'X-Requested-With': 'XMLHttpRequest'
    };
  }

  static get(route, params) {
    return this.xhr(route, params, 'get');
  }

  static put(route, params) {
    return this.xhr(route, params, 'put');
  }

  static post(route, params) {
    return this.xhr(route, params, 'post');
  }

  static xhr(route, params, verb) {
    return fetch(route + '.json', _.merge({
      method: verb,
      credentials: 'include',
      headers: this.headers()
    }, { body: JSON.stringify(params) })).then(resp => {
      return resp.json();
    });
  }
}
/* harmony default export */ __webpack_exports__["a"] = (Api);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stores_comment_store__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__comment_list__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__comment_form__ = __webpack_require__(8);





class CommentSection extends React.Component {
  constructor(props) {
    super();
    this.store = new __WEBPACK_IMPORTED_MODULE_1__stores_comment_store__["a" /* default */]();
    this.actions = new __WEBPACK_IMPORTED_MODULE_0__actions__["a" /* default */](props.restaurantId);
    this.actions.setComments(JSON.parse(props.comments));
  }

  static get childContextTypes() {
    return {
      store: React.PropTypes.object.isRequired,
      actions: React.PropTypes.object.isRequired
    };
  }

  getChildContext() {
    return {
      store: this.store,
      actions: this.actions
    };
  }

  render() {
    return React.createElement(
      'div',
      null,
      React.createElement(__WEBPACK_IMPORTED_MODULE_3__comment_form__["a" /* default */], { isReplying: true }),
      React.createElement(__WEBPACK_IMPORTED_MODULE_2__comment_list__["a" /* default */], { parent_id: null })
    );
  }
}

window.CommentSection = CommentSection;
/* unused harmony default export */ var _unused_webpack_default_export = (CommentSection);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_dispatcher__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__(1);



class CommentStore extends EventEmitter {

  constructor() {
    super();
    this.setMaxListeners(0);
    this._comments = [];

    __WEBPACK_IMPORTED_MODULE_0__app_dispatcher__["a" /* default */].register(payload => {
      switch (payload.actionType) {
        case __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* default */].SET_COMMENTS:
          this.setComments(payload.comments);
          this.emitChange();
          break;
        case __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* default */].UPVOTE_COMMENT:
          this.upvote(payload.comment);
          this.emitChange();
          break;
        case __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* default */].ADD_COMMENT:
          this.addComment(payload.comment);
          this.emitChange();
          break;
        default:
        // NO-OP
      }
    });
  }

  setComments(comments) {
    comments.forEach(comment => {
      this.addComment(comment);
    });
  }

  upvote(comment) {
    this._comments[comment.id].rank++;
  }

  addComment(comment) {
    this._comments[comment.id || this._comments.length] = comment;
  }

  comments(parentId) {
    return _.chain(this._comments.filter(c => {
      return c && c.parent_id === parentId;
    })).sortBy('rank').reverse().value();
  }

  addChangeListener(callback) {
    this.on(__WEBPACK_IMPORTED_MODULE_1__constants__["a" /* default */].CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(__WEBPACK_IMPORTED_MODULE_1__constants__["a" /* default */].CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(__WEBPACK_IMPORTED_MODULE_1__constants__["a" /* default */].CHANGE_EVENT);
  }
}
/* harmony default export */ __webpack_exports__["a"] = (CommentStore);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class CommentForm extends React.Component {

  static get contextTypes() {
    return {
      actions: React.PropTypes.object.isRequired
    };
  }

  static get propTypes() {
    return {
      isReplying: React.PropTypes.bool,
      onCommentSubmitted: React.PropTypes.func,
      parent_id: React.PropTypes.number
    };
  }

  constructor(props) {
    super();
    this.defaultState = { body: '', author: '' };
    this.state = this.defaultState;
  }

  submitComment(event) {
    event.preventDefault();
    this.context.actions.addComment(_.merge(this.state, { parent_id: this.props.parent_id }));
    this.setState(this.defaultState);
    if (this.props.onCommentSubtitted) {
      this.props.onCommentSubtitted();
    }
  }

  onFieldChange(event) {
    let prop = {};
    prop[event.target.name] = event.target.value; // {author: event.target.value}
    this.setState(prop);
  }

  render() {
    return React.createElement(
      'div',
      { className: this.props.isReplying ? '' : 'hide' },
      React.createElement(
        'form',
        null,
        React.createElement(
          'label',
          null,
          'Author'
        ),
        React.createElement('input', { type: 'text', name: 'author', onChange: this.onFieldChange.bind(this), value: this.state.author }),
        React.createElement(
          'label',
          null,
          ' Comment '
        ),
        React.createElement('textarea', { name: 'body', value: this.state.body, onChange: this.onFieldChange.bind(this) }),
        React.createElement(
          'button',
          { className: 'success button', onClick: this.submitComment.bind(this), type: 'submit' },
          'Submit'
        )
      )
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (CommentForm);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__comment__ = __webpack_require__(10);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



class CommentList extends React.Component {

  static get contextTypes() {
    return {
      store: React.PropTypes.object.isRequired
    };
  }

  componentDidMount() {
    this.context.store.addChangeListener(this._onChange.bind(this));
  }

  componentWillMount() {
    this.context.store.removeChangeListener(this._onChange.bind(this));
  }

  render() {
    return React.createElement(
      'ul',
      null,
      this.context.store.comments(this.props.parent_id).map(function (comment, i) {
        return React.createElement(__WEBPACK_IMPORTED_MODULE_0__comment__["a" /* default */], _extends({ key: i }, comment));
      })
    );
  }

  _onChange() {
    this.forceUpdate();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (CommentList);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_components_comment_form__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_components_comment_list__ = __webpack_require__(9);



class Comment extends React.Component {

  static get contextTypes() {
    return {
      actions: React.PropTypes.object.isRequired
    };
  }

  static get propTypes() {
    return {
      id: React.PropTypes.number,
      author: React.PropTypes.string,
      body: React.PropTypes.string,
      rank: React.PropTypes.number
    };
  }

  constructor() {
    super();
    this.state = { isReplying: false };
  }

  onToggleReply() {
    this.setState({ isReplying: !this.state.isReplying });;
  }

  onCommentSubmitted(event) {
    this.setState({ isReplying: false });
  }

  onUpvote(event) {
    this.context.actions.upvoteComment(this.props);
  }

  render() {
    const replyText = this.state.isReplying ? 'Hide' : 'Reply';
    return React.createElement(
      'li',
      { className: 'comment row collapse' },
      React.createElement(
        'blockquote',
        null,
        this.props.body,
        React.createElement(
          'cite',
          null,
          'by: ',
          this.props.author,
          React.createElement(
            'span',
            { className: 'label secondary float-right' },
            this.props.rank || 0
          )
        )
      ),
      React.createElement(
        'button',
        { className: 'button tiny secondary', onClick: this.onToggleReply.bind(this) },
        ' ',
        replyText,
        ' '
      ),
      React.createElement(
        'button',
        { className: 'button tiny primary', onClick: this.onUpvote.bind(this) },
        ' +1 '
      ),
      React.createElement(__WEBPACK_IMPORTED_MODULE_0_components_comment_form__["a" /* default */], {
        parent_id: this.props.id,
        isReplying: this.state.isReplying,
        onCommentSubtitted: this.onCommentSubmitted.bind(this)
      }),
      React.createElement(__WEBPACK_IMPORTED_MODULE_1_components_comment_list__["a" /* default */], { parent_id: this.props.id })
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Comment);

/***/ }),
/* 11 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

module.exports.Dispatcher = __webpack_require__(14);


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Dispatcher
 * 
 * @preventMunge
 */



exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var invariant = __webpack_require__(12);

var _prefix = 'ID_';

/**
 * Dispatcher is used to broadcast payloads to registered callbacks. This is
 * different from generic pub-sub systems in two ways:
 *
 *   1) Callbacks are not subscribed to particular events. Every payload is
 *      dispatched to every registered callback.
 *   2) Callbacks can be deferred in whole or part until other callbacks have
 *      been executed.
 *
 * For example, consider this hypothetical flight destination form, which
 * selects a default city when a country is selected:
 *
 *   var flightDispatcher = new Dispatcher();
 *
 *   // Keeps track of which country is selected
 *   var CountryStore = {country: null};
 *
 *   // Keeps track of which city is selected
 *   var CityStore = {city: null};
 *
 *   // Keeps track of the base flight price of the selected city
 *   var FlightPriceStore = {price: null}
 *
 * When a user changes the selected city, we dispatch the payload:
 *
 *   flightDispatcher.dispatch({
 *     actionType: 'city-update',
 *     selectedCity: 'paris'
 *   });
 *
 * This payload is digested by `CityStore`:
 *
 *   flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'city-update') {
 *       CityStore.city = payload.selectedCity;
 *     }
 *   });
 *
 * When the user selects a country, we dispatch the payload:
 *
 *   flightDispatcher.dispatch({
 *     actionType: 'country-update',
 *     selectedCountry: 'australia'
 *   });
 *
 * This payload is digested by both stores:
 *
 *   CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'country-update') {
 *       CountryStore.country = payload.selectedCountry;
 *     }
 *   });
 *
 * When the callback to update `CountryStore` is registered, we save a reference
 * to the returned token. Using this token with `waitFor()`, we can guarantee
 * that `CountryStore` is updated before the callback that updates `CityStore`
 * needs to query its data.
 *
 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'country-update') {
 *       // `CountryStore.country` may not be updated.
 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
 *       // `CountryStore.country` is now guaranteed to be updated.
 *
 *       // Select the default city for the new country
 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
 *     }
 *   });
 *
 * The usage of `waitFor()` can be chained, for example:
 *
 *   FlightPriceStore.dispatchToken =
 *     flightDispatcher.register(function(payload) {
 *       switch (payload.actionType) {
 *         case 'country-update':
 *         case 'city-update':
 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
 *           FlightPriceStore.price =
 *             getFlightPriceStore(CountryStore.country, CityStore.city);
 *           break;
 *     }
 *   });
 *
 * The `country-update` payload will be guaranteed to invoke the stores'
 * registered callbacks in order: `CountryStore`, `CityStore`, then
 * `FlightPriceStore`.
 */

var Dispatcher = (function () {
  function Dispatcher() {
    _classCallCheck(this, Dispatcher);

    this._callbacks = {};
    this._isDispatching = false;
    this._isHandled = {};
    this._isPending = {};
    this._lastID = 1;
  }

  /**
   * Registers a callback to be invoked with every dispatched payload. Returns
   * a token that can be used with `waitFor()`.
   */

  Dispatcher.prototype.register = function register(callback) {
    var id = _prefix + this._lastID++;
    this._callbacks[id] = callback;
    return id;
  };

  /**
   * Removes a callback based on its token.
   */

  Dispatcher.prototype.unregister = function unregister(id) {
    !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.unregister(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
    delete this._callbacks[id];
  };

  /**
   * Waits for the callbacks specified to be invoked before continuing execution
   * of the current callback. This method should only be used by a callback in
   * response to a dispatched payload.
   */

  Dispatcher.prototype.waitFor = function waitFor(ids) {
    !this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Must be invoked while dispatching.') : invariant(false) : undefined;
    for (var ii = 0; ii < ids.length; ii++) {
      var id = ids[ii];
      if (this._isPending[id]) {
        !this._isHandled[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Circular dependency detected while ' + 'waiting for `%s`.', id) : invariant(false) : undefined;
        continue;
      }
      !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
      this._invokeCallback(id);
    }
  };

  /**
   * Dispatches a payload to all registered callbacks.
   */

  Dispatcher.prototype.dispatch = function dispatch(payload) {
    !!this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.') : invariant(false) : undefined;
    this._startDispatching(payload);
    try {
      for (var id in this._callbacks) {
        if (this._isPending[id]) {
          continue;
        }
        this._invokeCallback(id);
      }
    } finally {
      this._stopDispatching();
    }
  };

  /**
   * Is this Dispatcher currently dispatching.
   */

  Dispatcher.prototype.isDispatching = function isDispatching() {
    return this._isDispatching;
  };

  /**
   * Call the callback stored with the given id. Also do some internal
   * bookkeeping.
   *
   * @internal
   */

  Dispatcher.prototype._invokeCallback = function _invokeCallback(id) {
    this._isPending[id] = true;
    this._callbacks[id](this._pendingPayload);
    this._isHandled[id] = true;
  };

  /**
   * Set up bookkeeping needed when dispatching.
   *
   * @internal
   */

  Dispatcher.prototype._startDispatching = function _startDispatching(payload) {
    for (var id in this._callbacks) {
      this._isPending[id] = false;
      this._isHandled[id] = false;
    }
    this._pendingPayload = payload;
    this._isDispatching = true;
  };

  /**
   * Clear bookkeeping used for dispatching.
   *
   * @internal
   */

  Dispatcher.prototype._stopDispatching = function _stopDispatching() {
    delete this._pendingPayload;
    this._isDispatching = false;
  };

  return Dispatcher;
})();

module.exports = Dispatcher;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ })
/******/ ]);