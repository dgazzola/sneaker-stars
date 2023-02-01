/* eslint-disable no-console */
import { connection } from "../boot.js"
import Shoe from "../models/Shoe.js"

class Seeder {
  static async seed() {
    console.log("seeding shoes")
    const jordan1 = await Shoe.query().insert({ name: "Jordan 1 Retro High OG", category: "athletic", color: "TRUE BLUE" , url: "https://images.stockx.com/360/Air-Jordan-1-Retro-High-OG-True-Blue/Images/Air-Jordan-1-Retro-High-OG-True-Blue/Lv2/img01.jpg?fm=avif&auto=compress&w=326&dpr=2&updated_at=1674030278&h=217.33333333333334&q=75", description: "The Air Jordan 1 True Blue takes inspiration from Jordan Brand's original Air Jordan 3 True Blue from 1988." })
    const vans1 = await Shoe.query().insert({name: "Vans Old Skool", category: "casual", color: "BLACK/TRUE WHITE", url: "https://images.stockx.com/360/Vans-Old-Skool-Flame-2017/Images/Vans-Old-Skool-Flame-2017/Lv2/img01.jpg?fm=avif&auto=compress&w=326&dpr=2&updated_at=1635342261&h=217.33333333333334&q=75", description: "The Flame Old Skool, the Vans classic skate shoe and first to bare the iconic sidestripe, is a low top lace-up featuring printed canvas and suede uppers." })
    const nike1 = await Shoe.query().insert({name: "Nike SB Dunk Low Mummy", category: "casual" , color: "COCONUT MILK/SEAFOAM-YELLOW STRIKE" , url: "https://images.stockx.com/360/Nike-Dunk-SB-Low-Mummy/Images/Nike-Dunk-SB-Low-Mummy/Lv2/img17.jpg?fm=avif&auto=compress&w=326&dpr=2&updated_at=1635746790&h=217.33333333333334&q=75", description: "The Nike SB Dunk Low Mummy draws inspiration from the Ancient Egyptian mummification process."  })
    const kobe1 = await Shoe.query().insert({name: "Nike Kobe 6 Protro (Grinch)" , category: "athleic", color: "GREEN APPLE" , url: "https://images.stockx.com/360/Nike-Kobe-6-Protro-Grinch/Images/Nike-Kobe-6-Protro-Grinch/Lv2/img07.jpg?fm=avif&auto=compress&w=326&dpr=2&updated_at=1635269136&h=217.33333333333334&q=75", description: "This is the first Kobe 6 to receive the Kobe Protro treatment, a design process that takes classic Kobe designs and updates them with modern tech for improved performance." })

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder