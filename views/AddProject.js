import React, { useState } from 'react'
import { Container, Content, Form, Item, Input, Text, Textarea, Button } from 'native-base'
import { addProject } from '../models/ProjectDAO'
import AppLoading from './AppLoading'

AddProject.navigationOptions = {
  title: 'Add Project',
}

export default function AddProject({ route, navigation }) {
  const [loading, setLoading] = useState(false)
  const [projectTitle, setProjectTitle] = useState('')
  const [projectDescr, setProjectDescr] = useState('')
  
  this.addProject = () => {
    setLoading(true)
    const project = {
      title: projectTitle,
      descr: projectDescr,
      createdAt: new Date(),
    }
    Promise.resolve(addProject(project)).then(() => {
      setLoading(false)
      navigation.navigate('Projects')
    })
  }

  if (loading) {
    return <AppLoading />
  }

  return (
    <Container>
      <Content padder>
        <Form>
          <Item>
            <Input
              placeholder="Title"
              onChangeText={text => setProjectTitle(text)}
              value={projectTitle}
            />
          </Item>
          <Item last>
            <Textarea
              placeholder="Write a short description of the project."
              rowSpan={4}
              onChangeText={text => setProjectDescr(text)}
              value={projectDescr}
              style={{ width: '100%' }}
            />
          </Item>
        </Form>
        <Button block onPress={this.addProject} style={{ marginVertical: 10 }}>
          <Text>Submit</Text>
        </Button>
      </Content>
    </Container>
  )
}
