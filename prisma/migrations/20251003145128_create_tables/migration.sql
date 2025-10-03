-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "volumeMl" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL DEFAULT 'ml',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Drink" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Drink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DrinkIngredient" (
    "id" TEXT NOT NULL,
    "drinkId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "volumeMl" INTEGER NOT NULL,

    CONSTRAINT "DrinkIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Drink_name_key" ON "Drink"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DrinkIngredient_drinkId_productId_key" ON "DrinkIngredient"("drinkId", "productId");

-- AddForeignKey
ALTER TABLE "DrinkIngredient" ADD CONSTRAINT "DrinkIngredient_drinkId_fkey" FOREIGN KEY ("drinkId") REFERENCES "Drink"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DrinkIngredient" ADD CONSTRAINT "DrinkIngredient_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
