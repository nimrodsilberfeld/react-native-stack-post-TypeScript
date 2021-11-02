import React, { createContext, FC, useReducer, useState } from 'react'

type ThemeState = typeof initialState;
type Action = { type: 'CHANGE_THEME' }
interface InputProviderProps {
    children: React.ReactNode
}

const initialState = {
    darkTheme: false
}

const reducer = (state: ThemeState, action: Action) => {
    switch (action.type) {
        case 'CHANGE_THEME':
            console.log('enter', state)
            let current = !state.darkTheme
            return {
                darkTheme: current
            }
        default:
            return state
    }
}

export const ThemeContext = createContext<{
    state: ThemeState;
    dispatch: React.Dispatch<Action>
}>({ state: initialState, dispatch: () => { } });

export const ThemeProvider = ({ children }: InputProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialState)


    return (
        <ThemeContext.Provider value={{ state, dispatch }}>
            {children}
        </ThemeContext.Provider>
    )
}