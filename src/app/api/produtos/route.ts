import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET - lista todos os produtos
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { name: 'asc' },
    })
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao buscar produtos', error },
      { status: 500 },
    )
  }
}

// POST - cria um novo produto
export async function POST(req: Request) {
  try {
    const { name, volumeMl, price, unit } = await req.json()

    const product = await prisma.product.create({
      data: {
        name,
        volumeMl,
        price,
        unit: unit || 'ml',
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao criar produto', error },
      { status: 500 },
    )
  }
}

// PUT - atualiza um produto
export async function PUT(req: Request) {
  try {
    const { id, name, volumeMl, price, unit } = await req.json()

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        volumeMl,
        price,
        unit,
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao atualizar produto', error },
      { status: 500 },
    )
  }
}

// DELETE - remove um produto
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()

    if (!id) {
      return NextResponse.json({ message: 'ID obrigatório' }, { status: 400 })
    }

    const deleted = await prisma.product.delete({ where: { id } })

    return NextResponse.json({ message: 'Produto removido', product: deleted })
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao excluir produto', error },
      { status: 500 },
    )
  }
}
