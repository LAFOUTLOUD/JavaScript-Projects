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

	var Expense = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	}
	
	var Income = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	}
	
	var data = {
				   
		allItems: {	
			exp: [],
			inc: [],	   
	},
				   
		totals: {   
			exp: 0,
			inc: 0	   
		}
		   
	};
	
	return{
	
		// if someone calls this method, it creates a new INSTANCE based on either the Expense || Income OBJECT
		addItem: function(type, des, val) {
		
			ID = 0;

			if(type === 'exp') {
			
				// the method is what creates I. using the FC/P above
				var newItem = new Expense(ID, des, val);
				
			} else if (type === 'inc') {
			
				// the method is what creates an I. if the Income FC/P above
				var newItem = new Income(ID, des, val);
			
			}
			
			data.allItems[type].push(newItem);
			
			return addItem;
		
		}
	
	}
	
});

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
