import React, { useContext, useEffect, useRef, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, FlatList, ListRenderItemInfo, Dimensions, SafeAreaView, Animated } from 'react-native'
import { sortDataByAnswers, sortDataByDate, sortDataByViews } from '../constans/sortingData'
import {QuestionLine} from './QuestionLine'
import { MyText } from "./MyText"
import {colors} from '../constans/colors'
import { ThemeContext } from '../utils/ThemeProvider'

interface Props {
    userInfo: any
}

export const QuestionsOverView: React.FC<Props> = ({ userInfo }) => {
    const { state, dispatch } = useContext(ThemeContext)
    const listTab = [{ status: "Date" }, { status: "Answers" }, { status: "Views" }]
    const scrollY = useRef(new Animated.Value(0)).current
    const [status, setStatus] = useState('Date')
    const [questions, setQuestions] = useState([])
    const handleChangeStatusFilter = (status: string) => {
        setStatus(status)
        switch (status) {
            case 'Date':
                setQuestions(sortDataByDate(userInfo))
                break;
            case 'Answers':
                setQuestions(sortDataByAnswers(userInfo))
                break;
            case 'Views':
                setQuestions(sortDataByViews(userInfo))
                break;
        }
    }
    useEffect(() => {
        setQuestions(sortDataByDate(userInfo))
    }, [])
    return (
        <SafeAreaView style={s.container}>
            <View style={[s.listTab, { backgroundColor: colors('semiBack', state.darkTheme) }]}>
                {listTab.map((tab, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[s.btnTab, index === 0 && s.leftTab, index === 2 && s.rightTab, status === tab.status && s.btmTabActive]}
                        onPress={() => {
                            handleChangeStatusFilter(tab.status)
                        }}
                    >
                        <MyText style={[s.textTab, { color: state.darkTheme ? "#fff" : colors('primary',false) }, status === tab.status && s.textTabActiev && { color: "#fff" }]}>{tab.status}</MyText>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={[s.listItems, { backgroundColor: colors('semiBack', state.darkTheme) }]}>
                <Animated.FlatList
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: true }
                    )}
                    data={questions}
                    keyExtractor={(item: any) => item.question_id}
                    renderItem={({ item, index }: ListRenderItemInfo<object>) => {
                        const inputRange = [-1, 0, 95 * index, 95 * (index + 2)]
                        const scale = scrollY.interpolate({
                            inputRange,
                            outputRange: [1, 1, 1, 0]
                        })

                        return (
                            <Animated.View style={{ transform: [{ scale }] }}>
                                < QuestionLine question={item} status={status} />
                            </Animated.View>
                        )
                    }}
                />
            </View>
        </SafeAreaView>

    )
}

const s = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    listTab: {
        //backgroundColor: '#fff',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        width: Dimensions.get('window').width * 0.95,
        borderBottomColor: "#C8C8C8",
        borderBottomWidth: 1
    },
    leftTab: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    rightTab: {
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    },
    listItems: {
        flex: 1,
        // backgroundColor: colors('background')
    },
    btnTab: {
        width: Dimensions.get('window').width / 3.5,
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: '#ccc',
        padding: 10,
        justifyContent: 'center'
    },
    textTab: {
        fontSize: 15,
        //color: colors('primary')
    },
    btmTabActive: {
        backgroundColor: colors('primary',false)
    },
    textTabActiev: {
        //color: '#fff',
        fontSize: 15,

        fontWeight: 'bold'
    }
})
