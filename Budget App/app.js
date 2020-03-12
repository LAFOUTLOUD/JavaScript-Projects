var globalController = ( function() {
		
	// fn. to hold the code called by the EL/H
	function ctrlAddItem() {
			
		// 1. Get input values
				   
		// 2. Add the new item to our data structure/budget controller
				   
		// 3. Add the new item to the UI
				   
		// 4. Calculate budget
				   
		// 5. Display the budget on the UI
		
		console.log('Hello World')
			
	}
		   
	// first EL/H
	document.querySelector('.add__btn').addEventListener('click', function() {
	
		// calls the fn.
		ctrlAddItem();
	
	})
			
	// second EL/H
	document.querySelector('.add__btn').addEventListener('keypress', function(e) {
			
		if(e.keyCode === 13) { 
					
			// calls the fn.
			ctrlAddItem();

		}
			
	})
			   
	return{
			   
		// public code
			   
	}
		   
})();
