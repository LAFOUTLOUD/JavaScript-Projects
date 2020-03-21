// MOD 1
var UIController = (function() {

	// stores the code for the EL/H to make them easier to change
	var DOMstrings = {
		
		// used by the querySelectors in the getInput method
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		
		
		inputBtn: '.add__btn',
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

// MOD 2
var budgetController = (function() {

	// FC/P for the Expense
	var Expense = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};
	
	// FC/P for the Income
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
	
		// if someone calls this method, it creates a new INSTANCE based on either the Expense || Income OBJECT
		addItem: function(type, des, val) {
		
			// declares the vars used by the method
			var newItem, ID;
			
			// IF...
			// the value of the full length...
			// of the array of the current type value...
			// of the allItems property...
			// of the data object...
			// is greater than 0...
			if (data.allItems[type].length > 0) {
			
				// the value of the ID var, is equal to...
				// the value of the ID increases by 1 each time 
				ID = data.allItems[type][ data.allItems[type].length - 1 ].id + 1;
			
			} else {
			
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
			
			// Pushes it into the above data structure
			data.allItems[type].push(newItem);
			
			// returns the new element
			return newItem;
		
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

// MOD 3
var globalController = (function(UICtrl, budgetCtrl) {
	
	// declares vars.
	var input;

	// makes all of the EL/H functional
	function setupEventListeners() { // (3)
		
		// pulls the DOMstrings object into the globalController
		var DOM = UICtrl.getDOMstrings();
	
		document.querySelector(DOM.inputBtn).addEventListener('click', function() {

			ctrlAddItem();
	
		});

		document.querySelector(DOM.inputBtn).addEventListener('keypress', function(e) {
			
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

	function ctrlAddItem() { // (4)
		
		var input, newItem;

		// 1. Get input values
		input = UICtrl.getInput();
		
		/* we only want all of this code to work IF...
			(a) the value of input.description is !== than empty
			(b) the value of input.value is !isNaN
			(c) the value of input.value is greater than 0 */
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
		
	};
	
	function ctrlDeleteItem(event) {
		var itemID, splitID, type, ID;
	
		// retrieves an id value from the DOM and stores it into the itemID var
		// we read the TE, where the event is fired, we traversed the DOM up to the element we are interested in, and stored it into a var
		itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
		
		if (itemID) {
			
			// inc-1
			splitID = itemID.split('-'); // we isolated each part of the HTML using the split method
			type = splitID[0];
			ID = splitID[1];
			
			// 1. delete the item from the data structure
			
			// 2. Delete the item from the UI
			
			// 3. Update and show the new budget
		}
	
	};
	
	return {
		
		// calls everything when the application loads
		init: function() { // (2)
		
			console.log('Application has started.'); // (2-1)
			UICtrl.display({ budget: 0, totalInc: 0, totalExp: 0, percentage: -1  }); // (2-2)
			setupEventListeners(); // (2-3)

		}
			   
	}
	
})(UIController, budgetController);

globalController.init(); // (1)
