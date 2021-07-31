import { DOM } from "./DOM";
import { Project, Task } from "./constructors";
import { projectSubmitButton, formSubmitButton, hoverTaskCheck, hoverTaskOut, timeRemainingProject, taskContainer } from "./input";

const UI = (function () {
	//Setting keys for the storage of the full array and currently selected item.
	let projectArrayKey = "LOCAL_STORAGE_CURRENT_ITEM";
	let projectCurrentKey = "LOCAL_STORAGE_CURRENT_PROJECT";

	//The array that contains all the information.
	let projectArray = [];
	let selectedProjectID = localStorage.getItem(projectCurrentKey);


	const getProjectFromId = function(id){
		return projectArray.find(project => project.id == id)
	}
	
	//A function to load the storage from the array.
	const loadProject = (function () {
		if (localStorage.getItem(projectArrayKey) != null) {
			projectArray = JSON.parse(localStorage.getItem(projectArrayKey));
		}
	})();

	//A function that can be called to stringify and save the project.
	const saveProject = function () {
		const stringifiedJson = JSON.stringify(projectArray);
		localStorage.setItem(projectArrayKey, stringifiedJson);
	};

	//A function that creates a new project with empty tasks and a random ID - adds to dom and array.
	const newProject = function (projName) {
		//Creates a new project
		let newProject = new Project(projName)

		//Pushes the project to the array.
		projectArray.push(newProject);

		//Adds the new project to the DOM
		DOM.prependNewProject(newProject);

		//Saves the whole array to local storage.
		saveProject();
	};

	//Creating all the tasks into divs
	const taskListCreate = function(project){
		DOM.createTaskListDiv();
		DOM.renderAllTasks(project);	
	}

	//Deleting a single task from the array.
	const deleteTask = function(taskID, projectID){
		let projectIndex = projectArray.findIndex(project => project.id == projectID)
		let taskIndex = projectArray[projectIndex].tasks.findIndex(task => task.id === taskID)

		projectArray[projectIndex].tasks.splice(taskIndex,1)
		saveProject();
	}


	const deleteProject = function(projectID){

	}

	const projects = (function(){

		//Adds an event listener for the project list window.
		projectSubmitButton(function (e) {
			const newProjectNameInput = document.getElementById("addProjectInput");
			//If it's an item in the list it
			//Changes the currently selected project variable
			//Clears the "currently selected" style from all
			//Adds it to the clicked element
			//And changes the currently selected variable within the local storage.


			if (e.target.classList.contains("addProjectDiv") || e.target.classList.contains("projectListLI")) {

				let selectedProjectID

				//Sets the ID of the selected project
				if(e.target.classList.contains("addProjectDiv")){
					console.log(e.target.parentNode.id)
					selectedProjectID = e.target.parentNode.id
				} else {
					selectedProjectID = e.target.id;
				}


				//Adds a title to the header
				DOM.addTitle(getProjectFromId(selectedProjectID).project_Name)

				//Removes the style from all the list.
				DOM.clearProjectListStyle();
				document.getElementById(selectedProjectID).classList.add("currentlyselected");
				localStorage.setItem(projectCurrentKey, selectedProjectID);

				taskListCreate(getProjectFromId(selectedProjectID))
				
			}

			//If the object clicked is the submit button for the input
			if (e.target.id === "addProjectButton") {
				if (newProjectNameInput.value === "") {
					return;
				} else {
					newProject(newProjectNameInput.value);
					newProjectNameInput.value = "";
				}
			}

		});


	})();

	//Form
	const forms = (function(){
		formSubmitButton(function(e){

			DOM.checkForNoTasks()

			//Checks if any of the forms are emperrorFormty and if so displays an error.
			DOM.formErrorMessage();
		
			//Check if there's missing items, if so - stops the function.
			if(DOM.checkMissingItemsForm()){
				return
			}

			//Getting the info from the form.
			const inputFormInfo = DOM.getInfoForm()

			//Creating a new task and pushing it to the current project array and DOM.
			let currentTask = new Task(inputFormInfo[0], inputFormInfo[1], inputFormInfo[2])
			let currentProject = getProjectFromId(selectedProjectID)
			currentProject.tasks.push(currentTask)
			DOM.createTask(currentTask);

			//Checks if the first task is the error message and if it is, clearing the DOM.
			DOM.checkForNoTasks();

			//Clears the input form
			DOM.resetForm();

			//Saving the whole project after a new task has been added.
			saveProject();
		});
	})();


	const tasks = (function(){	
		
		let currentTask
		//When a task is being clicked.
		taskContainer(function(e){

			//Deleting the task if the delete key is pressed
			if(e.target.classList.contains("deleteTaskContainer") || e.target.parentNode.classList.contains("deleteTaskContainer")){
				
				let element
				if(e.target.parentNode.classList.contains("taskContainer")){
					element = e.target.parentNode
				} else if (e.target.parentNode.parentNode.classList.contains("taskContainer")) {
					element = e.target.parentNode.parentNode
				}

				deleteTask(currentTask[0].id, selectedProjectID);
				DOM.deleteElement(element)
			}

			if(e.target.parentNode.classList.contains("taskContainer")){
				//Changing the status of item in the DOM and object to completed/not completed.
				DOM.changeStatus(e.target.parentNode)
				if(currentTask[0].completed){
					e.target.parentNode.children[1].innerHTML = timeRemainingProject(currentTask[0].dueDate)
					currentTask[0].completed = false
				} else {
					e.target.parentNode.children[1].innerHTML = "Completed"
					currentTask[0].completed = true
				}

				saveProject();
			}
		
		})

		// When a task is being hovered over.
		hoverTaskCheck(function(e){
			if(e.target.parentNode.classList.contains("taskContainer")){
				//On hover, finds the ID of the task and finds the specific task.
				const hoveredItemId =  e.target.parentNode.id
				currentTask = getProjectFromId(selectedProjectID).tasks.filter(task => task.id === e.target.parentNode.id)

				if(currentTask[0].completed){
					//If the current task is completed, states completed.
					e.target.parentNode.children[1].innerHTML = "Completed"
				} else {
					//Changes the text contained within the 3rd child of the div to be the time remaining until that project is completed.
					e.target.parentNode.children[1].innerHTML = timeRemainingProject(currentTask[0].dueDate)
				}
			}
		});

		hoverTaskOut(function(e){
			//Resets back to the date on hover out.
			if(e.target.parentNode.classList.contains("taskContainer")){
				e.target.parentNode.children[1].innerHTML = currentTask[0].dueDate
			}
		});




	})();

	////Below is what happens on first load.
	const firstLoad = (function(){

		DOM.setValuesDateForm();
		
		DOM.renderProjectList(projectArray);

		if (selectedProjectID != null) {
			document.getElementById(selectedProjectID).classList.add("currentlyselected");
			DOM.addTitle(getProjectFromId(selectedProjectID).project_Name)
			taskListCreate(getProjectFromId(selectedProjectID));
		}
	
	
		document.getElementById("headerOverallTitle").addEventListener("click", function(){
			console.log(projectArray)
		})

	})();

})();

export { UI };
