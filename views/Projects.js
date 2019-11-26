import * as firebase from 'firebase'
import React, { useState, useEffect } from 'react'
import { View, Text, Button, FlatList, Alert } from 'react-native'
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
    <View style={{ borderColor: 'gray', borderWidth: 1, margin: 5, padding: 5 }}>
      <Text>{project.title}</Text>
      <Text>{project.descr}</Text>
      <Button title="Go" onPress={() => navigation.navigate('Issues', { project })} />
      <Button title="Delete" onPress={() => confirmRemove(project)} />
    </View>
  )

  if (loading) {
    return (<View><Text>Loading...</Text></View>)
  }

  return (
    <View>
      <Text>Projects</Text>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={projectList}
        renderItem={renderProjects}
      />
      <Button
        title="Add Project"
        onPress={() => navigation.navigate('AddProject')}
      />
    </View>
  )
}
