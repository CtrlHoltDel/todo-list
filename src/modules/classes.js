class Task {
    constructor(title, date, note, project){
    this.project = project,
    this.title = title,
    this.date = date,
    this.note = note,
    this.complteted = false,
    this.id = Math.random();
  }
}

export { Task }