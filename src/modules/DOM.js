import format from "date-fns/format";

const projectsContainerDiv = document.querySelector(".mainContainer__projectListDiv__projectList")
const tasksContainerDiv = document.querySelector(".mainContainer__taskListDiv__container")
const projectDeleteModal = document.querySelector(".confirmDeleteProjectModal")

const ProjectsDOM = (function(){

	const renderSingle = function(projectName){


		const mainContainerDiv = document.createElement("div")
		const projectNameDiv = document.createElement("div")

		mainContainerDiv.setAttribute("id", projectName)
		mainContainerDiv.classList.add("mainContainer__projectListDiv__projectList__projectContainer")
		projectNameDiv.classList.add("projectName")

		projectName = projectName.charAt(0).toUpperCase() + projectName.slice(1);
		
		projectNameDiv.innerHTML = projectName
		mainContainerDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 projectDeleteButton"viewBox="0 0 20 20" fill="currentColor"> <path fill-rule="evenodd" d="M6.707 4.879A3 3 0 018.828 4H15a3 3 0 013 3v6a3 3 0 01-3 3H8.828a3 3 0 01-2.12-.879l-4.415-4.414a1 1 0 010-1.414l4.414-4.414zm4 2.414a1 1 0 00-1.414 1.414L10.586 10l-1.293 1.293a1 1 0 101.414 1.414L12 11.414l1.293 1.293a1 1 0 001.414-1.414L13.414 10l1.293-1.293a1 1 0 00-1.414-1.414L12 8.586l-1.293-1.293z" clip-rule="evenodd" /> </svg>`
		
		projectsContainerDiv.appendChild(mainContainerDiv)
		mainContainerDiv.prepend(projectNameDiv)
	}

	const renderAll = function(projectArray){
		projectArray.forEach(projectName => renderSingle(projectName))
	}

	return { renderAll, renderSingle }

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


		const printedDate = task.date.split("-")
		const formattedDate = `${printedDate[2]}/${printedDate[1]}/${printedDate[0]}`
		const currentDate = format(new Date, "yyyy-MM-dd").split("-")

		const taskContainer = createElement("taskContainer")
		const taskTitle = createElement("taskTitle", task.title)
		const taskDate = createElement("taskDate", formattedDate)
		const taskNote = createElement("taskNote", task.note)
		const taskButtons = createElement("taskButtons")
		const taskEdit = createElement("taskEdit")
		const taskDelete = createElement("taskDelete")
		const taskConfirmEdit = createElement("taskConfirmEdit")

		const taskTitleEdit = document.createElement("input")
		const taskDateEdit = document.createElement("input") 
		const taskNoteEdit = document.createElement("input")

		taskTitleEdit.classList.add("editTask", "taskTitleEdit")
		taskDateEdit.classList.add("editTask", "taskDateEdit")
		taskNoteEdit.classList.add("editTask", "taskNoteEdit")

		taskTitleEdit.setAttribute("id", `titleEdit-${task.id}`)
		taskDateEdit.setAttribute("id", `dateEdit-${task.id}`)
		taskNoteEdit.setAttribute("id", `noteEdit-${task.id}`)

		taskTitleEdit.value = task.title
		taskNoteEdit.value = task.note


		taskDateEdit.setAttribute("type", "date")
		taskDateEdit.setAttribute("value", `${printedDate[0]}-${printedDate[1]}-${printedDate[2]}`)
		taskDateEdit.setAttribute("min", `${currentDate[0]}-${currentDate[1]}-${currentDate[2]}`)

		taskEdit.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 taskEditButton" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path class="taskEditButton" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>`
		taskDelete.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 taskDeleteButton"viewBox="0 0 20 20" fill="currentColor"> <path class="taskDeleteButton" fill-rule="evenodd" d="M6.707 4.879A3 3 0 018.828 4H15a3 3 0 013 3v6a3 3 0 01-3 3H8.828a3 3 0 01-2.12-.879l-4.415-4.414a1 1 0 010-1.414l4.414-4.414zm4 2.414a1 1 0 00-1.414 1.414L10.586 10l-1.293 1.293a1 1 0 101.414 1.414L12 11.414l1.293 1.293a1 1 0 001.414-1.414L13.414 10l1.293-1.293a1 1 0 00-1.414-1.414L12 8.586l-1.293-1.293z" clip-rule="evenodd" /> </svg>`
		taskConfirmEdit.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 taskEditConfirmButton" viewBox="0 0 20 20" fill="currentColor"><path class="taskEditConfirmButton" fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>`
		
		if(task.completed){
			taskContainer.classList.add("completedTask")
		}
		
		const appendArray = [
			taskTitle,
			taskTitleEdit,
			taskLineDividerCreator(),
			taskDate,
			taskDateEdit,
			taskLineDividerCreator(),
			taskNote,
			taskNoteEdit,
			taskLineDividerCreator(),
			taskButtons
		];

		tasksContainerDiv.appendChild(taskContainer)
		appendArray.forEach(div => taskContainer.appendChild(div))
		appendArray.forEach(div => {
			if(!div.classList.contains("taskButtons")) div.parentNode.setAttribute("id", task.id)
		})
		taskButtons.appendChild(taskConfirmEdit)
		taskButtons.appendChild(taskEdit)
		taskButtons.appendChild(taskDelete)

	}

	const renderArray = function(array){
		array.forEach(task => renderSingle(task))
	}
	
	const clearTasks = function(){
		tasksContainerDiv.innerHTML = ""
	}

	const clearAndRenderTasks = function(array){
		clearTasks();
		renderArray(array);
	}

	const changeStatus = function(node){
		if(node.classList.contains("completedTask")){
			node.classList.remove("completedTask")
		} else {
			node.classList.add("completedTask")
		}
	}

	const clearAndRenderWithHeaders = function(array){

		clearTasks();
		const projectsWithTasks = []
		array.forEach(task => projectsWithTasks.push(task.project))
		const removedDuplicateProjects = [...new Set(projectsWithTasks)]

		removedDuplicateProjects.forEach(project => {

			const filteredArray = array.filter(task => task.project === project)

			if(project === "all") project = "unallocated tasks"

			const header = document.createElement("div")
			header.innerHTML = project.charAt(0).toUpperCase() + project.slice(1)
			header.classList.add("headerForObjects")
			tasksContainerDiv.appendChild(header)



			filteredArray.forEach(task => renderSingle(task))
		})

	}

	const taskEdit = function(node){
		const childNodes = node.children
		const arrayEdits = [ childNodes[1], childNodes[4], childNodes[7]]
		const staticTaskInfo = [ childNodes[0], childNodes[3], childNodes[6]]

		childNodes[9].children[0].style.display = "flex"
		childNodes[9].children[1].style.display = "none"
		arrayEdits.forEach(editInput => editInput.style.display = "block")
		staticTaskInfo.forEach(staticNode => staticNode.style.display = "none")
	}

	const taskEditValues = function(node, values){
		node.children[0].innerHTML = values[0]

		const splitDate = values[1].split("-")
		node.children[3].innerHTML = `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`
		node.children[6].innerHTML = values[2]
	}

	const taskEditConfirm = function(node){
		const childNodes = node.children
		const arrayEdits = [ childNodes[1], childNodes[4], childNodes[7]]
		const staticTaskInfo = [ childNodes[0], childNodes[3], childNodes[6]]

		childNodes[9].children[0].style.display = "none"
		childNodes[9].children[1].style.display = "flex"
		arrayEdits.forEach(editInput => editInput.style.display = "none")
		staticTaskInfo.forEach(staticNode => staticNode.style.display = "flex")
	}

	return { renderSingle, renderArray, clearTasks, clearAndRenderTasks, changeStatus, clearAndRenderWithHeaders, taskEdit, taskEditConfirm, taskEditValues }

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

	const removeDeleteConfirmModal = function(){
		projectDeleteModal.style.display = "none"
	}

	return { addCurrentlySelected, removeCurrentlySelected, resetCurrentlySelected, removeDeleteConfirmModal}

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

	const currentDate = function(){
		const currentDate = format(new Date, "yyyy-MM-dd")
		return currentDate
	}

	return { changeTitle, setDateInputParameters, currentDate }

})();

export { ProjectsDOM, TasksDOM, StyleDOM, wholeApp }
