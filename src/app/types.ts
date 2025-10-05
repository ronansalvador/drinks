// =====================
// Product
// =====================
export interface Product {
  id: string
  name: string
  volumeMl: number // volume total da garrafa (em ml)
  price: number // preço da garrafa
  unit: string
  createdAt: string
  updatedAt: string
  ingredients?: DrinkIngredient[] // relação reversa (opcional para evitar loops)
}

// =====================
// Drink
// =====================
export interface Drink {
  id: string
  name: string
  description?: string
  ingredients: DrinkIngredient[]
  createdAt: string
}

// =====================
// DrinkIngredient
// =====================
export interface DrinkIngredient {
  id: string
  drinkId: string
  productId: string
  volumeMl: number // quantidade usada no drink
  drink?: Drink // carregado opcionalmente
  product?: Product // carregado opcionalmente
}

// =====================
// Resultado de Cálculo de Custo do Drink
// =====================
export interface DrinkCostIngredient {
  ingrediente: string
  quantidade: string // exemplo: "35ml"
  custo: number
}

export interface DrinkCostResult {
  name: string
  ingredientes: DrinkCostIngredient[]
  custoTotal: number
}

export interface DrinkIngredientInput {
  id?: string // opcional, porque novo ingrediente não terá id
  productId: string
  volumeMl: number
}

export interface DrinkInput {
  id?: string // só necessário no PUT
  name: string
  description?: string
  ingredients: DrinkIngredientInput[]
}

export interface DrinkWithCost {
  id: string
  name: string
  description?: string
  ingredientes: DrinkCostIngredient[]
  custoTotal: number
}
