export class Project {
  constructor(props) {
    this.id = props.id || 1
    this.title = props.title
    this.createdAt = props.createdAt || new Date()
  }
}