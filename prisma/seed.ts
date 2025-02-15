import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Create initial species data
  const species = await prisma.seafoodRecovery.createMany({
    data: [
      {
        speciesName: 'Pacific Cod',
        description: 'Recoveries and yields from Pacific Cod'
      },
      {
        speciesName: 'Salmon - Sockeye',
        description: 'Recoveries and yields from Sockeye Salmon'
      },
      // Add more species as needed
    ],
    skipDuplicates: true,
  })

  console.log('Database has been seeded.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })