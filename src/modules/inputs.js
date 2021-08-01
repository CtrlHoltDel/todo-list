import { format, isBefore } from 'date-fns'

const Inputs = (function () {
	//Inputs
	const projectInput = document.querySelector("[data-project-input]");
	const titleInput = document.getElementById("titleInput");
	const dateInput = document.getElementById("dateInput");
	const noteInput = document.getElementById("noteInput");

	//Buttons
	const projectSubmitButton = document.querySelector(".projectSubmit");
	const inputSubmitButton = document.querySelector(".taskSubmit");
	const allTasksButton = document.getElementById("loadAllTasks")
	const thisWeekButton = document.getElementById("loadThisWeek")
	const thisMonthButton = document.getElementById("loadThisMonth")

	//Misc elements
	const tasksDiv = document.getElementById("tasks");
	const projectsDiv = document.getElementById("projects");

	// -- Projects -- //

	const projectSubmit = function (passthrough) {
		projectSubmitButton.addEventListener("click", function (e) {
			e.preventDefault();
			passthrough(e);
		});
	};

	const getProjectInput = function () { 

		if(projectInput.value === ""){
			console.log("no input")
		return null
		} else {
			let projReturn = projectInput.value
			projectInput.value = ""
			return projReturn
		}

  	};

	const projectSelect = function (passthrough) {
		projectsDiv.addEventListener("click", function (e) {
			if(e.target.classList.contains("projectNameButton")){
        		passthrough(e);
        		return
      		}
		});
	};

	// -- Tasks -- //

	const loadAllTasks = function(passthrough) {
		allTasksButton.addEventListener("click", function(e) {
			passthrough(e)
		})
	}

	const loadThisWeek = function(passthrough) {
		thisWeekButton.addEventListener("click", function(e) {
			passthrough(e)
		})
	}

	const loadThisMonth = function(passthrough) {
		thisMonthButton.addEventListener("click", function(e) {
			passthrough(e)
		})
	}

	const taskSubmit = function (passthrough) {
		inputSubmitButton.addEventListener("click", function (e) {
			e.preventDefault();
			passthrough(e);
		});
	};

	const taskMouseover = function (passthrough) {
		tasksDiv.addEventListener("mouseover", function (e) {
			passthrough(e);
		});
	};

	const getTaskInputs = function () {

		let checkInputs = 0
		
		if(titleInput.value === ""){
			checkInputs++
		}

		if(dateInput.value === ""){
			checkInputs++
		}

		if(noteInput.value === ""){
			checkInputs++
			return null
		}

		//Check to make sure the input date is after the current date.

		console.log(dateInput.value)

		const splitInputDate = (dateInput.value.split("-"))
		const splitTodaysDate = (format(new Date(), "dd-MM-yyyy")).split("-")
		const inputDate = format(new Date(splitInputDate[0], splitInputDate[1]-1, splitInputDate[2]), "dd-MM-yyyy")
		splitTodaysDate[1] -= 1
		splitInputDate[1] -= 1

		let isBeforeDate = isBefore(new Date(splitInputDate[0],splitInputDate[1],splitInputDate[2]), new Date(splitTodaysDate[2],splitTodaysDate[1],splitTodaysDate[0]))

		if(isBeforeDate){
			console.log("the date is before");
			return null
		}
		
		if(checkInputs > 0){
			return null
		}

		const taskInputsArray = [ titleInput.value, inputDate, noteInput.value ]

		titleInput.value = ""
		dateInput.value = ""
		noteInput.value = ""

		return taskInputsArray

 	};

	return {
		projectSubmit,
		getProjectInput,
		projectSelect,
		taskMouseover,
		taskSubmit,
		getTaskInputs,
		loadAllTasks,
		loadThisWeek,
		loadThisMonth
	};

})();

export { Inputs };
