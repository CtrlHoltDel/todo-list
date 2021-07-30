import { formatDistance, isBefore } from 'date-fns'

const projectSubmitButton = function (passthrough) {
	document
		.getElementById("projectsContainer")
		.addEventListener("click", (e) => {
			e.preventDefault();
			passthrough(e);
		});
};

const formSubmitButton = function (passthrough) {
	document
		.getElementById("submitTaskInputButton")
		.addEventListener("click", function (e) {
			e.preventDefault();
			passthrough(e);
		});
};

const hoverTaskCheck = function(passthrough){
	document.getElementById("list").addEventListener("mouseover", function(e){
		passthrough(e)
	})
}

const hoverTaskOut =  function(passthrough){
	document.getElementById("list").addEventListener("mouseout", function(e){
		passthrough(e)
	})
}

const taskContainer = function(passthrough){
	document.getElementById("list").addEventListener("click", function(e){
		passthrough(e)
	})
}

const timeRemainingProject = function(date){

	date = date.split("/")

	if(isBefore(new Date(date[2],date[1]-1,date[0]), new Date)){
		return "In the past"
	}

	return `${formatDistance(
		new Date(date[2],date[1]-1,date[0]),
		new Date,
		{addSuffux: true}
	)} remaining`

}

export { projectSubmitButton, formSubmitButton, hoverTaskCheck, hoverTaskOut, timeRemainingProject, taskContainer };
