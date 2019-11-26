import * as firebase from 'firebase'

export function getCategories(projectId) {
  const categoriesRef = firebase.database().ref(`projects/${projectId}/categories/`)
  let categoriesArray = []
  categoriesRef.on('value', snapshot => {
    const data = snapshot.val()
    data && Object.keys(data) && Object.keys(data).map(
      id => categoriesArray.push({ id, ...data[id] })
    )
  }, () => categoriesRef.off())
  return categoriesArray
}

export function getCategory(projectId, categoryId) {
  const categoryRef = firebase.database().ref(`projects/${projectId}/categories/${categoryId}`)
  let category = {}
  categoryRef.on('value', snapshot => {
    category = snapshot.val()
  }, () => categoryRef.off())
  return category
}

export function getMilestones(projectId) {
  const milestonesRef = firebase.database().ref(`projects/${projectId}/milestones/`)
  let milestonesArray = []
  milestonesRef.on('value', snapshot => {
    const data = snapshot.val()
    data && Object.keys(data) && Object.keys(data).map(
      id => milestonesArray.push({ id, ...data[id] })
    )
  }, () => milestonesRef.off())
  return milestonesArray
}

export function addCategory(projectId, category) {
  const categoryRef = firebase.database().ref(`projects/${projectId}/categories/`)
  categoryRef.push(category, () => categoryRef.off())
}

export function addProject(project) {
  const projectRef = firebase.database().ref('projects/')
  projectRef.push({ ...project }, () => projectRef.off()) 
}

export function removeCategory(projectId, categoryId) {
  const categoryRef = firebase.database().ref(`projects/${projectId}/categories/${categoryId}`)
  categoryRef.remove(() => categoryRef.off())
}

export function removeProject(projectId) {
  const projectIssuesRef = firebase.database().ref(`issues/${projectId}/`)
  projectIssuesRef.remove(() => {
    const projectRef = firebase.database().ref(`projects/${projectId}`)
    projectRef.remove()
  })
}
