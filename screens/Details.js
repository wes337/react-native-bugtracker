import * as firebase from 'firebase'
import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Text, CheckBox } from 'react-native-elements'

DetailsScreen.navigationOptions = {
  title: 'Details',
}

export default function DetailsScreen({ route, navigation }) {
  const [issueCompleted, setIssueCompleted] = useState(false)

  const issue = navigation.getParam('issue', {
    title: '',
    descr: '',
    category: '',
    dueDate: null,
    importance: 0,
    completedOn: null,
  })

  useEffect(() => {
    issue.completedOn && setIssueCompleted(true)
  }, [])

  toggleComplete = value => {
    setIssueCompleted(value)
    const completedOn = value
      ? new Date()
      : null
    firebase.database().ref(`issues/${issue.projectId}/${issue.id}`).update({ completedOn: value })
  }

  return (
  <View>
    <Text>{issue.title}</Text>
    <Text>{issue.descr}</Text>
    {/* {issue.category && <Text>{issue.category}</Text>}
    <Text>Due on {issue.dueDate}</Text>
    <Text>Importance: {issue.importance}</Text>
    {issue.completedOn && <Text>Completed on {issue.completedOn}</Text>} */}
    <CheckBox
      title='Mark as complete'
      checked={issueCompleted}
      onPress={() => toggleComplete(!issueCompleted)}
    />
  </View>
  )
}
