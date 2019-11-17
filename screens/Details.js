import React from 'react'
import { View, Text } from 'react-native'

DetailsScreen.navigationOptions = {
  title: 'Details',
}

export default function DetailsScreen({ route, navigation }) {
  // const place = navigation.getParam('item', {
  //   latitude: 0,
  //   longtitude: 0,
  //   title: '',
  //   key: '',
  // })
  return (
  <View>
    <Text>Details</Text>
  </View>
  )
}
