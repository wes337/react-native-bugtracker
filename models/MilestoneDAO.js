import * as firebase from 'firebase'

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

export function getMilestone(projectId, milestoneId) {
  const milestoneRef = firebase.database().ref(`projects/${projectId}/milestones/${milestoneId}`)
  let milestone = {}
  milestoneRef.on('value', snapshot => {
    milestone = snapshot.val()
  }, () => milestoneRef.off())
  return milestone
}

export function addMilestone(projectId, milestone) {
  const milestoneRef = firebase.database().ref(`projects/${projectId}/milestones/`)
  milestoneRef.push({ ...milestone })
}

export function removeMilestone(projectId, milestoneId) {
  const milestoneRef = firebase.database().ref(`projects/${projectId}/milestones/${milestoneId}`);
  milestoneRef.remove()
}
