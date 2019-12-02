import React, { useState, useEffect } from 'react'
import { View, FlatList } from 'react-native'
import { Text, ListItem } from 'react-native-elements'
import * as Progress from 'react-native-progress'
import { getMilestone, getMilestoneIssues } from '../models/MilestoneDAO'
import AppLoading from './AppLoading'

DetailsScreen.navigationOptions = {
  title: 'Milestone Details',
}

export default function DetailsScreen({ route, navigation }) {
  const [loading, setLoading] = useState(true)
  const [issueList, setIssueList] = useState([])
  const [completedIssuesCount, setCompletedIssuesCount] = useState(0)
  const [milestone, setMilestone] = useState(null)
  const { id } = navigation.getParam('milestone')
  const projectId = navigation.getParam('projectId')

  useEffect(() => {
    Promise.all([
      getMilestone(projectId, id),
      getMilestoneIssues(projectId, id)
    ]).then(([milestone, issues]) => {
      setMilestone(milestone)
      setIssueList(issues)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    issueList.map(issue => {
      issue.completedOn && setCompletedIssuesCount(completedIssuesCount + 1)
    })
  }, [issueList])

  renderIssues = ({ item: issue }) => (
    <ListItem
      title={issue.title}
      subtitle={
        <View>
          <Text>{issue.descr}</Text>
        </View>
      }
      onPress={() => navigation.navigate('Details', { projectId, issue })}
      bottomDivider
      chevron
      checkmark={issue.completedOn ? true : false}
    />
  )

  if (loading) {
    return <AppLoading />
  }

  return (
  <View>
    <Text h2>{milestone.name}</Text>
    {issueList.length > 0
      ? <>
          <Text>{(completedIssuesCount / issueList.length * 100).toFixed(0)}% Completed</Text>
          <Progress.Bar progress={completedIssuesCount / issueList.length} width={null} />
          <FlatList
            keyExtractor={item => item.id.toString()}
            data={issueList}
            renderItem={renderIssues}
          />
        </>
      : <Text>No issues for {milestone.name}.</Text>
    }

  </View>
  )
}
