import { input } from "./input"

const storedList = (function(){
	const projects = {}

	const addProject = function(projectName){
		projects[projectName] = {}
		console.log(projects)
	}

	input.newProject(addProject)

})();

export { storedList }