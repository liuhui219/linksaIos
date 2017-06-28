export default function todos(state = [], action) {
  switch (action.type) {
  case 'ADD_CHECK':
    return false
  case 'ADD_CHECKS':
    return true
  default:
    return state
  }
}
