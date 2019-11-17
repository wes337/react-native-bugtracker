import * as firebase from 'firebase'
import React, { useState, useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'
import { Button, ListItem } from 'react-native-elements'

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
    const issuesRef = firebase.database().ref('issues/' + project.id)
    issuesRef.on('value', snapshot => {
      const data = snapshot.val()
      const issues = []
      data && Object.keys(data) && Object.keys(data).map(
        id => issues.push({ id, ...data[id] })
      )
      setIssuesList(issues)
      setLoading(false)
    })
    return () => issuesRef.off()
  }, [])

  renderIssues = ({ item: issue }) => (
    <ListItem
      title={issue.title}
      subtitle={
        <View>
          <Text>{issue.descr}</Text>
        </View>
      }
      onPress={() => navigation.navigate('Details', { issue })}
      bottomDivider
      chevron
    />
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
        <Button
          title="Add Category"
          onPress={() => navigation.navigate('AddCategory')}
        />
    </View>
  )
}
