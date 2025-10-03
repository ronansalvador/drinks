import { DrinkCostIngredient, DrinkCostResult } from '@/app/types'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// GET - calcula custo de um drink pelo id
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params

    // Busca drink com ingredientes + produtos
    const drink = await prisma.drink.findUnique({
      where: { id },
      include: {
        ingredients: {
          include: {
            product: true,
          },
        },
      },
    })

    if (!drink) {
      return NextResponse.json(
        { message: 'Drink não encontrado' },
        { status: 404 },
      )
    }

    // Calcula custo de cada ingrediente
    const ingredientesCalculados: DrinkCostIngredient[] = drink.ingredients.map(
      (ing) => {
        const { product, volumeMl } = ing

        if (!product) throw new Error('Ingrediente sem produto relacionado')

        const custo = (product.price / product.volumeMl) * volumeMl

        return {
          ingrediente: product.name,
          quantidade: `${volumeMl}${product.unit}`,
          custo: Number(custo.toFixed(2)),
        }
      },
    )

    const custoTotal = ingredientesCalculados.reduce(
      (acc, cur) => acc + cur.custo,
      0,
    )

    const resultado: DrinkCostResult = {
      drink: drink.name,
      ingredientes: ingredientesCalculados,
      custoTotal: Number(custoTotal.toFixed(2)),
    }

    return NextResponse.json(resultado)
  } catch (error) {
    console.error('Erro ao calcular custo:', error)
    return NextResponse.json(
      { message: 'Erro ao calcular custo', error },
      { status: 500 },
    )
  }
}
