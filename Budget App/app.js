// MODULE 1
var UIController = (function() {

	var DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn'
	}
	
	return{
			
		getInput: function() {

			return {

				type: document.querySelector(DOMstrings.inputType).value,
				description: document.querySelector(DOMstrings.inputDescription).value,
				value: document.querySelector(DOMstrings.inputValue).value

			}

		},

		getDOMstrings: function() {
				
			return DOMstrings;
				
		}
	
	};

})();

// MODULE 2
var budgetController = (function() {

	var expense = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	}
	
	var income = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	}
	
})

var expense = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	}

// MODULE 3
var globalController = ( function(UICtrl) {
	
	function setupEventListeners() { // (3)
		
		var DOM = UICtrl.getDOMstrings();
	
		document.querySelector(DOM.inputBtn).addEventListener('click', function() {

			ctrlAddItem();
	
		});

		document.querySelector(DOM.inputBtn).addEventListener('keypress', function(e) {
			
			if(e.keyCode === 13) { 

				ctrlAddItem();

			}
	
		});
		
	};

	function ctrlAddItem() {
			
		// 1. Get input values
		var input = UICtrl.getInput();
		console.log(input);
				   
		// 2. Add the new item to our data structure/budget controller
				   
		// 3. Add the new item to the UI
				   
		// 4. Calculate budget
				   
		// 5. Display the budget on the UI
			
	}
			   
	return {
			   
		init: function() { // (2)
		
			console.log('Application has started.');
			setupEventListeners();
		
		}
			   
	}
	
})(UIController);

globalController.init(); // (1)
