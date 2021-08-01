const Inputs = (function () {
	//Inputs
	const projectInput = document.querySelector("[data-project-input]");
	const titleInput = document.getElementById("titleInput");
	const dateInput = document.getElementById("dateInput");
	const noteInput = document.getElementById("noteInput");

	//Buttons
	const projectSubmitButton = document.querySelector(".projectSubmit");
	const inputSubmitButton = document.querySelector(".taskSubmit");

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
      console.log("empty title")
      checkInputs++
    }

    if(dateInput.value === ""){
      console.log("empty date")
      checkInputs++
    }

    if(noteInput.value === ""){
      console.log("empty note")
      checkInputs++
    }

    if(checkInputs > 0){
      return null
    }

    checkInputs = 0
    const taskInputsArray = [ titleInput.value, dateInput.value, noteInput.value ]

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
	};

})();

export { Inputs };
