import React from 'react'
import { View, Text, Button } from 'react-native'

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
