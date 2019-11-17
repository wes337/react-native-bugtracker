import * as firebase from 'firebase'
import React, { useState, useEffect } from 'react'
import { View, Text, Button, FlatList } from 'react-native'

ProjectsScreen.navigationOptions = {
  title: 'Projects',
}

export default function ProjectsScreen({ route, navigation }) {
  const [loading, setLoading] = useState(false)
  const [projectList, setProjectList] = useState([])

  useEffect(() => {
    setLoading(true)
    firebase.database().ref('projects/').on('value', snapshot => {
      const data = snapshot.val()
      const projects = []
      data && Object.keys(data) && Object.keys(data).map(
        id => projects.push({ id, ...data[id] })
      )
      setProjectList(projects)
      setLoading(false)
    })
  }, [])

  removeProject = (projectId) => {
    setLoading(true)
    const removeProject = firebase.database().ref(`projects/${projectId}`);
    removeProject.remove()
      .then(() => {
        setLoading(false)
      })
      .catch(err => {
        Alert.alert("Remove failed: " + error.message)
        setLoading(false)
      })
  }

  renderProjects = ({ item: project }) => (
    <View style={{ borderColor: 'gray', borderWidth: 1, margin: 5, padding: 5 }}>
      <Text>{project.title}</Text>
      <Text>{project.descr}</Text>
      <Button title="Go" onPress={() => navigation.navigate('Issues', { project })} />
      <Button title="Delete" onPress={() => removeProject(project.id)} />
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
