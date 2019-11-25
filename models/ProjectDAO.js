import * as firebase from 'firebase'

export const getCategories = projectId => {
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

export const getCategory = (projectId, categoryId) => {
  const categoryRef = firebase.database().ref(`projects/${projectId}/categories/${categoryId}`)
  let category = {}
  categoryRef.on('value', snapshot => {
    category = snapshot.val()
  }, () => categoryRef.off())
  return category
}

export const getMilestones = projectId => {
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
