/* eslint-disable no-console */
import { connection } from "../boot.js"
import Shoe from "../models/Shoe.js"

class Seeder {
  static async seed() {
    console.log("seeding shoes")
    const jordan1 = await Shoe.query().insert({ name: "Jordan 1 Retro High OG", category: "athletic", color: "TRUE BLUE" , url: "https://images.stockx.com/360/Air-Jordan-1-Retro-High-OG-True-Blue/Images/Air-Jordan-1-Retro-High-OG-True-Blue/Lv2/img01.jpg?fm=avif&auto=compress&w=326&dpr=2&updated_at=1674030278&h=217.33333333333334&q=75" })
    const vans1 = await Shoe.query().insert({name: "Vans Old Skool", category: "casual", color: "BLACK/TRUE WHITE", url: "https://images.stockx.com/360/Vans-Old-Skool-Flame-2017/Images/Vans-Old-Skool-Flame-2017/Lv2/img01.jpg?fm=avif&auto=compress&w=326&dpr=2&updated_at=1635342261&h=217.33333333333334&q=75" })
    const nike1 = await Shoe.query().insert({name: "Nike SB Dunk Low Mummy", category: "casual" , color: "COCONUT MILK/SEAFOAM-YELLOW STRIKE" , url: "https://images.stockx.com/360/Nike-Dunk-SB-Low-Mummy/Images/Nike-Dunk-SB-Low-Mummy/Lv2/img17.jpg?fm=avif&auto=compress&w=326&dpr=2&updated_at=1635746790&h=217.33333333333334&q=75"  })
    const kobe1 = await Shoe.query().insert({name: "Nike Kobe 6 Protro (Grinch)" , category: "athleic", color: "GREEN APPLE" , url: "https://images.stockx.com/360/Nike-Kobe-6-Protro-Grinch/Images/Nike-Kobe-6-Protro-Grinch/Lv2/img07.jpg?fm=avif&auto=compress&w=326&dpr=2&updated_at=1635269136&h=217.33333333333334&q=75" })
    // include individual seed commands here

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder