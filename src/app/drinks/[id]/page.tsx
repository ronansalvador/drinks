'use client'
import { useEffect, useState } from 'react'
import { DrinkCostResult } from '@/app/types'
import { useParams } from 'next/navigation'
import { api } from '@/app/utils/api'

export default function DrinkCostPage() {
  const params = useParams()
  const { id } = params
  const [cost, setCost] = useState<DrinkCostResult | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCost = async () => {
      setLoading(true)
      try {
        const res = await api.get(`/drinks/${id}`)
        setCost(res.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    loadCost()
  }, [id])

  if (loading) return <p className="p-4">Carregando...</p>
  if (!cost) return <p className="p-4">Erro ao carregar custo</p>

  console.log('cost', cost)

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Custo do Drink: {cost.drink}</h1>
      <ul className="mb-4">
        {cost.ingredientes.map((i) => (
          <li key={i.ingrediente} className="flex justify-between">
            <span>
              {i.ingrediente} ({i.quantidade})
            </span>
            <span>R$ {i.custo.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-bold">
        Custo Total: R$ {cost.custoTotal.toFixed(2)}
      </h2>
    </div>
  )
}
