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

    
    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder