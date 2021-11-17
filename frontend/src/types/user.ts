export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  birthDate: string
  streetAddress: string
  zipCode: string
  city: string
}

export type UsersDTO = {
  users: User[]
}
