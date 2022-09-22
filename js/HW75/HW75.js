window.app = window.app || {};
window.app.pcsTools = (function () {
  'use strict';

  function get(selector) {
    return document.querySelector(selector);
  }

  function setCss(elem, property, value) {
    elem.style[property] = value;
  }

  function getCss(elem, property) {
    return elem.style[property];
  }

  function addEventListener(elem, type, callback) {
    elem.addEventListener(type, callback);
  }
  //set up a way to get random colors
  function getRandomColor() {
    function getRandomColorPart() {
      return Math.floor(Math.random() * 256);
    }
    const r = getRandomColorPart();
    const g = getRandomColorPart();
    const b = getRandomColorPart();

    return `rgb(${r},${g},${b})`;
  }
  

  return {
    wrap: function (selector) {
      const elem = get(selector);
      return {
        css: function (property, value) {
          if (arguments.length === 2) {
            setCss(elem, property, value);
            return this;
          } else {
            return getCss(elem, property);
          }
        },
        click: function(callback)  {
          addEventListener(elem, 'click', callback);
          return this;
        },
        hide: function() {
          setCss(elem, 'display', 'none');
          return this;
        },
        show: function(displayValue = 'block') {
          setCss(elem, 'display', displayValue);
          return this;
        },
        //function - has a function that has a set interval that passes in the paramaters
        flash: function(duration,speed) {
          const originalColor = getCss(elem,'color');
          const theInterval = setInterval(() => {
            setCss(elem,'color',getRandomColor());
          }, speed);

          setTimeout(() => clearInterval(theInterval), duration);
          this.css('color',originalColor);
          //return change color
          return this;
        }
        
      };
    }
  };
})();