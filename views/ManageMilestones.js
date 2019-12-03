import * as firebase from 'firebase'
import React, { useState } from 'react'
import {
  Content,
  Container,
  Header,
  Title,
  Form,
  Item,
  Button,
  Text,
  List,
  ListItem,
  Input,
  Left,
  Right,
  Icon,
} from 'native-base'
import { addMilestone, removeMilestone } from '../models/Milestone'
import AppLoading from './AppLoading'

ManageMilestones.navigationOptions = {
  title: 'Milestones',
}

export default function ManageMilestones({ route, navigation }) {
  const [loading, setLoading] = useState(false)
  const [milestone, setMilestone] = useState({})
  const [milestoneList, setMilestoneList] = useState([])
  const projectId = navigation.getParam('projectId')
  
  useState(() => {
    const milestonesRef = firebase.database().ref(`projects/${projectId}/milestones/`)
    milestonesRef.on('value', snapshot => {
      const data = snapshot.val()
      const milestones = []
      data && Object.keys(data) && Object.keys(data).map(
        id => milestones.push({ id, ...data[id] })
      )
      setMilestoneList(milestones)
      setLoading(false)
    })
    return () => milestonesRef.off()
  },[])

  this.addMilestone = () => {
    setLoading(true)
    Promise.resolve(addMilestone(projectId, milestone)).then(() => {
      setLoading(false)
      setMilestone({})
    })
  }

  this.removeMilestone = milestoneId => {
    setLoading(true)
    Promise.resolve(removeMilestone(projectId, milestoneId)).then(() =>
      setLoading(false)
    )
  }

  renderMilestones = milestone => (
    <ListItem onPress={() => navigation.navigate('MilestoneDetails', { projectId, milestone })}>
      <Left><Text>{milestone.name}</Text></Left>
      <Right>
        <Button danger transparent>
          <Icon name="ios-trash" onPress={() => this.removeMilestone(milestone.id)} />
        </Button>
      </Right>
    </ListItem>
  )

  if (loading) {
    return <AppLoading />
  }

  return (
    <Container>
      <Header>
        <Title>Milestones</Title>
      </Header>
      <Content padder>
        <List
          keyExtractor={item => item.id.toString()}
          dataArray={milestoneList}
          renderRow={renderMilestones}
        />
        <Form style={{ marginTop: 30 }}>
          <Item>
            <Input
              placeholder="New milestone name..."
              onChangeText={name => setMilestone({ ...milestone, name })}
              value={milestone.name}
            />
          </Item>
        </Form>
        <Button iconLeft block bordered onPress={this.addMilestone} style={{ marginVertical: 10 }}>
          <Icon name="ios-add" />
          <Text>New Milestone</Text>
        </Button>
      </Content>
    </Container>
  )
}
