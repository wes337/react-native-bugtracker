import React from 'react'
import { Container, Content, H3, Spinner } from 'native-base'

export default function AppLoading() {
  return (
    <Container>
      <Content contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <H3>Loading...</H3>
        <Spinner />
      </Content>
    </Container>
  )
}