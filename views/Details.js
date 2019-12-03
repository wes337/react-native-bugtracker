import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Text, Button, CheckBox, Container, Content, Label, Header, Title, Subtitle, Textarea, Footer, FooterTab, Form, Item, Icon, Left, Right, Body } from 'native-base'
import { getIssue, updateIssue, removeIssue } from '../models/Issue'
import { getCategory } from '../models/Category'
import { getMilestone } from '../models/Milestone'
import AppLoading from './AppLoading'

DetailsScreen.navigationOptions = {
  title: 'Details',
}

export default function DetailsScreen({ route, navigation }) {
  const [loading, setLoading] = useState(true)
  const [issue, setIssue] = useState({})
  const [completedOn, setCompletedOn] = useState(false)
  const [category, setCategory] = useState(null)
  const [milestone, setMilestone] = useState(null)
  const { id } = navigation.getParam('issue')
  const projectId = navigation.getParam('projectId')

  useEffect(() => {
    Promise.resolve(getIssue(projectId, id)).then(issue => {
      setIssue(issue)
      setCompletedOn(issue.completedOn || false)
      Promise.all([
        getCategory(projectId, issue.category),
        getMilestone(projectId, issue.milestone)
      ])
        .then(([category, milestone]) => {
          setCategory(category)
          setMilestone(milestone)
          setLoading(false)
        })
    })
  }, [])

  useEffect(() => {
    setLoading(true)
    Promise.resolve(updateIssue({ ...issue, id, completedOn })).then(() =>
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
    return <AppLoading />
  }

  return (
  <Container>
    <Header>
      <Left />
      <Body>
        <Title>{issue.title}</Title>
        <Subtitle>{category ? category.name : 'No category'}</Subtitle>
      </Body>
      <Right />
    </Header>
    <Content>
      <Form>
        <Item stackedLabel>
          <Label>Description</Label>
          <Textarea
            placeholder={issue.descr}
            style={{ fontSize: 18 }}
            placeholderTextColor="black"
            rowSpan={4}
            disabled={true}
          />
        </Item>
        {milestone &&
          <Item stackedLabel>
            <Label>Milestone</Label>
            <Text style={{ fontSize: 18 }}>{milestone.name}</Text>
          </Item>}
        {issue.dueDate &&
          <Item stackedLabel>
            <Label>Deadline</Label>
            <Text style={{ fontSize: 18 }}>{issue.dueDate.toString()}</Text>
          </Item>}
        <Item stackedLabel>
          <Label>Importance</Label>
          <Text style={{ fontSize: 18 }}>{issue.importance}</Text>
        </Item>
        <Item stackedLabel>
          <Label>Completed</Label>
          <View style={{ flexDirection: 'row' }}>
            <CheckBox
                style={{ marginRight: 20 }}
                checked={completedOn ? true : false}
                onPress={() => setCompletedOn(completedOn ? false : new Date())}
            />
            <Text style={{ fontSize: 18 }}>{completedOn ? `Completed on ${completedOn ? completedOn.toString() : ''}` : ''}</Text>
          </View>
        </Item>
      </Form>
    </Content>
    <Footer>
      <FooterTab>
        <Button onPress={() => this.removeIssue()}>
          <Icon name="ios-trash" />
          <Text>Remove</Text>
        </Button>
        <Button onPress={() => navigation.navigate('AddEditIssue', { projectId, issue: { id, ...issue } })}>
          <Icon name="ios-create" />
          <Text>Edit</Text>
        </Button>
      </FooterTab>
    </Footer>
  </Container>
  )
}
