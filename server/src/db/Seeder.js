/* eslint-disable no-console */
import { connection } from "../boot.js"
import ShoeSeeder from "./seeders/ShoeSeeder.js"
import UserSeeder from "./seeders/UserSeeder.js"
import ReviewSeeder from "./seeders/ReviewSeeder.js"
import { User, Shoe, Review } from "../models/index.js"

class Seeder {
  static async seed() {
    console.log("seeding shoes")
    const shoes = await ShoeSeeder.seed()
    
    console.log("seeding users")
    const users = await UserSeeder.seed()

    console.log("seeding reviews")
    const reviews = await ReviewSeeder.seed(users, shoes)

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder