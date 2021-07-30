
class Project {
	constructor(projectName) {
		this.project_Name = projectName;
		this.tasks = [];
		this.id = Math.random();
	}
}

class Task {
	constructor(title, dueDate, description) {
		this.title = title,
		this.dueDate = dueDate
		this.description = description,
		this.id = `${Math.random()}`,
		this.completed = false
	}
}

export { Task , Project }