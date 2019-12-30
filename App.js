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

// Initialize Firebase
firebase.initializeApp(process.env.firebaseConfig)

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
