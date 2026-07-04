function getValidationErrorMessage(errors) {
  if (!errors) {
    return null
  }

  return Object.values(errors).flat().join(' ')
}

export default getValidationErrorMessage
