import * as firebase from 'firebase'
import React, { useState } from 'react'
import { View} from 'react-native'
import DatePicker from 'react-native-datepicker'
import { Text, Input, Button, Slider } from 'react-native-elements'

AddIssue.navigationOptions = {
  title: 'Add Issue',
}

export default function AddIssue({ route, navigation }) {
  const [loading, setLoading] = useState(false)
  const [issue, setIssue] = useState({
    title: '',
    descr: '',
    category: '',
    dueDate: new Date(),
    importance: 3,
    completedOn: null,
  })

  const project = navigation.getParam('project')
  
  const addIssue = () => {
    setLoading(true)
    const newIssue = {
      ...issue,
      projectId: project.id,
      createdAt: new Date(),
    }
    const issueRef = firebase.database().ref('issues/' + project.id)
    issueRef.push({ ...newIssue }, () => {
      setLoading(false)
    })
    navigation.navigate('Issues')
  }

  if (loading) {
    return <View><Text>Loading...</Text></View>
  }

  return (
    <View>
      <Text h3>Add Issue to {project.title}</Text>
      <Input
        label="Title"
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={title => setIssue({ ...issue, title })}
        value={issue.title}
      />
      <Input
        label="Description"
        multiline
        numberOfLines={4}
        style={{ height: 150, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={descr => setIssue({ ...issue, descr })}
        value={issue.descr}
      />
      <DatePicker
        mode="date"
        date={issue.dueDate}
        onDateChange={dueDate => setIssue({ ...issue, dueDate })}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        placeholder="Due date"
        format="DD-MM-YYYY"
        style={{ width: '100%' }}
      />
      <Slider
        value={issue.importance}
        onValueChange={importance => setIssue({ ...issue, importance })}
        minimumValue={1}
        maximumValue={5}
      />
      <Text>Importance: {issue.importance}</Text>
      <Button
        title="Submit"
        onPress={addIssue}
      />
    </View>
  )
}
