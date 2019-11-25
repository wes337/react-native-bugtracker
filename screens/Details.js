import * as firebase from 'firebase'
import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Text, Button, CheckBox } from 'react-native-elements'
import { getIssue, updateIssue } from '../models/IssueDAO'
import { getCategory } from '../models/ProjectDAO'

DetailsScreen.navigationOptions = {
  title: 'Details',
}

export default function DetailsScreen({ route, navigation }) {
  const [loading, setLoading] = useState(false)
  const [issueCompleted, setIssueCompleted] = useState(false)
  const [category, setCategory] = useState(null)
  const [issue, setIssue] = useState({})
  const { id } = navigation.getParam('issue')
  const project = navigation.getParam('project')

  useEffect(() => {
    setLoading(true)
    Promise.resolve(getIssue(project.id, id)).then(issueObject => {
      if (!issueObject) {
        navigation.navigate('Issues')
        return setLoading(false)
      } else {
        setIssue(issueObject)
        issueObject.completedOn && setIssueCompleted(true)
        return setLoading(false)
      }
    })
  }, [])

  useEffect(() => {
    Promise.resolve(getCategory(project.id, issue.category)).then(category =>
      setCategory(category)
    )

    console.log(issue.completedOn)
  }, [issue])

  setComplete = complete => {
    setLoading(true)
    setIssueCompleted(complete)
    const completedOn = complete
      ? new Date()
      : null
    Promise.resolve(updateIssue({ id, projectId: project.id, completedOn}))
      .then(() => setLoading(false))
  }

  removeIssue = () => {
    setLoading(true)
    const removeIssue = firebase.database().ref(`issues/${project.id}/${id}`);
    removeIssue.remove(() => {
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
    <Text>{category ? category.name : 'No category'}</Text>
    <Text style={{ display: issue.dueDate ? 'flex' : 'none' }}>Due on {issue.dueDate}</Text>
    <Text>Importance: {issue.importance}</Text>
    <Text style={{ display: issueCompleted ? 'flex' : 'none' }}>Completed on {issue.completedOn}</Text>
    <CheckBox
      title='Complete'
      checked={issueCompleted}
      onPress={() => setComplete(!issueCompleted)}
    />
    <Button title="Remove" onPress={() => this.removeIssue()} />
    <Button title="Edit" onPress={() => navigation.navigate('AddEditIssue', { project, issue: { id, ...issue } })} />
  </View>
  )
}
