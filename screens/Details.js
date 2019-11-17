import * as firebase from 'firebase'
import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Text, Button, CheckBox } from 'react-native-elements'

DetailsScreen.navigationOptions = {
  title: 'Details',
}

export default function DetailsScreen({ route, navigation }) {
  const [loading, setLoading] = useState(false)
  const [issueCompleted, setIssueCompleted] = useState(false)
  const [issue, setIssue] = useState({})
  const { id, projectId } = navigation.getParam('issue')

  useEffect(() => {
    setLoading(true)
    const issueRef = firebase.database().ref(`issues/${projectId}/${id}`)
    issueRef.on('value', snapshot => {
      const issueObject = snapshot.val()
      setIssue(issueObject)
      issueObject.completedOn && setIssueCompleted(true)
      setLoading(false)
    })
    return () => issueRef.off()
  }, [])

  setComplete = complete => {
    setLoading(true)
    setIssueCompleted(complete)
    const completedOn = complete
      ? new Date()
      : null
    const updateIssue = firebase.database().ref(`issues/${projectId}/${id}`)
    updateIssue.update({ completedOn }, () => {
      setLoading(false)
    })
  }

  if (loading) {
    return <View><Text>Loading...</Text></View>
  }

  return (
  <View>
    <Text h2>{issue.title}</Text>
    <Text>{issue.descr}</Text>
    <Text>{issue.category ? issue.category : 'No category'}</Text>
    <Text style={{ display: issue.dueDate ? 'flex' : 'none' }}>Due on {issue.dueDate}</Text>
    <Text>Importance: {issue.importance}</Text>
    <Text style={{ display: issueCompleted ? 'flex' : 'none' }}>Completed on {issue.completedOn}</Text>
    <CheckBox
      title='Mark as complete'
      checked={issueCompleted}
      onPress={() => setComplete(!issueCompleted)}
    />
    <Button title="Edit" />
  </View>
  )
}
