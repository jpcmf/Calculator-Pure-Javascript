;(function() {
  'use strict';

  var $visor = document.querySelector('[data-js="visor"]');
  var $buttonsNumbers = document.querySelectorAll('[data-js="button-number"]');
  var $buttonsOperations = document.querySelectorAll('[data-js="button-operation"]');
  var $buttonCE = document.querySelector('[data-js="button-ce"]');
  var $buttonEqual = document.querySelector('[data-js="button-equal"]');

  function initialize() {
    initEvents();
  }

  function initEvents() {
    Array.prototype.forEach.call($buttonsNumbers, function(button) {
      button.addEventListener('click', handleClickNumber, false);
    });
    Array.prototype.forEach.call($buttonsOperations, function(button) {
      button.addEventListener('click', handleClickOperation, false);
    });
    $buttonCE.addEventListener('click', handleClickCE, false);
    $buttonEqual.addEventListener('click', handleClickEqual, false);
  }

  function handleClickNumber(e) {
    $visor.value = $visor.value === '0' ? e.target.value : $visor.value + e.target.value;
  }

  function handleClickOperation(e) {
    $visor.value = removeLastItemIfItIsAnOperator($visor.value);
    $visor.value += e.target.value;
  }

  function handleClickCE() {
    $visor.value = 0;
  }

  function isLastItemAnOperation(number) {
    var operations = getOperations();
    var lastItem = number.split('').pop();
    return operations.some(function(operator) {
      return operator === lastItem;
    });
  }

  function getOperations() {
    return Array.prototype.map.call($buttonsOperations, function(button) {
      return button.value;
    });
  }

  function removeLastItemIfItIsAnOperator(string) {
    if(isLastItemAnOperation(string)) {
      return string.slice(0, -1);
    }
    return string;
  }

  function handleClickEqual() {
    $visor.value = removeLastItemIfItIsAnOperator($visor.value);
    // var allValues = $visor.value.match(/\d+[+x÷-]?/g);
    var allValues = $visor.value.match(getRegexOperations());
    $visor.value = allValues.reduce(calculateAllValues);
  }

  function getRegexOperations() {
    return new RegExp('\\d+[' + getOperations().join('\\') + ']?', 'g');
  }

  function calculateAllValues(accumulated, actual) {
    var firstValue = accumulated.slice(0, -1);
    var operator = accumulated.split('').pop();
    var lastValue = removeLastItemIfItIsAnOperator(actual);
    var lastOperator = getLastOperator(actual);
    // if(operator === 'x' || operator === '÷') {
    //   alert('ok');
    //   return calculatorOperations(operator, firstValue, lastValue) + lastOperator;
    // }
    // if(operator === 'x' || operator === '÷') {
    //   alert('ok');
    //   return calculatorOperations(operator, firstValue, lastValue) + lastOperator;
    // }
    return calculatorOperations(operator, firstValue, lastValue) + lastOperator;
  }

  function getLastOperator(value) {
    return isLastItemAnOperation(value) ? value.split('').pop() : '';
  }

  function calculatorOperations(operator, firstValue, lastValue) {
    switch(operator) {
      case '+':
      return Number(firstValue) + Number(lastValue);
      case 'x':
      return Number(firstValue) * Number(lastValue);
      case '÷':
      return Number(firstValue) / Number(lastValue);
      case '-':
      return Number(firstValue) - Number(lastValue);
    }
  }

  initialize();

})();
