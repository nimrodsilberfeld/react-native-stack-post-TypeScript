import React, { useContext } from "react"
import { Text } from 'react-native'
import {colors} from "../constans/colors"
import { ThemeContext } from "../utils/ThemeProvider"
export const MyText = (props:any) => {
    const { state,dispatch } = useContext(ThemeContext)

    return <Text {...props} style={[{ fontFamily: "Ubuntu_400Regular", color: colors('text', state.darkTheme) }, props.style]}>{props.children}</Text>
}