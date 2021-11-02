import React, { FC, useContext } from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import MainPage from '../screens/MainPage'
import {QuestionWeb} from '../screens/QuestionWeb'
import { MyText } from "../components/MyText"
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../utils/ThemeProvider'
import {colors} from '../constans/colors'
const MainStackNavigator = createNativeStackNavigator()

export const MainStack: FC = () => {
    const { state, dispatch } = useContext(ThemeContext)

    const toggleThemePress = () => {
        dispatch({ type: "CHANGE_THEME" })
    }

    return <MainStackNavigator.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: colors('primary', state.darkTheme)
            },
            headerTintColor: 'black',
            headerTitleAlign: "left",
            headerTitle: () => <MyText style={{ fontSize: 24, color: "#fff" }}>Stack' Post</MyText>,
            headerRight: () => <Ionicons color={"#fff"} name={state.darkTheme ? "moon-outline" : "sunny-outline"} size={24} onPress={toggleThemePress} />
        }}
    >
        <MainStackNavigator.Screen
            name="main"
            component={MainPage}
        />
        <MainStackNavigator.Screen name="question" component={QuestionWeb} />
    </MainStackNavigator.Navigator>
}


