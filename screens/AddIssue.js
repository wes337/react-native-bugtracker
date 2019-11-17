import * as firebase from 'firebase'
import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Button } from 'react-native'

AddIssue.navigationOptions = {
  title: 'Add Issue',
}

export default function AddIssue({ route, navigation }) {
  const [issue, setIssue] = useState({
    title: '',
    descr: '',
    category: '',
    dueDate: '',
    importance: 0,
    completedOn: '',
  })

  const project = navigation.getParam('project', {
    id: '',
    title: '',
    descr: '',
  })
  
  const addIssue = () => {
    const newIssue = {
      ...issue,
      projectId: project.id,
      createdAt: new Date(),
    }
    firebase.database().ref('issues/' + project.id).push(
      { ...newIssue }
    )
    navigation.navigate('Issues')
  }

  return (
    <View>
      <Text>Add Issue to {project.title}</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={title => setIssue({ ...issue, title })}
        value={issue.title}
      />
      <TextInput
        multiline
        numberOfLines={4}
        style={{ height: 150, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={descr => setIssue({ ...issue, descr })}
        value={issue.descr}
      />
      <Button
        title="Submit"
        onPress={addIssue}
      />
    </View>
  )
}
