import * as firebase from 'firebase'
import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Button } from 'react-native'

AddProject.navigationOptions = {
  title: 'Add Project',
}

export default function AddProject({ route, navigation }) {
  const [loading, setLoading] = useState(false)
  const [projectTitle, setProjectTitle] = useState('')
  const [projectDescr, setProjectDescr] = useState('')
  
  const addProject = () => {
    setLoading(true)
    const project = {
      title: projectTitle,
      descr: projectDescr,
      createdAt: new Date(),
    }
    const projectsRef = firebase.database().ref('projects/')
    projectsRef.push({ ...project }, () => {
      setLoading(false)
      navigation.navigate('Projects')
    })
    .then(() => projectsRef.off())
  }

  if (loading) {
    return <View><Text>Loading...</Text></View>
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
