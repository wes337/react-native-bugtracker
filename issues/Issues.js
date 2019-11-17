export class Issue {
  constructor(props) {
    this.id = props.id
    this.projectId = props.projectId
    this.milestoneId = props.milestoneId
    this.title = props.title
    this.importance = props.importance
    this.description = props.description
    this.category = props.category
    this.completedAt = props.completedAt
    this.createdAt = props.createdAt
  }
}