import { createSlice } from '@reduxjs/toolkit'
import { accentColor, chatBackground, language, theme } from '../../constants/system'

export const systemSlice = createSlice({
  name: 'system',
  initialState: {
    language: language.english,
    theme: theme.light,
    accentColor: accentColor.purple,
    chatBackground: chatBackground.none
  },
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload
    },
    setTheme: (state, action) => {
      state.theme = action.payload
    },
    setAccentColor: (state, action) => {
      state.accentColor = action.payload
    },
    setChatBackground: (state, action) => {
      state.chatBackground = action.payload
    }
  }
})

export const { setLanguage, setTheme, setAccentColor, setChatBackground } = systemSlice.actions

export default systemSlice.reducer
