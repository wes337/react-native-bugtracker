import React, { useState} from 'react'
import {  Slider } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { Container, Header, Content, Form, Item, Picker, Icon, Title, Input, Text, Textarea, Button, Label } from 'native-base'
import { getProject } from '../models/Project'
import { getCategories } from '../models/Category'
import { getMilestones } from '../models/Milestone'
import { addIssue, updateIssue } from '../models/Issue'
import AppLoading from './AppLoading'

AddIssue.navigationOptions = {
  title: 'Add Issue',
}

export default function AddIssue({ route, navigation }) {
  const projectId = navigation.getParam('projectId')
  const editIssue = navigation.getParam('issue')
  const [loading, setLoading] = useState(true)
  const [categoriesList, setCategoriesList] = useState([])
  const [milestoneList, setMilestoneList] = useState([])
  const [projectTitle, setProjectTitle] = useState('')
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
    Promise.all([getCategories(projectId), getMilestones(projectId), getProject(projectId)])
      .then(([categories, milestones, project]) => {
        setCategoriesList(categories)
        setMilestoneList(milestones)
        setProjectTitle(project.title)
        setLoading(false)
      })
  }, [])
  
  this.addIssue = () => {
    setLoading(true)
    Promise.resolve(addIssue({
      ...issue,
      projectId,
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
        selectedValue={issue[item]}
        onValueChange={itemValue => setIssue({ ...issue, [item]: itemValue })}
        style={{ width: 350 }}
      >
        {itemList.map(item => (
          <Picker.Item label={item.name} value={item.id} key={item.id} />
        ))}
        <Picker.Item label="None" value={null} />
      </Picker>
    </Item>
  )

  if (loading) {
    return <AppLoading />
  }

  return (
    <Container>
      <Header>
        <Title>{editIssue ? 'Edit' : 'Add'} Issue to {projectTitle}</Title>
      </Header>
      <Content padder>
        <Form>
          <Item stackedLabel>
            <Label>Title</Label>
            <Input
              placeholder="Issue title"
              onChangeText={title => setIssue({ ...issue, title })}
              value={issue.title}
            />
          </Item>
          <Item stackedLabel>
            <Label>Description</Label>
            <Textarea
              placeholder="Write a short deescription of the issue."
              rowSpan={4}
              onChangeText={descr => setIssue({ ...issue, descr })}
              value={issue.descr}
              style={{ width: '100%', marginLeft: -20 }}
            />
          </Item>
          <Item stackedLabel>
            <Label>Deadline</Label>
            <DatePicker
              mode="date"
              placeholder="Select a date"
              date={issue.dueDate}
              onDateChange={dueDate => setIssue({ ...issue, dueDate })}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              format="DD-MM-YYYY"
              style={{ width: '100%' }}
              customStyles={{ dateInput: { borderWidth: 0 } }}
            />
          </Item>
          <Item stackedLabel>
            <Label>Importance: {issue.importance}</Label>
            <Slider
              value={issue.importance}
              onValueChange={importance => setIssue({ ...issue, importance: Math.round(importance) })}
              minimumValue={1}
              maximumValue={5}
              style={{ width: '100%' }}
            />
          </Item>
          <Item stackedLabel>
            <Label>Category</Label>
            <ItemPicker item="category" itemList={categoriesList} />
          </Item>
          <Item stackedLabel last>
            <Label>Milestone</Label>
            <ItemPicker item="milestone" itemList={milestoneList} />
          </Item>
        </Form>
      <Button block onPress={editIssue ? this.updateIssue : this.addIssue} style={{ marginVertical: 10 }}>
        <Text>{editIssue ? 'Update' : 'Submit'}</Text>
      </Button>
      </Content>
    </Container>
  )
}
