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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/eventToCalendar.js":
/*!********************************!*\
  !*** ./src/eventToCalendar.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EventToCalendar; });
class EventToCalendar {
    constructor(element, options) {
        this.element = element

        this.element.eventToCalendar = this
        this.mergeOptions(options)
        this.init()
    }

    mergeOptions(options) {
        let defaults = {
            providers: [],
            template: '',
            details: {}
        }

        Object.entries(defaults).forEach((item) => {
            this[item[0]] = typeof options[item[0]] === 'undefined'
                ? item[1]
                : options[item[0]]
        })
    }

    stringToHtml(htmlString) {
        let dummyTemplate = document.createElement('template')
        htmlString.trim()
        dummyTemplate.innerHTML = htmlString

        return dummyTemplate.content.firstElementChild
    }

    renderParent() {
        this.parentWrapper = this.stringToHtml(this.template)
        this.element.append(this.parentWrapper)
    }

    renderProvider(provider, index) {
        this.providers[index] = new provider(this.details)
        let providerTemplate = this.providers[index].render();

        if (typeof providerTemplate === 'string') {
            providerTemplate = this.stringToHtml(providerTemplate);
        }

        this.parentWrapper.append(providerTemplate);
    }

    renderProviders() {
        this.providers.forEach(this.renderProvider.bind(this))
    }

    init() {
        this.renderParent()
        this.renderProviders()
    }
}


/***/ }),

/***/ "./src/helpers.js":
/*!************************!*\
  !*** ./src/helpers.js ***!
  \************************/
/*! exports provided: queryString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queryString", function() { return queryString; });
function queryString(obj, prefix) {
  var str = [],
    p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p,
        v = obj[p];
      str.push((v !== null && typeof v === "object") ?
        queryString(v, k) :
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
}


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _eventToCalendar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventToCalendar */ "./src/eventToCalendar.js");
/* harmony import */ var _providers_google__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./providers/google */ "./src/providers/google.js");


let elem = document.querySelector('#parent')


let addToCalendar = new _eventToCalendar__WEBPACK_IMPORTED_MODULE_0__["default"](elem, {
    providers: [_providers_google__WEBPACK_IMPORTED_MODULE_1__["default"]],
    template: '<ul></ul>',
    details: {
        title: 'title',
        description: 'description',
        startDate: '2019-02-03',
        endDate: '2019-02-04',
        timezone: 'America/New_York',
        location: 'HERE',
        guests: [
            'guest6@here.ro',
            'guest5@here.ro',
            'guest4@here.ro'
        ]
    }
})



/***/ }),

/***/ "./src/providers/google.js":
/*!*********************************!*\
  !*** ./src/providers/google.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Google; });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ "./src/helpers.js");


class Google {
    constructor(eventDetails) {
        console.log('google')
        this.eventDetails = eventDetails
        console.log(this)

        this.baseUri = 'https://calendar.google.com/calendar/r/eventedit?text=Joe%27s+40th+Birthday&details=Joe+turns+40+just+this+once&dates=20111212T190000/20111212T200000&location=Gillette+Stadium&sf=true'
        this.baseUri = 'https://calendar.google.com/calendar/r/eventedit?'
    }

    get calendarUrl() {
        let params = {}

        if (typeof this.eventDetails.title !== 'undefined') {
            params.text = this.eventDetails.title
        }
        if (typeof this.eventDetails.location !== 'undefined') {
            params.location = this.eventDetails.location
        }

        if (typeof this.eventDetails.description !== 'undefined') {
            params.details = this.eventDetails.description
        }
        if (typeof this.eventDetails.timezone !== 'undefined') {
            params.ctz = this.eventDetails.timezone
        }
        if (typeof  this.eventDetails.startDate !== 'undefined') {
            params.dates = (new Date(this.eventDetails.startDate)).toISOString()
                .replace(/-|:|\.\d\d\d/g, '')
        }
        if (typeof this.eventDetails.endDate !== 'undefined') {
            params.dates += '/' + (new Date(this.eventDetails.endDate)).toISOString()
                .replace(/-|:|\.\d\d\d/g, '')
        }
        let guestsString = '';
        if (typeof this.eventDetails.guests !== 'undefined') {
             guestsString = '&';
            for (let guest in this.eventDetails.guests) {
                if (this.eventDetails.guests.hasOwnProperty(guest)) {

                    guestsString += 'add=' + this.eventDetails.guests[guest] + '&'
                }
            }
        }

        return (this.baseUri + Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["queryString"])(params) + guestsString)
    }

    render() {
        return `<li><a href="${this.calendarUrl}" target="_blank" rel="nofollow">Goggle</a></li>`
    }
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V2ZW50VG9DYWxlbmRhci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb3ZpZGVycy9nb29nbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQWU7QUFDZjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3ZEQTtBQUFBO0FBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2JBO0FBQUE7QUFBQTtBQUErQzs7QUFFL0M7QUFDdUM7O0FBRXZDLHdCQUF3Qix3REFBZTtBQUN2QyxnQkFBZ0IseURBQU07QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FDckJEO0FBQUE7QUFBQTtBQUFzQzs7QUFFdkI7QUFDZjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsK0JBQStCLDREQUFXO0FBQzFDOztBQUVBO0FBQ0EsK0JBQStCLGlCQUFpQjtBQUNoRDtBQUNBIiwiZmlsZSI6ImV2ZW50VG9DYWxlbmRhci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50VG9DYWxlbmRhciB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50XG5cbiAgICAgICAgdGhpcy5lbGVtZW50LmV2ZW50VG9DYWxlbmRhciA9IHRoaXNcbiAgICAgICAgdGhpcy5tZXJnZU9wdGlvbnMob3B0aW9ucylcbiAgICAgICAgdGhpcy5pbml0KClcbiAgICB9XG5cbiAgICBtZXJnZU9wdGlvbnMob3B0aW9ucykge1xuICAgICAgICBsZXQgZGVmYXVsdHMgPSB7XG4gICAgICAgICAgICBwcm92aWRlcnM6IFtdLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICcnLFxuICAgICAgICAgICAgZGV0YWlsczoge31cbiAgICAgICAgfVxuXG4gICAgICAgIE9iamVjdC5lbnRyaWVzKGRlZmF1bHRzKS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB0aGlzW2l0ZW1bMF1dID0gdHlwZW9mIG9wdGlvbnNbaXRlbVswXV0gPT09ICd1bmRlZmluZWQnXG4gICAgICAgICAgICAgICAgPyBpdGVtWzFdXG4gICAgICAgICAgICAgICAgOiBvcHRpb25zW2l0ZW1bMF1dXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc3RyaW5nVG9IdG1sKGh0bWxTdHJpbmcpIHtcbiAgICAgICAgbGV0IGR1bW15VGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpXG4gICAgICAgIGh0bWxTdHJpbmcudHJpbSgpXG4gICAgICAgIGR1bW15VGVtcGxhdGUuaW5uZXJIVE1MID0gaHRtbFN0cmluZ1xuXG4gICAgICAgIHJldHVybiBkdW1teVRlbXBsYXRlLmNvbnRlbnQuZmlyc3RFbGVtZW50Q2hpbGRcbiAgICB9XG5cbiAgICByZW5kZXJQYXJlbnQoKSB7XG4gICAgICAgIHRoaXMucGFyZW50V3JhcHBlciA9IHRoaXMuc3RyaW5nVG9IdG1sKHRoaXMudGVtcGxhdGUpXG4gICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmQodGhpcy5wYXJlbnRXcmFwcGVyKVxuICAgIH1cblxuICAgIHJlbmRlclByb3ZpZGVyKHByb3ZpZGVyLCBpbmRleCkge1xuICAgICAgICB0aGlzLnByb3ZpZGVyc1tpbmRleF0gPSBuZXcgcHJvdmlkZXIodGhpcy5kZXRhaWxzKVxuICAgICAgICBsZXQgcHJvdmlkZXJUZW1wbGF0ZSA9IHRoaXMucHJvdmlkZXJzW2luZGV4XS5yZW5kZXIoKTtcblxuICAgICAgICBpZiAodHlwZW9mIHByb3ZpZGVyVGVtcGxhdGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBwcm92aWRlclRlbXBsYXRlID0gdGhpcy5zdHJpbmdUb0h0bWwocHJvdmlkZXJUZW1wbGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnBhcmVudFdyYXBwZXIuYXBwZW5kKHByb3ZpZGVyVGVtcGxhdGUpO1xuICAgIH1cblxuICAgIHJlbmRlclByb3ZpZGVycygpIHtcbiAgICAgICAgdGhpcy5wcm92aWRlcnMuZm9yRWFjaCh0aGlzLnJlbmRlclByb3ZpZGVyLmJpbmQodGhpcykpXG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJQYXJlbnQoKVxuICAgICAgICB0aGlzLnJlbmRlclByb3ZpZGVycygpXG4gICAgfVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIHF1ZXJ5U3RyaW5nKG9iaiwgcHJlZml4KSB7XG4gIHZhciBzdHIgPSBbXSxcbiAgICBwO1xuICBmb3IgKHAgaW4gb2JqKSB7XG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwKSkge1xuICAgICAgdmFyIGsgPSBwcmVmaXggPyBwcmVmaXggKyBcIltcIiArIHAgKyBcIl1cIiA6IHAsXG4gICAgICAgIHYgPSBvYmpbcF07XG4gICAgICBzdHIucHVzaCgodiAhPT0gbnVsbCAmJiB0eXBlb2YgdiA9PT0gXCJvYmplY3RcIikgP1xuICAgICAgICBxdWVyeVN0cmluZyh2LCBrKSA6XG4gICAgICAgIGVuY29kZVVSSUNvbXBvbmVudChrKSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHYpKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0ci5qb2luKFwiJlwiKTtcbn1cbiIsImltcG9ydCBFdmVudFRvQ2FsZW5kYXIgZnJvbSAnLi9ldmVudFRvQ2FsZW5kYXInXG5cbmxldCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BhcmVudCcpXG5pbXBvcnQgZ29vZ2xlIGZyb20gJy4vcHJvdmlkZXJzL2dvb2dsZSdcblxubGV0IGFkZFRvQ2FsZW5kYXIgPSBuZXcgRXZlbnRUb0NhbGVuZGFyKGVsZW0sIHtcbiAgICBwcm92aWRlcnM6IFtnb29nbGVdLFxuICAgIHRlbXBsYXRlOiAnPHVsPjwvdWw+JyxcbiAgICBkZXRhaWxzOiB7XG4gICAgICAgIHRpdGxlOiAndGl0bGUnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ2Rlc2NyaXB0aW9uJyxcbiAgICAgICAgc3RhcnREYXRlOiAnMjAxOS0wMi0wMycsXG4gICAgICAgIGVuZERhdGU6ICcyMDE5LTAyLTA0JyxcbiAgICAgICAgdGltZXpvbmU6ICdBbWVyaWNhL05ld19Zb3JrJyxcbiAgICAgICAgbG9jYXRpb246ICdIRVJFJyxcbiAgICAgICAgZ3Vlc3RzOiBbXG4gICAgICAgICAgICAnZ3Vlc3Q2QGhlcmUucm8nLFxuICAgICAgICAgICAgJ2d1ZXN0NUBoZXJlLnJvJyxcbiAgICAgICAgICAgICdndWVzdDRAaGVyZS5ybydcbiAgICAgICAgXVxuICAgIH1cbn0pXG5cbiIsImltcG9ydCB7cXVlcnlTdHJpbmd9IGZyb20gJy4uL2hlbHBlcnMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdvb2dsZSB7XG4gICAgY29uc3RydWN0b3IoZXZlbnREZXRhaWxzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdnb29nbGUnKVxuICAgICAgICB0aGlzLmV2ZW50RGV0YWlscyA9IGV2ZW50RGV0YWlsc1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzKVxuXG4gICAgICAgIHRoaXMuYmFzZVVyaSA9ICdodHRwczovL2NhbGVuZGFyLmdvb2dsZS5jb20vY2FsZW5kYXIvci9ldmVudGVkaXQ/dGV4dD1Kb2UlMjdzKzQwdGgrQmlydGhkYXkmZGV0YWlscz1Kb2UrdHVybnMrNDAranVzdCt0aGlzK29uY2UmZGF0ZXM9MjAxMTEyMTJUMTkwMDAwLzIwMTExMjEyVDIwMDAwMCZsb2NhdGlvbj1HaWxsZXR0ZStTdGFkaXVtJnNmPXRydWUnXG4gICAgICAgIHRoaXMuYmFzZVVyaSA9ICdodHRwczovL2NhbGVuZGFyLmdvb2dsZS5jb20vY2FsZW5kYXIvci9ldmVudGVkaXQ/J1xuICAgIH1cblxuICAgIGdldCBjYWxlbmRhclVybCgpIHtcbiAgICAgICAgbGV0IHBhcmFtcyA9IHt9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmV2ZW50RGV0YWlscy50aXRsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHBhcmFtcy50ZXh0ID0gdGhpcy5ldmVudERldGFpbHMudGl0bGVcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuZXZlbnREZXRhaWxzLmxvY2F0aW9uICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcGFyYW1zLmxvY2F0aW9uID0gdGhpcy5ldmVudERldGFpbHMubG9jYXRpb25cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5ldmVudERldGFpbHMuZGVzY3JpcHRpb24gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBwYXJhbXMuZGV0YWlscyA9IHRoaXMuZXZlbnREZXRhaWxzLmRlc2NyaXB0aW9uXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmV2ZW50RGV0YWlscy50aW1lem9uZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHBhcmFtcy5jdHogPSB0aGlzLmV2ZW50RGV0YWlscy50aW1lem9uZVxuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgIHRoaXMuZXZlbnREZXRhaWxzLnN0YXJ0RGF0ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHBhcmFtcy5kYXRlcyA9IChuZXcgRGF0ZSh0aGlzLmV2ZW50RGV0YWlscy5zdGFydERhdGUpKS50b0lTT1N0cmluZygpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoLy18OnxcXC5cXGRcXGRcXGQvZywgJycpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmV2ZW50RGV0YWlscy5lbmREYXRlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcGFyYW1zLmRhdGVzICs9ICcvJyArIChuZXcgRGF0ZSh0aGlzLmV2ZW50RGV0YWlscy5lbmREYXRlKSkudG9JU09TdHJpbmcoKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8tfDp8XFwuXFxkXFxkXFxkL2csICcnKVxuICAgICAgICB9XG4gICAgICAgIGxldCBndWVzdHNTdHJpbmcgPSAnJztcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmV2ZW50RGV0YWlscy5ndWVzdHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgZ3Vlc3RzU3RyaW5nID0gJyYnO1xuICAgICAgICAgICAgZm9yIChsZXQgZ3Vlc3QgaW4gdGhpcy5ldmVudERldGFpbHMuZ3Vlc3RzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZXZlbnREZXRhaWxzLmd1ZXN0cy5oYXNPd25Qcm9wZXJ0eShndWVzdCkpIHtcblxuICAgICAgICAgICAgICAgICAgICBndWVzdHNTdHJpbmcgKz0gJ2FkZD0nICsgdGhpcy5ldmVudERldGFpbHMuZ3Vlc3RzW2d1ZXN0XSArICcmJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAodGhpcy5iYXNlVXJpICsgcXVlcnlTdHJpbmcocGFyYW1zKSArIGd1ZXN0c1N0cmluZylcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiBgPGxpPjxhIGhyZWY9XCIke3RoaXMuY2FsZW5kYXJVcmx9XCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9mb2xsb3dcIj5Hb2dnbGU8L2E+PC9saT5gXG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==