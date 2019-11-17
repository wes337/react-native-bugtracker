import * as firebase from 'firebase'
import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Projects from './screens/Projects'
import Issues from './screens/Issues'
import Details from './screens/Details'
import AddProject from './screens/AddProject'
import AddIssue from './screens/AddIssue'
import ManageCategories from './screens/ManageCategories'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBewYA7cN0XjSSGcD8C_X5A6C35zVrKOCA",
  authDomain: "react-native-bugtracker.firebaseapp.com",
  databaseURL: "https://react-native-bugtracker.firebaseio.com",
  projectId: "react-native-bugtracker",
  storageBucket: "react-native-bugtracker.appspot.com",
  messagingSenderId: "769567494057",
  appId: "1:769567494057:web:985589cf0343dba09c3eb8"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const AppNavigator = createStackNavigator({
  Projects,
  Issues,
  Details,
  AddProject,
  AddIssue,
  ManageCategories,
},
{
  initialRouteName: 'Projects',
})

const AppContainer = createAppContainer(AppNavigator)

export default function App() {
  return (
    <AppContainer />
  )
}
