import * as firebase from 'firebase'
import React, { useState, useEffect, useMemo } from 'react'
import {
  Container,
  Header,
  Footer,
  FooterTab,
  Left,
  Body,
  Content,
  Segment,
  Right,
  Button,
  Icon,
  Title,
  Text,
  Item,
  Input,
  List,
  ListItem,
 } from 'native-base'
 import AppLoading from './AppLoading'

IssuesScreen.navigationOptions = {
  title: 'Issues',
}

export default function IssuesScreen({ route, navigation }) {
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showSearchBar, setShowSearchBar] = useState(false)
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

  renderIssues = issue => (
    <ListItem onPress={() => navigation.navigate('Details', { projectId: project.id, issue })}>
      <Left><Text>{issue.title}</Text></Left>
      <Body><Text>{issue.descr.length >= 30 ? issue.descr.substr(0, 30).concat('...') : issue.descr}</Text></Body>
      <Right><Icon name="ios-arrow-forward" /></Right>
    </ListItem>
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
    return <AppLoading />
  }

  return (
    <Container>
      <Header>
        <Left>
          {showSearchBar
          ? <Item rounded>
            <Icon name="ios-search" style={{ color: '#b5b5b5' }} />
            <Input placeholder="Search" onChangeText={key => setSearch(key)} value={search} style={{ height: 24 }} />
          </Item>
          : <Title>{project.title}</Title>
        }
        </Left>
          <Button transparent>
            <Icon name={showSearchBar ? 'md-close' : 'ios-search'} onPress={() => setShowSearchBar(!showSearchBar)} />
          </Button>
      </Header>
      <Segment>
        <Button first active={filter === 0}>
          <Text onPress={() => setFilter(0)}>Incomplete</Text>
        </Button>
        <Button active={filter === 1}>
          <Text onPress={() => setFilter(1)}>Complete</Text>
        </Button>
        <Button last active={filter === 2}>
          <Text onPress={() => setFilter(2)}>All</Text>
        </Button>
      </Segment>
      <Content padder>
        <List
          keyExtractor={issue => issue.id.toString()}
          dataArray={filteredIssuesList}
          renderRow={renderIssues}
        />
        <Button block bordered onPress={() => navigation.navigate('AddEditIssue', { projectId: project.id })} style={{ marginVertical: 10 }}>
          <Icon name="ios-add" />
          <Text>New Issue</Text>
        </Button>
      </Content>
      <Footer>
        <FooterTab>
          <Button full onPress={() => navigation.navigate('ManageCategories', { projectId: project.id })}>
            <Icon name="ios-apps" />
            <Text>Categories</Text>
          </Button>
          <Button full onPress={() => navigation.navigate('ManageMilestones', { projectId: project.id })}>
            <Icon name="ios-rocket" />
            <Text>Milestones</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  )
}
