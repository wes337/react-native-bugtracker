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

  const renderItem = ({ item }) => (
    <View style={{ borderColor: 'gray', borderWidth: 1, margin: 5, padding: 5 }}>
      <Text>{item.title}</Text>
      <Text>{item.descr}</Text>
      <Button title="Go" />
      <Button title="Delete" />
    </View>
  )

  return (
    <View>
      <Text>Projects</Text>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={projectList}
        renderItem={renderItem}
      />
      <Button
        title="Add Project"
        onPress={() => navigation.navigate('AddProject')}
      />
    </View>
  )
}
