import {categorySeeder} from "@/lib/db/seed/categorySeeder";
import {productSeeder} from "@/lib/db/seed/productSeeder";

const main = async () => {
  // await categorySeeder()
  await productSeeder()
  process.exit(0)

}

main()