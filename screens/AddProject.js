import * as firebase from 'firebase'
import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Button } from 'react-native'

AddProject.navigationOptions = {
  title: 'Add Project',
}

export default function AddProject({ route, navigation }) {
  const [projectTitle, setProjectTitle] = useState('')
  const [projectDescr, setProjectDescr] = useState('')
  
  const addProject = () => {
    const project = {
      title: projectTitle,
      descr: projectDescr,
      createdAt: new Date(),
    }
    firebase.database().ref('projects/').push(
      { ...project }
    )
    navigation.navigate('Projects')
  }

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
        onPress={addProject}
      />
    </View>
  )
}
