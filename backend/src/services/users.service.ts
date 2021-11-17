import faker from 'faker/locale/fr'
import { User } from '../types/user'

const NUMBER_OF_USERS = 100_000

let users: User[] = Array.from(Array(NUMBER_OF_USERS).keys()).map(id => {
  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()

  return {
    id,
    firstName,
    lastName,
    email: faker.internet.email(firstName, lastName),
    phoneNumber: faker.phone.phoneNumber('+33#########'),
    birthDate: faker.date.between(1920, 2020).toISOString(),
    streetAddress: faker.address.streetAddress(),
    zipCode: faker.address.zipCode(),
    city: faker.address.city(),
  }
})

export const getUsers = (limit?: number) => {
  return limit !== undefined ? users.slice(0, limit) : users
}

export const deleteUser = (id: number) => {
  users = users.filter(user => user.id !== id)
}
