/* eslint-disable no-console */
import { connection } from "../boot.js"
import ShoeSeeder from "./seeders/ShoeSeeder.js"
import UserSeeder from "./seeders/UserSeeder.js"
import ReviewSeeder from "./seeders/ReviewSeeder.js"

class Seeder {
  static async seed() {
    console.log("seeding shoes")
    await ShoeSeeder.seed()
    
    console.log("seeding users")
    await UserSeeder.seed()

    console.log("seeding reviews")
    await ReviewSeeder.seed()

    const user1 = await User.query().insert({username: "Boris the Animal", email: "boristheanimal@gmail.com", password: "123456"})
    const user2 = await User.query().insert({username: "Johny Appleseed", email: "johnyytheman@hotmail.com", password: "123456"})
    const user3 = await User.query().insert({username: "Garret?", email: "garret.garret@garret.com", password: "123456"})
    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder