export const pushLocalStorageValues = (state, values) => {
  state.localStorageData = state.localStorageData.concat(values)
}

export const clearLocalStorageValues = (state) => {
  state.localStorageData = []
}
