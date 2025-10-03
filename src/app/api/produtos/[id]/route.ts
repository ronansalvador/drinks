import { prisma } from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

// PUT - atualiza um produto usando o id da rota
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }, // pega id da rota /produtos/:id
) {
  try {
    const { id } = context.params
    const { name, volumeMl, price, unit } = await req.json()

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
