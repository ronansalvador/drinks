import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET - lista todos os ingredientes dos drinks
export async function GET() {
  try {
    const ingredients = await prisma.drinkIngredient.findMany({
      include: {
        product: true,
        drink: true,
      },
    })
    return NextResponse.json(ingredients)
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao buscar ingredientes', error },
      { status: 500 },
    )
  }
}

// POST - adiciona ingrediente a um drink
export async function POST(req: Request) {
  try {
    const { drinkId, productId, volumeMl } = await req.json()

    const ingredient = await prisma.drinkIngredient.create({
      data: {
        drinkId,
        productId,
        volumeMl,
      },
    })

    return NextResponse.json(ingredient)
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao adicionar ingrediente', error },
      { status: 500 },
    )
  }
}

// PUT - atualiza ingrediente
export async function PUT(req: Request) {
  try {
    const { id, volumeMl } = await req.json()

    const ingredient = await prisma.drinkIngredient.update({
      where: { id },
      data: { volumeMl },
    })

    return NextResponse.json(ingredient)
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao atualizar ingrediente', error },
      { status: 500 },
    )
  }
}

// DELETE - remove ingrediente
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()
    if (!id)
      return NextResponse.json({ message: 'ID obrigatório' }, { status: 400 })

    const deleted = await prisma.drinkIngredient.delete({ where: { id } })
    return NextResponse.json({
      message: 'Ingrediente removido',
      ingredient: deleted,
    })
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao excluir ingrediente', error },
      { status: 500 },
    )
  }
}
