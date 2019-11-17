import React from 'react'
import { View, Text, Button } from 'react-native'
import { Project } from '../projects/Projects'

ProjectsScreen.navigationOptions = {
  title: 'Projects',
}

export default function ProjectsScreen({ route, navigation }) {
  // onPress={() => navigation.navigate('Map', { item })}
  // const place = navigation.getParam('item', {
  //   latitude: 0,
  //   longtitude: 0,
  //   title: '',
  //   key: '',
  // })
  newProject = () => {
    const project = new Project({
      title: 'test',
      createdAt: new Date(),
    })
    console.log(project)
  }
  return (
  <View>
    <Text>Projects</Text>
    <Button
      title="Press me"
      onPress={() => newProject()}
    />
  </View>
  )
}
