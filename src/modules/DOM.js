import { format } from 'date-fns'

const DOM = (function () {

	//Project Bar

	const renderProjectList = function (array) {
		const projectList = document.getElementById("projectsList");

		array.forEach((project) => {
			const newList = document.createElement("li");
			newList.setAttribute("id", project.id);
			newList.classList.add("projectListLI");
			newList.innerHTML = project.project_Name;
			projectList.prepend(newList);
		});
	};

	const prependNewProject = function (project) {
		const projectList = document.getElementById("projectsList");

		let newList = document.createElement("li");
		newList.setAttribute("id", project.id);
		newList.classList.add("projectListLI");
		newList.innerHTML = project.project_Name;
		projectList.prepend(newList);
	};

	const clearProjectListStyle = function () {
		const allProjects = document.querySelectorAll(".projectListLI");

		allProjects.forEach((project) => {
			project.classList.remove("currentlyselected");
		});
	};

	const addTitle = function (title) {
		let headerOverallTitle = document.getElementById("headerOverallTitle");
		headerOverallTitle.innerHTML = title;
	};

	//Tasks

	const taskDivContainer = document.getElementById("allTasksContainer");

	const createTaskListDiv = function () {
		const taskListInput = document.getElementById("taskInputForm");
		taskListInput.style.display = "flex";
	};

	const createTask = function (task) {

		const taskContainer = document.createElement("div");
		taskContainer.classList.add("taskContainer")

		if(task.completed){
			taskContainer.classList.add("completed")
		} else { 
			taskContainer.classList.remove("completed")	
		}

		taskContainer.id = task.id
		const titleTask = document.createElement("div");
		titleTask.classList.add("titleTaskContainer")
		const descriptionTask = document.createElement("div");
		descriptionTask.classList.add("descriptionTaskContainer")
		const dateTask = document.createElement("div");
		dateTask.classList.add("dateTaskContainer")

		if (task === false) {
			taskContainer.innerHTML = "No tasks yet";
			taskDivContainer.appendChild(taskContainer);
		} else {
			taskDivContainer.appendChild(taskContainer);
			taskContainer.appendChild(titleTask)
			titleTask.innerHTML = task.title
			taskContainer.appendChild(descriptionTask)
			descriptionTask.innerHTML = task.description
			taskContainer.appendChild(dateTask)
			dateTask.innerHTML = task.dueDate
		}
	};

	const renderAllTasks = function (project) {
		//Checks if there's any tasks in the project
		//If there's no tasks in the current project - adds a div that has a warning about the lack of tasks.
		if (project.tasks.length === 0) {
			//Empties the div
			//Checks if there's already an error message, if there is - doesn't make a new one.
			taskDivContainer.innerHTML = ""
			if(taskDivContainer.childNodes.length >= 1){
				return
			}
			createTask(false);
		} else {
			//Emptys the div
			taskDivContainer.innerHTML = ""
			project.tasks.forEach(task => createTask(task))
		}
	};

	//Checks if the first task is the warning and removes it if it is.
	const checkForNoTasks = function(){
		if(taskDivContainer.childNodes[0].id === "undefined"){
			taskDivContainer.innerHTML = ""
		}
	}

	//Input form

	const titleInput = document.getElementById("titleInput");
	const dueDateInput = document.getElementById("dueDateInput");
	const descriptionInput = document.getElementById("descriptionInput");

	//Checks wether an input variable is empty and shows an error if it is, if the input is clicked the error is removed.
	const formErrorMessage = function () {

		let array = [[titleInput, "Title"], [dueDateInput, "Date"], [descriptionInput, "Description"]]

		array.forEach(input => {
			if (input[0].value === "") {
				document.querySelector(`.required${input[1]}`).style.display =
					"block";
			}
	
			input[0].addEventListener("click", function () {
				document.querySelector(`.required${input[1]}`).style.display =
					"none";
			});
		})

	};

	//Gets the info from the form and returns it as an array.
	const getInfoForm = function () {
		
		let chosenDate = format(new Date(dueDateInput.value), "dd/MM/yyyy")

		return [titleInput.value, chosenDate, descriptionInput.value];
	};

	//Resets all the info in the form.
	const resetForm = function () {
		titleInput.value = "";
		dueDateInput.value = "";
		descriptionInput.value = "";
	};

	//Checks if there's any missing items in the form and returns true if there is.
	const checkMissingItemsForm = function () {
		if (titleInput.value === "" ||descriptionInput.value === "" ||	dueDateInput.value === "") {
			return true;
		}

		return false;
	};

	//Changing completed status
	const changeStatus = function(element){
		if(element.classList.contains("completed")){
			element.classList.remove("completed")
		} else {
			element.classList.add("completed")
		}
	}

	return {
		renderProjectList,
		clearProjectListStyle,
		addTitle,
		prependNewProject,
		renderAllTasks,
		createTaskListDiv,
		formErrorMessage,
		getInfoForm,
		resetForm,
		checkMissingItemsForm,
		createTask,
		checkForNoTasks,
		changeStatus
	};

})();

const DOMTasks = (function(){


})();

export { DOM, DOMTasks };