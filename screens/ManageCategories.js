import * as firebase from 'firebase'
import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Button, FlatList } from 'react-native'
import { Input, ListItem } from 'react-native-elements'
import ColorPicker from 'simple-react-native-color-picker'

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
    const color = colorRef.current.getColorSelected() || 'black'
    const categoriesRef = firebase.database().ref(`projects/${projectId}/categories/`)
    categoriesRef.push({ ...category, color }, () => {
      setLoading(false)
    }).then(() => setCategory({}))
  }

  removeCategory = categoryId => {
    setLoading(true)
    const removeCategory = firebase.database().ref(`projects/${projectId}/categories/${categoryId}`);
    removeCategory.remove(() => {
      setLoading(false)
    })
  }

  renderCategories = ({ item }) => (
    <ListItem
      title={item.name}
      titleStyle={{ color: item.color || 'black' }}
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
      <View>
        <FlatList
          keyExtractor={item => item.id.toString()}
          data={categoryList}
          renderItem={renderCategories}
        />
      </View>
      <View>
        <Input
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={name => setCategory({ ...category, name })}
          value={category.name}
        />
        <Text>Color</Text>
        <ColorPicker colors={['blue', 'red', 'green', 'yellow', 'gray']}  ref={colorRef} />
      </View>
      <Button
        title="Submit"
        onPress={addCategory}
      />
    </View>
  )
}
