import * as firebase from 'firebase'
import React, { useState, useEffect } from 'react'
import { View, Picker } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { Text, Input, Button, Slider } from 'react-native-elements'

AddIssue.navigationOptions = {
  title: 'Add Issue',
}

export default function AddIssue({ route, navigation }) {
  const project = navigation.getParam('project')
  const editIssue = navigation.getParam('issue')
  const [loading, setLoading] = useState(false)
  const [categoriesList, setCategoriesList] = useState([])
  const [issue, setIssue] = useState({
    title: editIssue && editIssue.title || '',
    descr: editIssue && editIssue.descr || '',
    category: editIssue && editIssue.category || null,
    dueDate: editIssue && editIssue.dueDate || new Date(),
    importance: editIssue && editIssue.importance || 3,
    completedOn: editIssue && editIssue.completedOn || null,
  })

  useEffect(() => {
    setLoading(true)
    const categoriesRef = firebase.database().ref(`projects/${project.id}/categories/`)
    categoriesRef.on('value', snapshot => {
      const data = snapshot.val()
      const categories = []
      data && Object.keys(data) && Object.keys(data).map(
        id => categories.push({ id, ...data[id] })
      )
      setCategoriesList(categories)
      setLoading(false)
    })
    return () => categoriesRef.off()
  }, [])
  
  addIssue = () => {
    setLoading(true)
    const newIssue = {
      ...issue,
      projectId: project.id,
      createdAt: new Date(),
    }
    const issueRef = firebase.database().ref(`issues/${project.id}/`)
    issueRef.push({ ...newIssue }, () => {
      setLoading(false)
      navigation.navigate('Issues')
    })
  }

  updateIssue = () => {
    setLoading(true)
    const issueRef = firebase.database().ref(`issues/${project.id}/${editIssue.id}`)
    issueRef.update({ ...issue }, () => {
      setLoading(false)
      navigation.navigate('Issues')
    })
  }

  const ItemPicker = ({item, itemList}) => (
    <Picker
      selectedValue={issue[item]}
      onValueChange={itemValue => setIssue({ ...issue, [item]: itemValue })}
    >
      {itemList.map(item => (
        <Picker.Item label={item.name} value={item.id} key={item.id} />
      ))}
      <Picker.Item label="None" value={null} />
    </Picker>
  )

  if (loading) {
    return <View><Text>Loading...</Text></View>
  }

  return (
    <View>
      <Text h3>{editIssue ? 'Edit' : 'Add'} Issue in {project.title}</Text>
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
        onValueChange={importance => setIssue({ ...issue, importance: Math.round(importance) })}
        minimumValue={1}
        maximumValue={5}
      />
      <ItemPicker item="category" itemList={categoriesList} />
      <Text>Importance: {issue.importance}</Text>
      <Button
        title={editIssue ? 'Update' : 'Submit'}
        onPress={editIssue ? updateIssue : addIssue}
      />
    </View>
  )
}
