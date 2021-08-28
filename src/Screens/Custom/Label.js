import React from 'react'
import {
  Text
} from 'react-native'
import { Sizes } from '@dungdang/react-native-basic'

const Label = (props) => {
  return (
    <Text
      style={{
        color: 'black',
        paddingVertical: Sizes.s10,
        fontSize: Sizes.s30
      }}
    >{props.label}{props.isRequired ? <Text style={{color: 'red'}}> *</Text> : null}</Text>
  )
}

export default Label