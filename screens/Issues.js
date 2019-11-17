import * as firebase from 'firebase'
import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Button } from 'react-native'

IssuesScreen.navigationOptions = {
  title: 'Issues',
}

export default function IssuesScreen({ route, navigation }) {
  const [loading, setLoading] = useState(false)
  const [issuesList, setIssuesList] = useState([])

  const project = navigation.getParam('project', {
    id: '',
    title: '',
    descr: '',
  })

  useEffect(() => {
    setLoading(true)
    firebase.database().ref('issues/' + project.id).on('value', snapshot => {
      const data = snapshot.val()
      const issues = []
      data && Object.keys(data) && Object.keys(data).map(
        id => issues.push({ id, ...data[id] })
      )
      setIssuesList(issues)
      setLoading(false)
    })
  }, [])

  renderIssues = ({ item: issue }) => (
    <View style={{ borderColor: 'gray', borderWidth: 1, margin: 5, padding: 5 }}>
      <Text>{issue.title}</Text>
    </View>
  )

  if (loading) {
    return (<View><Text>Loading...</Text></View>)
  }

  return (
    <View>
      <Text>Issues for {project.title}</Text>
      <FlatList
          keyExtractor={item => item.id.toString()}
          data={issuesList}
          renderItem={renderIssues}
        />
        <Button
          title="Add Issue"
          onPress={() => navigation.navigate('AddIssue', { project })}
        />
    </View>
  )
}
