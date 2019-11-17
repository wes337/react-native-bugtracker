import React, { useState, useEffect } from 'react'
import { View, Text, Button, FlatList, ListItem } from 'react-native'

ProjectsScreen.navigationOptions = {
  title: 'Projects',
}

export default function ProjectsScreen({ route, navigation }) {
  const [projectList, setProjectList] = useState([])
  
  renderItem = ({ item }) => (
    <ListItem title={item.title} />
  )

  return (
    <View>
      <Text>Projects</Text>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={projectList}
        renderItem={this.renderItem}
      />
      <Button
        title="Add Project"
        onPress={() => navigation.navigate('CreateProject', { addProject })}
      />
    </View>
  )
}
