import React from 'react'
import styled from 'styled-components'
const Title = styled.h1`
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  margin: 50px 0 20px 0;
`
export default function Header() {
  return (
    <Title>24 WeatherApp</Title>
  )
}
