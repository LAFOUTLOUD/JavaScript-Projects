// MOD 1
var UIController = (function() {

	// stores the code for the EL/H into an object to make them easier to change
	var DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn',
		incomeContainer: '.income__list',
		expensesContainer: '.expenses__list'
	}
	
	return{
			
		// getInput recieves the inputs from the input fields and assigns thier values to the UIController object
		getInput: function() {

			return {

				type: document.querySelector(DOMstrings.inputType).value,
				description: document.querySelector(DOMstrings.inputDescription).value,
				
				// we add the parseFloat() to change the text from a string to an integer
				value: parseFloat(document.querySelector(DOMstrings.inputValue).value) 

			}

		},
		
		addListItem: function(obj, type) {
			
			var html, newHtml, element;
			
			if(type === 'inc') {
			   
				element = DOMstrings.incomeContainer;

				html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
			   
			} else if(type === 'exp') {
			
				element = DOMstrings.expensesContainer;

				html = '<div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
			
			}
			
			newHtml = html.replace('%id%', obj.id);
			newHtml = newHtml.replace('%description%', obj.description);
			newHtml = newHtml.replace('%value%', obj.value);
			
			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
		},
		
		clearFields: function() {

			var fields, fieldsArr;
			
			fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

			fieldsArr = Array.prototype.slice.call(fields);

			fieldsArr.forEach(function(current, index, array) {

				current.value = "";
			
			});

			fieldsArr[0].focus();
		},

		getDOMstrings: function() {
				
			return DOMstrings;
				
		}
	
	};

})();

// MOD 2
var budgetController = (function() {

	// private section
	var Expense = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};
	
	var Income = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};
	
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

	// public section
	return{
	
		// if someone calls this method, it creates a new INSTANCE based on either the Expense || Income OBJECT
		addItem: function(type, des, val) {
		
			// declares the vars used by the method
			var newItem, ID;
		
			// we want the ID value to be = to the last ID value + 1
			// the value of ID is equal to the value in the allItems property of the data object
			// the value in that property is equal to 
			// the length of the value in the allItems property of the data object, minus 1
			
			// Create new ID
			if (data.allItems[type].length > 0) {
			
				// the value of the ID increases by 1 each time 
				ID = data.allItems[type][ data.allItems[type].length - 1 ].id + 1;
			
			} else {
			
				ID = 0;
			
			}

			// Create
			if (type === 'exp') { // '-' => exp
			
				// the method is what creates I. using the FC/P above
				newItem = new Expense(ID, des, val);
				
			} else if (type === 'inc') { // '+' = inc
			
				// the method is what creates an I. if the Income FC/P above
				newItem = new Income(ID, des, val);
			
			}
			
			// Pushes it into the above data structure
			data.allItems[type].push(newItem);
			
			// returns the new element
			return newItem;
		
		},
		
		testing: function() {
			console.log(data);
		}
		
	};
	
})();

// MOD 3
var globalController = (function(UICtrl, budgetCtrl) {
	
	// declares vars.
	var input;

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

	function updateBudget() {
	
		// 1. Calculate the budget
		
		// 2. Return the budget
		
		// 5. Display the budget on the UI
	
	};

	function ctrlAddItem() { // (4)
		
		var input, newItem;

		// 1. Get input values
		input = UICtrl.getInput();
		
		// we only want all of this code to work IF...
		// (a) the user doesnt leave the description input field empty => input.description !== ""
		// (b) if the input field for the value is NOT not a number (if the input is a number)
			// there is a fn. in JS that tests if a number is not a number: NaN()
			// the () is what makes it a fn.
			// !NaN => different than 'not a number'
			// if the data entered is not a number, the fn. will have a value of 'true'
		// isNan(input.value)
		// isNan => is not a number
		// !isNan => is not Not a number => it should NOT be NOT A NUMBER (double negative, it should be a number)
		// the input.description cannot be empty and the input.value MUST be a number
		// and the input.value is greater than 0
		if(input.description !== "" && !isNaN(input.value) && input.value > 0 ) {

		// 2. Add the new item to our data structure/budget controller
		newItem = budgetCtrl.addItem(input.type, input.description, input.value);
				   
		// 3. Add the new item to the UI
		UICtrl.addListItem(newItem, input.type);
				   
		// 4. Calculate budget
		UICtrl.clearFields();
				   
		// 5. Display the budget on the UI
		updateBudget();
		};
		
	}
			   
	return {
			   
		init: function() { // (2)
		
			console.log('Application has started.');
			setupEventListeners();

		}
			   
	}
	
})(UIController, budgetController);

globalController.init(); // (1)
