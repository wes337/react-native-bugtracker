import * as firebase from 'firebase'
import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Button } from 'react-native'

AddIssue.navigationOptions = {
  title: 'Add Issue',
}

export default function AddIssue({ route, navigation }) {
  const [issueTitle, setIssueTitle] = useState('')

  const project = navigation.getParam('project', {
    id: '',
    title: '',
    descr: '',
  })
  
  const addIssue = () => {
    const newIssue = {
      title: issueTitle,
      projectId: project.id,
    }
    firebase.database().ref('issues/' + project.id).push(
      { ...newIssue }
    )
    navigation.navigate('Issues')
  }

  return (
    <View>
      <Text>Add Issue to Project</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setIssueTitle(text)}
        value={issueTitle}
      />
      <Button
        title="Submit"
        onPress={addIssue}
      />
    </View>
  )
}
