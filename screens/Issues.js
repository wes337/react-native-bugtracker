import * as firebase from 'firebase'
import React, { useState, useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'
import { Button, ListItem, ButtonGroup } from 'react-native-elements'

IssuesScreen.navigationOptions = {
  title: 'Issues',
}

export default function IssuesScreen({ route, navigation }) {
  const [loading, setLoading] = useState(false)
  const [issuesList, setIssuesList] = useState([])
  const [filteredIssuesList, setFilteredIssuesList] = useState([])
  const [filter, setFilter] = useState(0)

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
      filterList(0)
      setLoading(false)
    })
    return () => issuesRef.off()
  }, [])

  filterList = (filterBy) => {
    setFilter(filterBy)
    switch(filterBy) {
      case 0:
          setFilteredIssuesList(issuesList.filter(issue => !issue.completedOn))
        break
      case 1:
          setFilteredIssuesList(issuesList.filter(issue => issue.completedOn))
        break
      case 2:
          setFilteredIssuesList(issuesList)
          break
      default:
          setFilteredIssuesList(issuesList.filter(issue => !issue.completedOn))
          break
    }
  }

  renderIssues = ({ item: issue }) => (
    <ListItem
      title={issue.title}
      subtitle={
        <View>
          <Text>{issue.descr}</Text>
        </View>
      }
      onPress={() => navigation.navigate('Details', { project, issue })}
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
      <ButtonGroup
        onPress={filterBy => filterList(filterBy)}
        selectedIndex={filter}
        buttons={['Incomplete', 'Completed', 'All']}
      />
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={filteredIssuesList}
        renderItem={renderIssues}
      />
      <Button
        title="Add Issue"
        onPress={() => navigation.navigate('AddEditIssue', { project })}
      />
      <Button
        title="Manage Categories"
        onPress={() => navigation.navigate('ManageCategories', { projectId: project.id })}
      />
    </View>
  )
}
