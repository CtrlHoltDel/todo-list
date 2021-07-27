import { DOM } from "./DOM"

const input = (function(){

	const newProjectInput = document.getElementById("addProjectInput")

	const newProject = function(passthrough){
		document.getElementById("addProjectButton").addEventListener('click', function(){
			const inputValue = newProjectInput.value
			if(inputValue != ""){
				passthrough(newProjectInput.value)
				DOM.addProject(newProjectInput.value)
				newProjectInput.value = ""
			}
		})
	}
	
	return { newProject }

})();

export { input }