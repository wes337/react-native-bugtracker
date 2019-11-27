import * as firebase from 'firebase'
import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Projects from './views/Projects'
import Issues from './views/Issues'
import Details from './views/Details'
import MilestoneDetails from './views/MilestoneDetails'
import AddProject from './views/AddProject'
import AddEditIssue from './views/AddEditIssue'
import ManageCategories from './views/ManageCategories'
import ManageMilestones from './views/ManageMilestones'

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
  MilestoneDetails,
  AddProject,
  AddEditIssue,
  ManageCategories,
  ManageMilestones,
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
