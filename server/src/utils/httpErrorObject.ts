export const errorMessage = (success: boolean, status: number, message: object | string) => {
  return { success, status, message }
}