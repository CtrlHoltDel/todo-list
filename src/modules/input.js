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

export { projectSubmitButton, formSubmitButton };
