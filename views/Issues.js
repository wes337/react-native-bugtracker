import * as firebase from 'firebase'
import React, { useState, useEffect, useMemo } from 'react'
import { View, Text, FlatList } from 'react-native'
import { Button, ListItem, ButtonGroup, SearchBar } from 'react-native-elements'

IssuesScreen.navigationOptions = {
  title: 'Issues',
}

export default function IssuesScreen({ route, navigation }) {
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [issuesList, setIssuesList] = useState([])
  const [filter, setFilter] = useState(0)

  const project = navigation.getParam('project', {
    id: '',
    title: '',
    descr: '',
  })

  useEffect(() => {
    const issuesRef = firebase.database().ref(`issues/${project.id}`)
    issuesRef.on('value', snapshot => {
      const issues = []
      const data = snapshot.val()
      data && Object.keys(data) && Object.keys(data).map(
        id => issues.push({ id, ...data[id]})
      )
      setIssuesList(issues)
      setLoading(false)
    })
  }, [])

  renderIssues = ({ item: issue }) => (
    <ListItem
      title={issue.title}
      subtitle={
        <View>
          <Text>{issue.descr}</Text>
        </View>
      }
      onPress={() => navigation.navigate('Details', { projectId: project.id, issue })}
      bottomDivider
      chevron
    />
  )

  const filteredIssuesList = useMemo(() => {
    const searchRegex = search && new RegExp(`${search}`, "gi")
    return issuesList.filter(issue => 
      (!searchRegex || searchRegex.test(issue.title)) &&
      (filter !== 0 || !issue.completedOn) &&
      (filter !== 1 || issue.completedOn)
    )
  }, [search, issuesList, filter])

  if (loading) {
    return (<View><Text>Loading...</Text></View>)
  }

  return (
    <View>
      <Text>Issues for {project.title}</Text>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={key => setSearch(key)}
        value={search}
        lightTheme
      />
      <ButtonGroup
        onPress={filter => setFilter(filter)}
        selectedIndex={filter}
        buttons={['Incomplete', 'Completed', 'All']}
      />
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={filteredIssuesList}
        renderItem={renderIssues}
      />
      <Button
        title="New Issue"
        onPress={() => navigation.navigate('AddEditIssue', { projectId: project.id })}
      />
      <Button
        title="Categories"
        onPress={() => navigation.navigate('ManageCategories', { projectId: project.id })}
      />
      <Button
        title="Milestones"
        onPress={() => navigation.navigate('ManageMilestones', { projectId: project.id })}
      />
    </View>
  )
}
