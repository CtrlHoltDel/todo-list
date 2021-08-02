const submitProjectButton = document.getElementById("submitProjectButton")
const allProjectsContainer = document.querySelector(".mainContainer__projectListDiv__projectList")

const Input = (function(){

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

	return { newProject, chooseProject, deleteProject }

})();

const GetInput = (function(){

	const projectForm = document.getElementById("projectInput")

	const projectName = function(){
		const valueToReturn = projectForm.value.toLowerCase()
		projectForm.value = ""
		return valueToReturn
	}

	return { projectName }

})();

export { Input, GetInput }