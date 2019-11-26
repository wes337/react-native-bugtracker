import * as firebase from 'firebase'

export function addProject(project) {
  const projectRef = firebase.database().ref('projects/')
  projectRef.push({ ...project }, () => projectRef.off()) 
}

export function removeProject(projectId) {
  const projectIssuesRef = firebase.database().ref(`issues/${projectId}/`)
  projectIssuesRef.remove(() => {
    const projectRef = firebase.database().ref(`projects/${projectId}`)
    projectRef.remove()
  })
}
