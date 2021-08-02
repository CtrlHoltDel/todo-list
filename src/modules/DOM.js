const projectsContainerDiv = document.querySelector(".mainContainer__projectListDiv__projectList")

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

const StyleDOM = (function(){

	const resetCurrentlySelected = function(){
		const element = document.getElementById("reset_Style");
		element.classList.add("currentlySelected", "currentlySelectedFontColour")
	}

	const addCurrentlySelected = function(element){
		console.log(element)
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

	const changeTitle = function(title){
		pageTitle.innerHTML = title
	}

	return { changeTitle }

})();

export { ProjectsDOM, StyleDOM, wholeApp }
