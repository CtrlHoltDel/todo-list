import { format, isBefore } from "date-fns";

const Input = (function(){

	const submitProjectButton = document.getElementById("submitProjectButton")
	const allProjectsContainer = document.querySelector(".mainContainer__projectListDiv__projectList")
	const allTasksContainer = document.querySelector(".mainContainer__taskListDiv__container")
	const submitTaskButton = document.getElementById("taskSubmit")
	const projectDeleteModal = document.querySelector(".confirmDeleteProjectModal")

	const newProject = function(passthrough){
		submitProjectButton.addEventListener("click", function(e){
			e.preventDefault();
			passthrough();
		})
	}

	const chooseProject = function(passthrough){
		allProjectsContainer.addEventListener("click", function(e){
			if(e.target.classList.contains("projectName")){
				passthrough(e)
			}
		})
	}

	const deleteProject = function(passthrough){
		allProjectsContainer.addEventListener("click", function(e){
			if(e.target.classList.contains("projectDeleteButton") || 	(e.target.parentNode.classList.contains("projectDeleteButton"))){
				passthrough(e)
			}
		})
	}

	const newTask = function(passthrough){
		submitTaskButton.addEventListener("click", function(e){
			e.preventDefault();
			passthrough()
		})
	}

	const taskEditDelete = function(passthrough){
		allTasksContainer.addEventListener("click", function(e){
			passthrough(e)
		})
	}

	const confirmDelete = function(passthrough){
		projectDeleteModal.style.display = "flex"
		projectDeleteModal.addEventListener("click", function(e){
			passthrough(e)
		})
	}

	return { newProject, chooseProject, deleteProject, newTask, taskEditDelete, confirmDelete }

})();

const GetInput = (function(){

	const projectForm = document.getElementById("projectInput")

	const formCheck = function(title, date, note ){

		const todaysDate = format(new Date, "yyyy-MM-dd").split("-")
		const inputtedDate = date.value.split("-")
		const beforeCheck = isBefore(new Date(inputtedDate[0], inputtedDate[1], inputtedDate[2]), new Date(todaysDate[0], todaysDate[1], todaysDate[2]))

		let missedInputs = 0

		if(title.value === ""){
			console.log("fix title")
			missedInputs++
		}

		if(note.value === ""){
			console.log("fix note")
			missedInputs++
		}

		if(beforeCheck){
			console.log("The date is before")
			missedInputs++
		}

		if(missedInputs > 0){
			return null
		}

		return [title.value, date.value, note.value]
	}

	const projectName = function(){
		const valueToReturn = projectForm.value.toLowerCase()
		projectForm.value = ""
		return valueToReturn
	}

	const form = function(){

		const title = document.getElementById("titleInput")
		const date = document.getElementById("dateInput")
		const note = document.getElementById("noteInput")

		const todaysDate = format(new Date, "yyyy-MM-dd").split("-")

		const values = formCheck(title, date, note)

		title.value	= ""
		date.value = `${todaysDate[0]}-${todaysDate[1]}-${todaysDate[2]}`
		note.value = ""

		return values

	}

	const taskEdit = function(node){
		const clickedID = node.id
		const title = document.getElementById(`titleEdit-${clickedID}`)
		const date = document.getElementById( `dateEdit-${clickedID}`)
		const note = document.getElementById(`noteEdit-${clickedID}`)

		const values = formCheck(title, date, note)

		return values
	}

	return { projectName, form, taskEdit }

})();

export { Input, GetInput }