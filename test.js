// 1. - Найдите и перечислите проблемы в этом коде на Javascript и варианты их решения:
// Общее решение - https://jsfiddle.net/Lzcpk25j/

val = 1; // var varName = 1, но лучше использовать let или const, что-бы предотвратить засорение глобального объекта
// assign numbers to each button
var buttons = document.getElementsByTagName("button");
for (var i = 0; i < buttons.length; i++) { // лучше не использовать объявление переенной с ключевым словом var
  buttons[i].addEventListener("click", function() {
    // each button should have its value.
    alert("You pressed button " + i); // к моменту вызова анонимной функции при события клик, i будет уже равно buttons.length.
  });
}

try {
   const res = await askBackend(); // await работает только внутри async–функций
   if (res.status = ‘Success’) // = нужен оператор сравнения а не присвоения, а также не корректные скобки
     buttons[1].innerHtml = res.text; // корректно innerHTML, но так как это кнопка то лучше использовать textContent
}
catch (err) { // ошибка в const res = await askBackend(); здесь не словится
  alert(‘Something went wrong: ‘ + err + ‘backend response: ’ + res); // res - находиться в другой области видимости, не коретная строка
}


// 2. - Выполнится ли программа ниже? Если да, то как будет выглядеть массив `arr`?
var arr = [1, 1]; // объевляем массив [1, 1]
arr[2] = 1; // добавляем в масив по индексу 2 знаяение три 1
console.log(arr[6] = undefined); // добавляем в массив по индексу 6 знаяение три undefined, создаются ячейки массива с индекса 2 до 6

// Программа выполнится, так как в ней нет ошибок хоть и строчка №3 не имеет смысла, но она валидна. Массив arr будет иметь вид: [1, 1, 1, undefined, undefined, undefined, undefined]


// 3. - Что выведет в консоль код ниже? Используя средства ES6, как добиться предполагаемого результата?
// Решение на ES6 https://jsfiddle.net/mozt36n7/1/
function f() {
  this.a = 1;
  return function () {
    console.log(this.a);
  };
}
(new f)();
// в консоле будет undefined, так как данная запись будет интерпретирована как вызов функции с window в качестве this.


// 4. - Please write a function wrapper slow_guard(timeout, fn) that logs a warning if
// the function takes too long to complete. Here is a typical example of how your wrapper can be used:
// Array.prototype.sort = slow_guard(1000, Array.prototype.sort);
// After this, if sorting an array ever takes longer than one second, a warning
// should appear on the developer console. We expect a short solution about 5-10 lines of code.

function slow_guard(timeout, fn) {
  const t0 = performance.now();
 	return function() {
    const result = fn.call(this);
    if (((performance.now() - t0).toFixed(3) * 1000) > timeout) {
    	console.log('WARNING: sort method too long');
    }
		return result;
  };
}

// Демо: https://jsfiddle.net/h985spjo/4/

// REACT
// 1. - Code simple (named Simple) React component (preferably on ES6) that consists of two parts: 
// div that has caption "This is " followed by a text, contained in property name
// Button, which initial text is ON and it switches back and forth with OFF when user clicks button.
// A component should be rendered into element with id smq-container and property name should be set to SIMDAQ.

// Решение - https://jsfiddle.net/Lmy8jhxc/


// 2. -Imagine that you are designing a new huge website with React. How would you implement localization? Give simple snippets for a button and a list element (of your choice). A list contains languages (ENG, RUS, CH, JAP), button confirms the selection and changes its language. Language is saved after reload, default - ENG.
import React, { Component } from 'react';
import LocalizedStrings from 'react-localization';

const local = {
  ENG: {apply:'To apply'},
  RUS: {apply:'Применить'},
  CH: {apply:'申请'},
  JAP: {apply:'適用する'}
};

let strings = new LocalizedStrings(local);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'ENG'
    }
    this.selectRef = React.createRef();
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
  }

  componentDidMount() {
  	const DEFAULT_LANGUAGE = 'ENG';
  	let usedlanguage;
  	if (!localStorage.getItem('language')) {
  		localStorage.setItem('language', DEFAULT_LANGUAGE);
  		usedlanguage = DEFAULT_LANGUAGE;
  	} else {
  		usedlanguage = localStorage.getItem('language');
  	}
  	this.setState({language: usedlanguage});
  }

  componentDidUpdate() {
	  localStorage.setItem('language', this.state.language);
	}

  handleLanguageChange() {
    const lang = this.selectRef.current.value || this.state.language;
    this.setState({language: lang});
  }

  createOptions() {
  	let optionsLang = [];
    Object.keys(local).forEach(item => {
			const lang = <option key={item} value={item}>{local[item].apply}</option>
			optionsLang = [...optionsLang, lang];
		});
		return optionsLang;
  }

  render() {
  	strings.setLanguage(this.state.language);
    return (
      <React.Fragment>
      	<select ref={this.selectRef} size={Object.keys(local).length}>
      		{this.createOptions()}
        </select>
        <button onClick={this.handleLanguageChange}>{strings.apply}</button>
      </React.Fragment>
    )
  }
}

export default App;

// Демо - https://colorkid.github.io/localization/


// 3. - Assume that you are working on a relatively big project. It is React SPA with a lot of dialogs. You were asked to add Google Analytics on pages and track different actions. What questions would you ask? 
// Попрошу в письменной форме подробно какие действия страницы и условия нужно отслеживать и по каким условиям.
