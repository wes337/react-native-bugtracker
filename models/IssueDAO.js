import * as firebase from 'firebase'

export const getIssue = (projectId, issueId) => {
  const issueRef = firebase.database().ref(`issues/${projectId}/${issueId}`)
  let issue = {}
  issueRef.on('value', snapshot => {
    issue = snapshot.val()
  }, () => issueRef.off())
  return issue
}

export const addIssue = issue => {
  const issueRef = firebase.database().ref(`issues/${issue.projectId}/`)
  issueRef.push({ ...issue })
}

export const updateIssue = issue => {
  const issueRef = firebase.database().ref(`issues/${issue.projectId}/${issue.id}`)
  issueRef.update({ ...issue })
}

export const removeIssue = issue => {
  const issueRef = firebase.database().ref(`issues/${issue.projectId}/${issue.id}`)
  issueRef.remove()
}
