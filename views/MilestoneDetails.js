import React, { useState, useEffect } from 'react'
import {
  Body,
  Content,
  Container,
  Text,
  List,
  ListItem,
  Left,
  Right,
  Icon,
  H2,
} from 'native-base'
import * as Progress from 'react-native-progress'
import { getMilestone, getMilestoneIssues } from '../models/Milestone'
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

  renderIssues = issue => (
    <ListItem onPress={() => navigation.navigate('Details', { projectId, issue })}>
      <Left>
        <Text>{issue.title}</Text>
        {issue.completedOn && <Icon name="ios-checkmark" style={{ color: '#5cb85c', marginHorizontal: 10 }} />} 
      </Left>
      <Body><Text>{issue.descr.length >= 30 ? issue.descr.substr(0, 30).concat('...') : issue.descr}</Text></Body>
      <Right>
        <Icon name="ios-arrow-forward" />
      </Right>
    </ListItem>
  )

  if (loading) {
    return <AppLoading />
  }

  return (
  <Container>
    <Content padder>
    <H2 style={{ textAlign: 'center', marginBottom: 5 }}>{milestone.name}</H2>
    {issueList.length > 0
      ? <>
          <Text style={{ textAlign: 'center', marginTop: 5, marginBottom: 10 }}>{(completedIssuesCount / issueList.length * 100).toFixed(0)}% Completed</Text>
          <Progress.Bar progress={completedIssuesCount / issueList.length} width={null} />
          <List
            keyExtractor={item => item.id.toString()}
            dataArray={issueList}
            renderRow={renderIssues}
          />
        </>
      : <Text style={{ textAlign: 'center', marginVertical: 15 }}>No issues for {milestone.name}.</Text>
    }
    </Content>
  </Container>
  )
}
