import Faker from 'faker'
import { define } from 'typeorm-seeding'
import { User } from './user.entity'

define(User, (faker: typeof Faker) => {
    const gender = faker.random.number(1)
    const firstName = faker.name.firstName(gender)
    const displayName = faker.name.(gender)
   
    const user = new User()
    user.name = `${firstName} ${lastName}`
    user.password = faker.random.word()
    return user
  })

function define(User: any, arg1: (faker: any) => any) {
    throw new Error("Function not implemented.")
}
