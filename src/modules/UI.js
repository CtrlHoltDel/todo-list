import { DOM } from "./DOM"
import { eventInputs } from "./input";

//Factory function to create a new object with ID.
const newProject = function(projectName){
	return {name: projectName, id: Math.random(), content: []}
}

const UI = (function(){

	//Project Objects
	const projectsObject = [
	]

	/////////////////////
	//Projects List
	let currentlySelected

	//If there is items in the local storage, load them.
	if(localStorage.todoProj != undefined && projectsObject[0] === undefined){
		let loadedProjects = JSON.parse(localStorage.todoProj)

		loadedProjects.forEach(project => {
			projectsObject.push(project)
		})

	}
	
	//Gets the projectname input and adds it to both the DOM and project
	const projectNameInput = function(){
		const projectInput = document.getElementById("addProjectInput")
		if(projectInput.value != ""){
			projectsObject.push(newProject(projectInput.value))
			DOM.addProjectSingle(projectInput.value);
			projectInput.value = ""
		}
	}

	//Clicking the add new project 
	eventInputs.newProjectName(function(){
		//Adding to both the object and the DOM and resetting the input.
		projectNameInput();
		//Eeach time an item is added, save it to the storage.
		localStorage.setItem('todoProj', JSON.stringify(projectsObject))
	})

	const getProjectName = function(e){
		console.log(e.target.id)
	}

	eventInputs.globalEventListener("click", "li", getProjectName)


	/////////
	//Renders all the project Names in the projects list on load.
	DOM.renderProjectFull(projectsObject);


})();

export { UI }