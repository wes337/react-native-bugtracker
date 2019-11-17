import * as firebase from 'firebase'
import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Button, FlatList } from 'react-native'
import { Input, ListItem } from 'react-native-elements'

ManageCategories.navigationOptions = {
  title: 'Categories',
}

export default function ManageCategories({ route, navigation }) {
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState({
    name: '',
    color: '',
  })
  const [categoryList, setCategoryList] = useState('')
  const projectId = navigation.getParam('projectId')
  
  useEffect(() => {
    setLoading(true)
    const categoriesRef = firebase.database().ref(`projects/${projectId}/categories/`)
    categoriesRef.on('value', snapshot => {
      const data = snapshot.val()
      const categories = []
      data && Object.keys(data) && Object.keys(data).map(
        id => categories.push({ id, ...data[id] })
      )
      setCategoryList(categories)
      setLoading(false)
    })
    return () => categoriesRef.off()
  }, [])

  addCategory = () => {
    setLoading(true)
    const categoriesRef = firebase.database().ref(`projects/${projectId}/categories/`)
    categoriesRef.push({ ...category }, () => {
      setLoading(false)
    })
    navigation.navigate('Categories')
  }

  removeCategory = (categoryId) => {
    setLoading(true)
    const removeCategory = firebase.database().ref(`projects/${projectId}/categories/${categoryId}`);
    removeCategory.remove(() => {
      setLoading(false)
    })
  }

  renderCategories = ({ item }) => (
    <ListItem
      title={item.name}
      titleStyle={{ color: item.color }}
      rightElement={
        <View>
          <Button title="Remove" onPress={() => removeCategory(item.id)} />
        </View>
      }
      bottomDivider
    />
  )

  if (loading) {
    return <View><Text>Loading...</Text></View>
  }

  return (
    <View>
      <Text>Categories</Text>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={categoryList}
        renderItem={renderCategories}
      />
      <Input
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={name => setCategory({ ...category, name })}
        value={category.name}
      />
      <Input
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={color => setCategory({ ...category, color })}
        value={category.color}
      />
      <Button
        title="Submit"
        onPress={addCategory}
      />
    </View>
  )
}
