import * as firebase from 'firebase'

export function getIssue(projectId, issueId) {
  const issueRef = firebase.database().ref(`issues/${projectId}/${issueId}`)
  let issue = {}
  issueRef.on('value', snapshot => {
    issue = snapshot.val()
  }, () => issueRef.off())
  return issue
}

export function getIssues(projectId) {
  const issuesRef = firebase.database().ref(`issues/${projectId}`)
  let issues = []
  issuesRef.on('value', snapshot => {
    const data = snapshot.val()
    data && Object.keys(data) && Object.keys(data).map(
      id => issues.push({ id, ...data[id] })
    )
  }, () => issuesRef.off())
  return issues
}

export function addIssue(issue) {
  const issueRef = firebase.database().ref(`issues/${issue.projectId}/`)
  issueRef.push({ ...issue })
}

export function updateIssue(issue) {
  const issueRef = firebase.database().ref(`issues/${issue.projectId}/${issue.id}`)
  issueRef.update({ ...issue })
}

export function removeIssue(issue) {
  const issueRef = firebase.database().ref(`issues/${issue.projectId}/${issue.id}`)
  issueRef.remove()
}
