import * as firebase from 'firebase'
import React, { useState, useEffect, useRef } from 'react'
import {
  Container,
  Header,
  Footer,
  FooterTab,
  Left,
  Body,
  Content,
  Segment,
  Right,
  Button,
  Icon,
  Title,
  Text,
  Item,
  Input,
  List,
  ListItem,
  Form,
  Label,
 } from 'native-base'
import ColorPicker from 'simple-react-native-color-picker'
import { addCategory, removeCategory } from '../models/Category'
import AppLoading from './AppLoading'

ManageCategories.navigationOptions = {
  title: 'Categories',
}

export default function ManageCategories({ route, navigation }) {
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState({})
  const [categoryList, setCategoryList] = useState('')
  const projectId = navigation.getParam('projectId')
  const colorRef = useRef(null)
  
  useEffect(() => {
    const categoriesRef = firebase.database().ref(`projects/${projectId}/categories/`)
    categoriesRef.on('value', snapshot => {
      const categories = []
      const data = snapshot.val()
      data && Object.keys(data) && Object.keys(data).map(
        id => categories.push({ id, ...data[id] })
      )
      setCategoryList(categories)
      setLoading(false)
    })
      return () => categoriesRef.off()
  }, [])

  this.addCategory = () => {
    setLoading(true)
    const color = colorRef.current.getColorSelected() || 'black'
    Promise.resolve(addCategory(projectId, { ...category, color }))
      .then(() => {
        setLoading(false)
        setCategory({})
      })
  }

  this.removeCategory = categoryId => {
    setLoading(true)
    Promise.resolve(removeCategory(projectId, categoryId)).then(() =>
      setLoading(false)
    )
  }

  renderCategories = item => (
    <ListItem>
      <Left><Text style={{ color: item.color || 'black' }}>{item.name}</Text></Left>
      <Right>
        <Button small danger transparent onPress={() => this.removeCategory(item.id)}>
          <Icon name="ios-trash" />
        </Button>
      </Right>
    </ListItem>
  )

  if (loading) {
    return <AppLoading />
  }

  return (
    <Container>
      <Content padder>
        <List
          keyExtractor={item => item.id.toString()}
          dataArray={categoryList}
          renderRow={renderCategories}
        />
        <Form>
          <Item>
            <Input
              placeholder="New category name..."
              onChangeText={name => setCategory({ ...category, name })}
              value={category.name}
            />
          </Item>
          <Item stackedLabel last>
            <Label>Color</Label>
            <ColorPicker colors={['blue', 'red', 'green', 'yellow', 'gray', 'orange', 'teal']}  ref={colorRef} />
          </Item>
        </Form>
      <Button iconLeft block bordered onPress={this.addCategory} style={{ marginVertical: 10 }}>
        <Icon name="ios-add" />
        <Text>New Category</Text>
      </Button>
      </Content>
    </Container>
  )
}
