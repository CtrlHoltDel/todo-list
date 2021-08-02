import format from "date-fns/format";

const projectsContainerDiv = document.querySelector(".mainContainer__projectListDiv__projectList")
const tasksContainerDiv = document.querySelector(".mainContainer__taskListDiv__container")

const ProjectsDOM = (function(){

	const renderSingle = function(projectName){

		projectName = projectName.charAt(0).toUpperCase() + projectName.slice(1);

		const mainContainerDiv = document.createElement("div")
		const projectNameDiv = document.createElement("div")

		mainContainerDiv.setAttribute("id", projectName)
		mainContainerDiv.classList.add("mainContainer__projectListDiv__projectList__projectContainer")
		projectNameDiv.classList.add("projectName")

		projectNameDiv.innerHTML = projectName
		mainContainerDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 projectDeleteButton"viewBox="0 0 20 20" fill="currentColor"> <path fill-rule="evenodd" d="M6.707 4.879A3 3 0 018.828 4H15a3 3 0 013 3v6a3 3 0 01-3 3H8.828a3 3 0 01-2.12-.879l-4.415-4.414a1 1 0 010-1.414l4.414-4.414zm4 2.414a1 1 0 00-1.414 1.414L10.586 10l-1.293 1.293a1 1 0 101.414 1.414L12 11.414l1.293 1.293a1 1 0 001.414-1.414L13.414 10l1.293-1.293a1 1 0 00-1.414-1.414L12 8.586l-1.293-1.293z" clip-rule="evenodd" /> </svg>`
		
		projectsContainerDiv.appendChild(mainContainerDiv)
		mainContainerDiv.prepend(projectNameDiv)
	}

	const renderAll = function(projectArray){
		projectArray.forEach(projectName => renderSingle(projectName))
	}

	const deleteSingle = function(element){
		element.remove()
	}


	return { renderAll, renderSingle, deleteSingle }

})();

const TasksDOM = (function(){

	const renderSingle = function(task){

 		const createElement = function(className, content){
			const element = document.createElement("div")
			element.classList.add(className)

			if(content != undefined){
				element.innerHTML = content
			}

			return element
		}

		const taskLineDividerCreator = function(){
			const taskLineDividerDiv = createElement("taskLineDividerDiv")
			const taskLineDivider = createElement("taskLineDivider")
			taskLineDividerDiv.appendChild(taskLineDivider)

			return taskLineDividerDiv
		}

		const taskContainer = createElement("taskContainer")
		const taskTitle = createElement("taskTitle", task.title)
		const taskDate = createElement("taskDate", task.date)
		const taskNote = createElement("taskNote", task.note)
		const taskButtons = createElement("taskButtons")
		const taskEdit = createElement("taskEdit")
		const taskDelete = createElement("taskDelete")

		taskEdit.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 taskEditButton" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path class="taskEditButton" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>`
		taskDelete.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 taskDeleteButton"viewBox="0 0 20 20" fill="currentColor"> <path class="taskDeleteButton" fill-rule="evenodd" d="M6.707 4.879A3 3 0 018.828 4H15a3 3 0 013 3v6a3 3 0 01-3 3H8.828a3 3 0 01-2.12-.879l-4.415-4.414a1 1 0 010-1.414l4.414-4.414zm4 2.414a1 1 0 00-1.414 1.414L10.586 10l-1.293 1.293a1 1 0 101.414 1.414L12 11.414l1.293 1.293a1 1 0 001.414-1.414L13.414 10l1.293-1.293a1 1 0 00-1.414-1.414L12 8.586l-1.293-1.293z" clip-rule="evenodd" /> </svg>`
		const appendArray = [
			taskTitle,
			taskLineDividerCreator(),
			taskDate,
			taskLineDividerCreator(),
			taskNote,
			taskLineDividerCreator(),
			taskButtons,
		];

		tasksContainerDiv.appendChild(taskContainer)
		appendArray.forEach(div => taskContainer.appendChild(div))
		appendArray.forEach(div => {
			if(!div.classList.contains("taskButtons")) div.parentNode.setAttribute("id", task.id)
		})
		taskButtons.appendChild(taskEdit)
		taskButtons.appendChild(taskDelete)

	}

	const renderAll = function(array){
		array.forEach(task => renderSingle(task))
	}
	
	const clearTasks = function(){
		tasksContainerDiv.innerHTML = ""
	}

	const clearAndRenderTasks = function(array){
		clearTasks();
		renderAll(array);
	}

	return { renderSingle, renderAll, clearTasks, clearAndRenderTasks }

})();

const StyleDOM = (function(){

	const resetCurrentlySelected = function(){
		const element = document.getElementById("reset_Style");
		element.classList.add("currentlySelected", "currentlySelectedFontColour")
	}

	const addCurrentlySelected = function(element){
		const nodeLength = element.parentNode.children.length
		removeCurrentlySelected(element);

		element.parentNode.children[0].classList.add("currentlySelectedFontColour")
		for(let i=0; i<nodeLength; i++){
			element.parentNode.children[i].classList.add("currentlySelected")
		}

	}

	const removeCurrentlySelected = function(){
		const projectsLength = projectsContainerDiv.children.length

		for(let i=0; i<projectsLength; i++){
			projectsContainerDiv.children[i].children[0].classList.remove("currentlySelected")
			projectsContainerDiv.children[i].children[0].classList.remove("currentlySelectedFontColour")
			if(projectsContainerDiv.children[i].children[1] != undefined){
				projectsContainerDiv.children[i].children[1].classList.remove("currentlySelected")
				projectsContainerDiv.children[i].children[1].classList.remove("currentlySelectedFontColour")
			}
		}


	}

	return { addCurrentlySelected, removeCurrentlySelected, resetCurrentlySelected}

})();

const wholeApp = (function(){

	const pageTitle = document.querySelector(".header__projectTitle")
	const dateInput = document.getElementById("dateInput")

	const changeTitle = function(title){
		pageTitle.innerHTML = title.charAt(0).toUpperCase() + title.slice(1);
	}

	const setDateInputParameters = function(){
		const date = format(new Date, "yyyy-MM-dd").split("-")
		dateInput.setAttribute("min", `${date[0]}-${date[1]}-${date[2]}`)
		dateInput.setAttribute("value", `${date[0]}-${date[1]}-${date[2]}`)
	}

	return { changeTitle, setDateInputParameters }

})();

export { ProjectsDOM, TasksDOM, StyleDOM, wholeApp }
