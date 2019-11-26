import * as firebase from 'firebase'
import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Button, FlatList } from 'react-native'
import { Input, ListItem } from 'react-native-elements'

ManageMilestones.navigationOptions = {
  title: 'Milestones',
}

export default function ManageMilestones({ route, navigation }) {
  const [loading, setLoading] = useState(true)
  const [milestone, setMilestone] = useState({})
  const [milestoneList, setMilestoneList] = useState('')
  const projectId = navigation.getParam('projectId')
  
  useEffect(() => {
    const milestonesRef = firebase.database().ref(`projects/${projectId}/milestones/`)
    milestonesRef.on('value', snapshot => {
      const data = snapshot.val()
      const milestones = []
      data && Object.keys(data) && Object.keys(data).map(
        id => milestones.push({ id, ...data[id] })
      )
      setMilestoneList(milestones)
      setLoading(false)
    })
    return () => milestonesRef.off()
  }, [])

  addMilestone = () => {
    setLoading(true)
    const milestonesRef = firebase.database().ref(`projects/${projectId}/milestones/`)
    milestonesRef.push({ ...milestone }, () => {
      setLoading(false)
    }).then(() => setMilestone({}))
  }

  removeMilestone = categoryId => {
    setLoading(true)
    const removeMilestone = firebase.database().ref(`projects/${projectId}/milestones/${categoryId}`);
    removeMilestone.remove(() => {
      setLoading(false)
    })
  }

  renderMilestones = ({ item }) => (
    <ListItem
      title={item.name}
      rightElement={
        <View>
          <Button title="Remove" onPress={() => removeMilestone(item.id)} />
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
      <Text>Milestones</Text>
      <View>
        <FlatList
          keyExtractor={item => item.id.toString()}
          data={milestoneList}
          renderItem={renderMilestones}
        />
      </View>
      <View>
        <Input
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={name => setMilestone({ ...milestone, name })}
          value={milestone.name}
        />
      </View>
      <Button
        title="Submit"
        onPress={addMilestone}
      />
    </View>
  )
}
