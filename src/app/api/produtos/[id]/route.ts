import { prisma } from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

// PUT - atualiza um produto usando o id da rota
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params
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
