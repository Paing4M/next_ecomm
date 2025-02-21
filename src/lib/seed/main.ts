import {categorySeeder} from "@/lib/seed/categorySeeder";
import {productSeeder} from "@/lib/seed/productSeeder";

const main = async () => {
  // await categorySeeder()
  await productSeeder()
  process.exit(0)

}

main()