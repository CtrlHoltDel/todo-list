class Project {
	constructor(projectName) {
		this.project_Name = projectName;
		this.tasks = [];
		this.id = Math.random();
	}
}

class Task {
	constructor(title, date, description, priority) {
		(this.title = title),
			(this.date = date),
			(this.description = description),
			(this.priority = priority);
	}
}

export { Task , Project }