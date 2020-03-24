/*************************************************************************************/
// MOD 1

var UIController = (function() {

	// stores the code for the EL/H to make them easier to change
	var DOMstrings = {
		
		// used by the querySelectors in the getInput method of the UIController MOD
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		
		// used by the querySelectors in the setupEventListener fn
		inputBtn: '.add__btn',
		
		// ?
		incomeContainer: '.income__list',
		expensesContainer: '.expenses__list',
		
		// used for the querySelectors in the display method
		budgetLabel: '.budget__value',
		incomeLabel: '.budget__income--value',
		expensesLabel: '.budget__expenses--value',
		percentageLabel: '.budget__expenses--percentage',
		
		// used for the querySelector in the setupEventListener fn.
		container: '.container'
	}
	
	return{
			
		// getInput recieves the inputs from the input fields and assigns thier values to the UIController object
		getInput: function() { // (5)

			return {

				type: document.querySelector(DOMstrings.inputType).value,
				description: document.querySelector(DOMstrings.inputDescription).value,
				
				// we add the parseFloat() to change the text from a string to an integer
				value: parseFloat(document.querySelector(DOMstrings.inputValue).value) 

			}

		},
		
		addListItem: function(obj, type) { // (6)
			
			var html, newHtml, element;
			
			if(type === 'inc') {
			   
				element = DOMstrings.incomeContainer;

				html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
			   
			} else if(type === 'exp') {
			
				element = DOMstrings.expensesContainer;

				html = '<div class="item clearfix" id="exp-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
			
			}
			
			newHtml = html.replace('%id%', obj.id);
			newHtml = newHtml.replace('%description%', obj.description);
			newHtml = newHtml.replace('%value%', obj.value);
			
			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
		},
		
		deleteListItem: function() {
		
			// in JS, we cannot dlete an element, we must delete a child
			// its a good idea to save the selected element first
			var el = document.getElementById(selectorID);
			document.getElementById(selectorID).parentNode.removeChild(el);
		
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
		
		// this method changes the numbers displayed to the UI
		display: function(obj) {
		
			document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
			document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
			document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;
			
			// adds a % to any percentage greater than 0 // any amount less than 0 removes the %
			if(obj.percentage > 0) {
			   
			   document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
			   
			} else {
			
				document.querySelector(DOMstrings.percentageLabel).textContent = '---';
			
			}
		
		},

		// makes the DOMstrings object PUBLIC 
		getDOMstrings: function() {
				
			return DOMstrings;
				
		}
	
	};

})();

/************************************************************************************/
// MOD 2

var budgetController = (function() {

	// FC/P for creating Expense objects
	var Expense = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};
	
	// FC/P for creating Income objects
	var Income = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};
	
	// determines whether we calculate the total expenses or the total incomes
	function calculateTotal(type) {
	
		// creates a container for the sum.
		// the sum starts at 0
		var sum = 0;
		
		// loops through the arrays in the allItem object using the forEach() fn.
		// cur = the current element of the array used for 'type', income or expense
		// cur starts at 0, allItems[income] => [200, 400, 100]
		// sum = 0
		// sum = 0 + 200 => sum = 200
		// sum = 200 + 400
		// sum = 600 + 100, sum = 700
		// sum += cur.value => sum = sum + cur.value;
		// instead of returning the output, we want to store it somewhere
		data.allItems[type].forEach( function(cur) {
			sum += cur.value;
		});

		// takes the value from the sum var and adds it to the array of the totals object w/ a matching type
		data.totals[type] = sum;
	
	};
	
	// global data structure. stores the data.
	var data = {
				   
		allItems: {	
			exp: [],
			inc: [],	   
		},

		totals: {   
			exp: 0,
			inc: 0	   
		},
		
		// stores the value of the budget recieved from the calculateBudget fn.
		// the budget is = to the total value of the inc - the total value of the exp
		budget: 0,
		
		// -1 is used to represent a non-existent value
		percentage: -1
		   
	};

	return{

		// when the 'addItem' method is called...
		// it creates a new INSTANCE, based on either the Expense || Income FC/P
		// paras passed into the method call, are also passed into the new INSTANCE, and become its properties
		addItem: function(type, des, val) {
		
			// declares the vars used by the method
			// we declare newItem using var grouping because, the value of newItem changes, and this syntax looks cleaner
			var newItem, ID;
			
			// determines the value of the ID var
				// IF, the value of the full length of the current type array is greater than 0...
			if (data.allItems[type].length > 0) {
				
				// simplified
				// (1) the value of the 'ID' var is equal to...
				// (2) the id value, + 1, of...
				// (3) the array => data.allItems[type]
					// the value of the current 'type' array, of the allItems property, of the data object)
					// type is a para of the 'addItem' method
					// the value of the 'type' para will be either inc || exp
				// (4) at the position w/ the value equal to => data.allItems[type].length - 1
					// the full length of the current 'type' array of the allItems property of the data object, minus 1
				
				// the value of the ID var, becomes equal to the value of the id property + 1 of, the position, of the current type array
				ID = data.allItems[type][ data.allItems[type].length - 1 ].id + 1;
			
			// ELSE...
			} else {
			
				// the value of the ID var is 0
				ID = 0;
			
			}

			// IF the type para is 'exp'
			if (type === 'exp') { // '-' => exp
			
				// creates I. using the Expense FC/P
				newItem = new Expense(ID, des, val);
			
			// ELSE IF the type para is 'inc'
			} else if (type === 'inc') { // '+' = inc
			
				// creates I. using the Income FC/P
				newItem = new Income(ID, des, val);
			
			}
			
			// the .push() method pushes the newItem object, produced by the 'addItem' method, into the data object data structure
			data.allItems[type].push(newItem);
			
			// the newItem object is returned from the method
			return newItem;
		
		},
		
		// deletes an item
		deleteItem: function(type, id) {
			
			var ids, index;
		
			// id = 3
			data.allItems[type][id];
			
			// how do we select a specific id? // we need to create an array
			// .map loops through an array, but unlike .forEach, map returns an array
			ids = data.allItems[type].map( function(current) {
			
				return current.id;
			
			});
			
			// the .indexOf() returns the index # of the element of the current array
			// array = [1 2 4 6 8]
			// array.indexOf(id) => id = 6
			// index becomes 3
			// next we want to delete the item w/ the specific index from the array
			index = ids.indexOf(id);
			
			// we still use -1 to denote a non-existent value
			// we use splice to remove an element
			// only gets executed when the item is actually in the array, aka when it is not -1
			if (index !== -1) {
			
				// removes that specific item from the array
				data.allItems[type].splice(index, 1)
			
			}
			
		},
		
		calculateBudget: function() {
			
			// calculate total income and expenses
			calculateTotal('exp');
			calculateTotal('inc');
			
			// calculate the budget: income - expenses
			data.budget = data.totals.inc - data.totals.exp;
			
			// calculate the percentage of income that we spent
			// Math.round => rounds the final value of the percentage to an integer // Math.floor would produce a whole number
			// prevents you from dividing by 0
			if (data.totals.inc > 0) {

				data.percentage = Math.round( (data.totals.exp / data.totals.inc) * 100);

			} else { 

				// -1 is the indicator for 'non-existence'
				data.percentage = -1;

			}
		},
		
		getBudget: function() {
		
			// the best way to return multiple values at once is by putting them into an object
			return{
			
				budget: data.budget,
				totalInc: data.totals.inc,
				totalExp: data.totals.exp,
				percentage: data.percentage
			
			};
		
		},
		
		testing: function() {
			console.log(data);
		}
		
	};
	
})();

/************************************************************************************/
// MOD 3 - Controls the application by pulling data from MOD 1 and 2

var globalController = (function(UICtrl, budgetCtrl) {
	
	// declares vars used by the MOD
	var DOM, input;

	// makes all of the EL/H functional // (3)
	function setupEventListeners() {
		
		// adds the DOMstrings object FROM the UIController TO the globalController
		DOM = UICtrl.getDOMstrings();
	
		// makes the button activate when you click it
		document.querySelector(DOM.inputBtn).addEventListener('click', function() {

			ctrlAddItem();
	
		});

		// makes the button ALSO activate when the enter key is pressed
		document.querySelector(DOM.inputBtn).addEventListener('keypress', function(e) {
			
			// if the keyCode property of the EVENT ARGUMENT (e) has a value of 13 (the enter key)...
			if(e.keyCode === 13) { 

				ctrlAddItem();

			}
	
		});
		
		// this EL/H selects the container holding the delete button for the items on the UI
		// instead of adding an EL/H to ALL the elements that make up the button, we add it to the container and let it bubble up through EB
		document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
		
	};

	function updateBudget() {
	
		// 1. Calculate the budget
		budgetCtrl.calculateBudget();
		
		// 2. Return the budget
		var budget = budgetCtrl.getBudget();
		
		// 3. Display the budget on the UI
		UICtrl.display(budget);
		
	};
	
	function updatePercentages() {
	
		// 1. calculate the percentages
		
		// 2. read percentages from the budget controller
		
		// 3. update the UI with the new percentages
	
	};

	// the fn that is called when the EL/H are triggered // (4)
	function ctrlAddItem() {
		
		// declares vars used by the fn
		var input, newItem;

		// 1. Get input values
		input = UICtrl.getInput();
		
		// we only want all of this code to work IF...
			// (a) the value of input.description is !== than empty
			// (b) the value of input.value is !isNaN
			// (c) the value of input.value is greater than 0
		if(input.description !== "" && !isNaN(input.value) && input.value > 0 ) {

			// 2. Add the new item to our data structure/budget controller
			newItem = budgetCtrl.addItem(input.type, input.description, input.value);
				   
			// 3. Add the new item to the UI
			UICtrl.addListItem(newItem, input.type);
				   
			// 4. Calculate budget
			UICtrl.clearFields();
				   
			// 5. Display the budget on the UI
			updateBudget();
			
			// 6. calculate and update the percentages
			updatePercentages();
		};
		
	};
	
	function ctrlDeleteItem(event) {
		var itemID, splitID, type, ID;
	
		// retrieves an id value from the DOM and stores it into the itemID var
		// we read the TE, where the event is fired, we traversed the DOM up to the element we are interested in, and stored it into a var
		itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
		
		if (itemID) {
			
			// inc-1
			// we isolated each part of the HTML using the split method
			splitID = itemID.split('-');
			type = splitID[0];
			ID = parseInt(splitID[1]);
			
			// 1. delete the item from the data structure
			budgetCtrl.deleteItem(type, ID);
			
			// 2. Delete the item from the UI
			UICtrl.deleteListItem(itemID);
			
			// 3. Update and show the new budget
			updateBudget();
		}
	
	};
	
	return {
		
		// calls everything when the application loads // (2)
		init: function() {
		
			console.log('Application has started.'); // (2-1)
			UICtrl.display({ budget: 0, totalInc: 0, totalExp: 0, percentage: -1  }); // (2-2)
			setupEventListeners(); // (2-3)

		}
			   
	};

// connects the 3rd MOD to the other MODS
})(UIController, budgetController);

// calls the init fn from the globalController MOD // (1)
globalController.init();
