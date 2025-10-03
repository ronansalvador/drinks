import { DrinkInput } from '@/app/types'
import { prisma } from '@/lib/prisma'
import { DrinkIngredient } from '@prisma/client'
import { NextResponse } from 'next/server'

// GET - lista todos os drinks
export async function GET() {
  try {
    const drinks = await prisma.drink.findMany({
      include: {
        ingredients: {
          include: { product: true }, // já traz os produtos relacionados
        },
      },
    })
    return NextResponse.json(drinks)
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao buscar drinks', error },
      { status: 500 },
    )
  }
}

// POST - cria um novo drink
// export async function POST(req: Request) {
//   try {
//     const { name, description } = await req.json()

//     const drink = await prisma.drink.create({
//       data: {
//         name,
//         description,
//       },
//     })

//     return NextResponse.json(drink)
//   } catch (error) {
//     return NextResponse.json(
//       { message: 'Erro ao criar drink', error },
//       { status: 500 },
//     )
//   }
// }
// export async function POST(req: Request) {
//   try {
//     const { name, description, ingredients } = await req.json()

//     const drink = await prisma.drink.create({
//       data: {
//         name,
//         description,
//         ingredients: {
//           create: ingredients.map(
//             (i: { productId: string; volumeMl: number }) => ({
//               productId: i.productId,
//               volumeMl: i.volumeMl,
//             }),
//           ),
//         },
//       },
//       include: {
//         ingredients: {
//           include: { product: true },
//         },
//       },
//     })

//     return NextResponse.json(drink)
//   } catch (error) {
//     return NextResponse.json(
//       { message: 'Erro ao criar drink', error },
//       { status: 500 },
//     )
//   }
// }
export async function POST(req: Request) {
  try {
    const { name, description, ingredients }: DrinkInput = await req.json()

    const drink = await prisma.drink.create({
      data: {
        name,
        description,
        ingredients: {
          create: ingredients.map((i) => ({
            productId: i.productId,
            volumeMl: i.volumeMl,
          })),
        },
      },
      include: {
        ingredients: {
          include: { product: true },
        },
      },
    })

    return NextResponse.json(drink)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Erro ao criar drink', error },
      { status: 500 },
    )
  }
}

// PUT - atualiza um drink
// export async function PUT(req: Request) {
//   try {
//     const { id, name, description } = await req.json()

//     const drink = await prisma.drink.update({
//       where: { id },
//       data: {
//         name,
//         description,
//       },
//     })

//     return NextResponse.json(drink)
//   } catch (error) {
//     return NextResponse.json(
//       { message: 'Erro ao atualizar drink', error },
//       { status: 500 },
//     )
//   }
// }
export async function PUT(req: Request) {
  try {
    const { id, name, description, ingredients } = await req.json()

    if (!id)
      return NextResponse.json({ message: 'ID obrigatório' }, { status: 400 })

    // Atualiza drink
    const drink = await prisma.drink.update({
      where: { id },
      data: {
        name,
        description,
        // Remove os ingredientes que não estão mais na lista
        ingredients: {
          deleteMany: {
            NOT: {
              id: {
                in: ingredients
                  .map((i: DrinkIngredient) => i.id)
                  .filter(Boolean),
              },
            },
          },
          // Upsert ingredientes (atualiza se existir, cria se não existir)

          upsert: ingredients.map((i: DrinkIngredient) => ({
            where: { id: i.id || '' }, // se não tiver id, vai criar
            update: {
              volumeMl: i.volumeMl,
              productId: i.productId,
            },
            create: {
              volumeMl: i.volumeMl,
              productId: i.productId,
            },
          })),
        },
      },
      include: {
        ingredients: {
          include: { product: true },
        },
      },
    })

    return NextResponse.json(drink)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Erro ao atualizar drink', error },
      { status: 500 },
    )
  }
}

// DELETE - exclui um drink
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()
    if (!id)
      return NextResponse.json({ message: 'ID obrigatório' }, { status: 400 })

    const deleted = await prisma.drink.delete({ where: { id } })
    return NextResponse.json({ message: 'Drink removido', drink: deleted })
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao excluir drink', error },
      { status: 500 },
    )
  }
}
