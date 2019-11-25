import * as firebase from 'firebase'
import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Text, Button, CheckBox } from 'react-native-elements'
import { getIssue, updateIssue, removeIssue } from '../models/IssueDAO'
import { getCategory } from '../models/ProjectDAO'

DetailsScreen.navigationOptions = {
  title: 'Details',
}

export default function DetailsScreen({ route, navigation }) {
  const [loading, setLoading] = useState(false)
  const [issue, setIssue] = useState({})
  const [completedOn, setCompletedOn] = useState(false)
  const [category, setCategory] = useState(null)
  const { id } = navigation.getParam('issue')
  const project = navigation.getParam('project')

  useEffect(() => {
    setLoading(true)
    Promise.resolve(getIssue(project.id, id)).then(issue => {
      setIssue(issue)
      setCompletedOn(issue.completedOn || false)
      Promise.resolve(getCategory(project.id, issue.category)).then(category => {
        setCategory(category)
        setLoading(false)
      })
    })
  }, [])

  useEffect(() => {
    setLoading(true)
    Promise.resolve(updateIssue({ ...issue, completedOn })).then(() =>
      setLoading(false)
    )
  }, [completedOn])

  this.removeIssue = () => {
    setLoading(true)
    Promise.resolve(removeIssue(issue)).then(() => {
      setLoading(false)
      navigation.navigate('Issues')
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
    <Text style={{ display: completedOn ? 'flex' : 'none' }}>Completed on {completedOn ? completedOn.toString() : ''}</Text>
    <CheckBox
      title='Completed'
      checked={completedOn ? true : false}
      onPress={() => setCompletedOn(completedOn ? false : new Date())}
    />
    <Button title="Remove" onPress={() => this.removeIssue()} />
    <Button title="Edit" onPress={() => navigation.navigate('AddEditIssue', { project, issue: { id, ...issue } })} />
  </View>
  )
}
