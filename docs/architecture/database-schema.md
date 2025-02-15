# Database Schema

The Seafood Calculator uses Prisma to manage the database schema. The schema is defined in `prisma/schema.prisma`.

## Tables

### SeafoodRecovery

Stores information about different seafood species.

*   `id`: `Int` @id @default(autoincrement())
*   `speciesName`: `String` @map("species_name")
*   `description`: `String`
*   `createdAt`: `DateTime` @default(now()) @map("created_at")
*   `updatedAt`: `DateTime` @updatedAt @map("updated_at")
*   `yields`: `Yield[]`
*   `processingCosts`: `ProcessingCost[]`
*   `savedCalculations`: `SavedCalculation[]`

### Yield

Stores yield information for each species.

*   `id`: `Int` @id @default(autoincrement())
*   `speciesId`: `Int` @map("species_id")
*   `cutType`: `String` @map("cut_type")
*   `minYield`: `Decimal` @map("min_yield")
*   `maxYield`: `Decimal` @map("max_yield")
*   `defaultYield`: `Decimal` @map("default_yield")
*   `createdAt`: `DateTime` @default(now()) @map("created_at")
*   `species`: `SeafoodRecovery` @relation(fields: [speciesId], references: [id])

### ProcessingCost

Stores processing cost information for each species.

*   `id`: `Int` @id @default(autoincrement())
*   `speciesId`: `Int` @map("species_id")
*   `cutType`: `String` @map("cut_type")
*   `baseCost`: `Decimal` @map("base_cost")
*   `volumeDiscountThreshold`: `Int` @map("volume_discount_threshold")
*   `volumeDiscountRate`: `Decimal` @map("volume_discount_rate")
*   `createdAt`: `DateTime` @default(now()) @map("created_at")
*   `species`: `SeafoodRecovery` @relation(fields: [speciesId], references: [id])

### User

Stores user account information.

*   `id`: `Int` @id @default(autoincrement())
*   `email`: `String` @unique
*   `passwordHash`: `String` @map("password_hash")
*   `createdAt`: `DateTime` @default(now()) @map("created_at")
*   `savedCalculations`: `SavedCalculation[]`

### SavedCalculation

Stores saved calculation information for each user.

*   `id`: `Int` @id @default(autoincrement())
*   `userId`: `Int` @map("user_id")
*   `speciesId`: `Int` @map("species_id")
*   `yieldPercentage`: `Decimal` @map("yield_percentage")
*   `rawCost`: `Decimal` @map("raw_cost")
*   `processingCost`: `Decimal` @map("processing_cost")
*   `shippingCost`: `Decimal` @map("shipping_cost")
*   `totalWeight`: `Int`
*   `markupPercentage`: `Decimal` @map("markup_percentage")
*   `finalCost`: `Decimal` @map("final_cost")
*   `notes`: `String?`
*   `createdAt`: `DateTime` @default(now()) @map("created_at")
*   `user`: `User` @relation(fields: [userId], references: [id])
*   `species`: `SeafoodRecovery` @relation(fields: [speciesId], references: [id])