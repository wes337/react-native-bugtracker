import * as firebase from 'firebase'
import React, { useState, useEffect, useMemo } from 'react'
import { View } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { Text, Input, Button, Slider } from 'react-native-elements'
import { Container, Header, Content, Form, Item, Picker, Icon } from 'native-base'
import { getCategories } from '../models/CategoryDAO'
import { getMilestones } from '../models/MilestoneDAO'
import { addIssue, updateIssue } from '../models/IssueDAO'

AddIssue.navigationOptions = {
  title: 'Add Issue',
}

export default function AddIssue({ route, navigation }) {
  const project = navigation.getParam('project')
  const editIssue = navigation.getParam('issue')
  const [loading, setLoading] = useState(true)
  const [categoriesList, setCategoriesList] = useState([])
  const [milestoneList, setMilestoneList] = useState([])
  const [issue, setIssue] = useState({
    title: editIssue && editIssue.title || '',
    descr: editIssue && editIssue.descr || '',
    category: editIssue && editIssue.category || null,
    milestone: editIssue && editIssue.milestone || null,
    dueDate: editIssue && editIssue.dueDate || new Date(),
    importance: editIssue && editIssue.importance || 3,
    completedOn: editIssue && editIssue.completedOn || null,
  })

  useState(() => {
    setLoading(true)
    Promise.all([getCategories(project.id), getMilestones(project.id)])
      .then(([categories, milestones]) => {
        setCategoriesList(categories)
        setMilestoneList(milestones)
        setLoading(false)
      })
  }, [])
  
  this.addIssue = () => {
    setLoading(true)
    Promise.resolve(addIssue({
      ...issue,
      projectId: project.id,
      createdAt: new Date(),
    })).then(() => {
      setLoading(false)
      navigation.navigate('Issues')
    })
  }

  this.updateIssue = () => {
    setLoading(true)
    Promise.resolve(updateIssue({ ...issue,projectId: editIssue.projectId, id: editIssue.id})).then(() => {
      setLoading(false)
      navigation.navigate('Issues')
    })
  }

  const ItemPicker = ({item, itemList}) => (
    <Item picker>
      <Picker
        mode="dropdown"
        iosIcon={<Icon name="arrow-down" />}
        placeholder={issue[item] && issue[item].name || 'None'}
        placeholderStyle={{ color: "#bfc6ea" }}
        placeholderIconColor="#007aff"
        selectedValue={issue[item]}
        onValueChange={itemValue => setIssue({ ...issue, [item]: itemValue })}
      >
        {itemList.map(item => (
          <Picker.Item label={item.name} value={item.id} key={item.id} />
        ))}
        <Picker.Item label="None" value={null} />
      </Picker>
    </Item>
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
        format="DD-MM-YYYY"
        style={{ width: '100%' }}
      />
      <Text>Importance: {issue.importance}</Text>
      <Slider
        value={issue.importance}
        onValueChange={importance => setIssue({ ...issue, importance: Math.round(importance) })}
        minimumValue={1}
        maximumValue={5}
      />
      <ItemPicker item="category" itemList={categoriesList} />
      <ItemPicker item="milestone" itemList={milestoneList} />
      <Button
        title={editIssue ? 'Update' : 'Submit'}
        onPress={editIssue ? this.updateIssue : this.addIssue}
      />
    </View>
  )
}
