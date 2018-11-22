'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mousedown = mousedown;
exports.mouseup = mouseup;
exports.mousemove = mousemove;
exports.setDraggerOffset = setDraggerOffset;

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _data = {
  down: false,
  height: 0,
  width: 0,
  initialX: 0,
  initialY: 0,
  constraintToWindow: false,
  cursorPreviousX: 0,
  cursorPreviousY: 0,
  draggerOffsetLeft: 0,
  draggerOffsetTop: 0,
  draggableEl: null,
};

function mousedown(e, el, _data) {

  // set the width each click
  // just in case it changed since last time (by external plugin, for example)
  _data.width = el.offsetWidth;
  _data.height = el.offsetHeight;
  _data.down = true;
  _data.initialX = e.clientX;
  _data.initialY = e.clientY;
  el.classList.add('dragging');

}

function mouseup(e, el, _data) {
  _data.down = false;
  setDraggerOffset(el, _data);
  el.classList.remove('dragging');
}

function mouseout (e, el, _data) {
  _data.down = false;
  setDraggerOffset(el, _data);
  el.classList.remove('dragging');
}

function mousemove(e, el, _data) {
  if (_data.down) {

    var backgroundLeftPos = _data.draggerOffsetLeft - (e.clientX - _data.initialX) / _data.width * 100;
    var backgroundTopPos = _data.draggerOffsetTop - (e.clientY - _data.initialY) / _data.height * 100;
    var backgroundLeft, backgroundTop;

    if (backgroundLeftPos <= 0) {
      backgroundLeft = '0%'
    } else if (backgroundLeftPos >= 100) {
      backgroundLeft = '100%'
    } else {
      backgroundLeft = backgroundLeftPos + '%'
    } if (backgroundTopPos <= 0) {
      backgroundTop = '0%'
    } else if(backgroundTopPos >= 100) {
      backgroundTop = '100%'
    } else {
      backgroundTop = backgroundTopPos + '%'
    }

    el.style.backgroundPosition = backgroundLeft + ' ' + backgroundTop;
  }
  _data.cursorPreviousX = e.clientX;
  _data.cursorPreviousY = e.clientY;
}

function setDraggerOffset(el, _data) {
  _data.draggerOffsetLeft = parseFloat(el.style.backgroundPosition.trim().split(/\s+/)[0]) || 50;
  _data.draggerOffsetTop = parseFloat(el.style.backgroundPosition.trim().split(/\s+/)[1]) || 50;
}

exports.default = _vue2.default.directive('drag', {
  inserted: function inserted(el, binding, vnode) {
    _data.draggableElementId = binding.arg || null;
    _data.constraintToWindow = binding.modifiers['window-only'];
    el.addEventListener('mouseup', function (e) {
      return mouseup(e, el, _data);
    });
    el.addEventListener('mousedown', function (e) {
      return mousedown(e, el, _data);
    });
    el.addEventListener('mousemove', function (e) {
      return mousemove(e, el, _data);
    });
    el.addEventListener('mouseout', function (e) {
      return mouseout(e, el, _data);
    });
    setDraggerOffset(el, _data);
  }
});