import { User } from "../../models/index.js";

class UserSeeder {

  static async seed() {
    const usersData = [
      {
        username:"jackyjack",
        email:"jackyjack@jackyjack.com",
        password:"jackyjack"
      },
      {
        username:"dannydan",
        email:"dannydan@dannydan.com",
        password: "dannydan"
      },
      {
        username:"justinyjustin",
        email:"justinyjustin@justinyjustin.com",
        password: "justinyjustin"
      }
    ]

    for (const singleUserData of usersData) {
        await User.query().insert(singleUserData)
    }

    return await User.query()
  }
}

export default UserSeeder