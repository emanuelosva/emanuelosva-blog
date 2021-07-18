export const THEMES = {
  LIGTH: 'LIGTH',
  DARK: 'DARK',
}

const theme = {
  [THEMES.LIGTH]: {
    isDark: false,
    color: '#201E1C',
    highligth_color: '#F7931A',
    backgroundColor: '#ffffff',
  },
  [THEMES.DARK]: {
    isDark: true,
    color: '#FAF8F7',
    highligth_color: '#0070f3',
    backgroundColor: '#000000',
  },
}

export default theme
