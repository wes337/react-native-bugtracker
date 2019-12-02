import * as firebase from 'firebase'
import React, { useState, useEffect } from 'react'
import { FlatList, Alert } from 'react-native'
import { Container, Content, Button, Text, Card, CardItem, Body, Icon, Left, Right, H3 } from 'native-base'
import AppLoading from './AppLoading'
import { removeProject } from '../models/ProjectDAO'

ProjectsScreen.navigationOptions = {
  title: 'Projects',
}

export default function ProjectsScreen({ route, navigation }) {
  const [loading, setLoading] = useState(true)
  const [projectList, setProjectList] = useState([])

  useEffect(() => {
    const projectsRef = firebase.database().ref('projects/')
    projectsRef.on('value', snapshot => {
      const data = snapshot.val()
      const projects = []
      data && Object.keys(data) && Object.keys(data).map(
        id => projects.push({ id, ...data[id] })
      )
      setProjectList(projects)
      setLoading(false)
    })
    return () => projectsRef.off()
  }, [])

  confirmRemove = project => {
    Alert.alert(
      `Remove ${project.title}?`,
      `This will delete the project ${project.title} and all connected issues. Are you sure?`,
      [{
        text: 'Cancel',
        onPress: () => { return },
        style: 'cancel',
      },
      {text: 'OK', onPress: () => this.removeProject(project.id)}],
      {cancelable: true},
    )
  }

  this.removeProject = projectId => {
    setLoading(true)
    Promise.resolve(removeProject(projectId)).then(() =>
      setLoading(false)
    )
  }

  renderProjects = ({ item: project }) => (
    <Card>
      <CardItem header bordered button onPress={() => navigation.navigate('Issues', { project })}>
        <Left>
          <H3 style={{ color: '#007aff' }}>{project.title}</H3>
        </Left>
        <Right>
          <Button danger transparent>
            <Icon name="ios-trash" onPress={() => confirmRemove(project)} />
          </Button>
        </Right>
      </CardItem>
      <CardItem>
        <Body>
          <Text>{project.descr}</Text>
        </Body>
      </CardItem>
    </Card>
  )

  if (loading) {
    return <AppLoading />
  }

  return (
    <Container>
      <Content padder>
        <FlatList
          keyExtractor={item => item.id.toString()}
          data={projectList}
          renderItem={renderProjects}
        />
        <Button block bordered onPress={() => navigation.navigate('AddProject')} style={{ marginVertical: 10 }}>
          <Icon name="ios-add" />
          <Text>Add Project</Text>
        </Button>
      </Content>
    </Container>
  )
}
