import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Button } from 'react-native'

CreateProjectScreen.navigationOptions = {
  title: 'Add Project',
}

export default function CreateProjectScreen({ route, navigation }) {
  const [projectTitle, setProjectTitle] = useState('')
  const [projectDescr, setProjectDescr] = useState('')
  const addProject = navigation.getParam('addProject', {})
  return (
  <View>
    <Text>Add Project</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => setProjectTitle(text)}
      value={projectTitle}
    />
    <TextInput
      multiline
      numberOfLines={4}
      style={{ height: 150, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => setProjectDescr(text)}
      value={projectDescr}
    />
    <Button
      title="Submit"
      onPress={() => addProject(projectTitle, projectDescr)}
    />
  </View>
  )
}
