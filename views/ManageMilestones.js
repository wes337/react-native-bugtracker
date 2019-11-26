import * as firebase from 'firebase'
import React, { useState, useEffect, useRef, useMemo } from 'react'
import { View, Text, Button, FlatList } from 'react-native'
import { Input, ListItem } from 'react-native-elements'
import { addMilestone, removeMilestone } from '../models/MilestoneDAO'

ManageMilestones.navigationOptions = {
  title: 'Milestones',
}

export default function ManageMilestones({ route, navigation }) {
  const [loading, setLoading] = useState(false)
  const [milestone, setMilestone] = useState({})
  const [milestoneList, setMilestoneList] = useState([])
  const projectId = navigation.getParam('projectId')
  
  useState(() => {
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
  },[])

  this.addMilestone = () => {
    setLoading(true)
    Promise.resolve(addMilestone(projectId, milestone)).then(() => {
      setLoading(false)
      setMilestone({})
    })
  }

  this.removeMilestone = milestoneId => {
    setLoading(true)
    Promise.resolve(removeMilestone(projectId, milestoneId)).then(() =>
      setLoading(false)
    )
  }

  renderMilestones = ({ item }) => (
    <ListItem
      title={item.name}
      rightElement={
        <View>
          <Button title="Remove" onPress={() => this.removeMilestone(item.id)} />
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
        onPress={this.addMilestone}
      />
    </View>
  )
}
