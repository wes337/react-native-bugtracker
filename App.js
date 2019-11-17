import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Projects from './screens/Projects'
import Issues from './screens/Issues'
import Details from './screens/Details'
import CreateProject from './screens/Create-project'

const AppNavigator = createStackNavigator({
  Projects,
  Issues,
  Details,
  CreateProject,
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
