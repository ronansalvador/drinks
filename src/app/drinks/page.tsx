'use client'
import { useState, useEffect } from 'react'
import { DrinkWithCost } from '@/app/types' // 🟢 novo tipo
import { DrinkList } from '../components/DrinkList'
import { api } from '../utils/api'

export default function DrinksPage() {
  const [drinks, setDrinks] = useState<DrinkWithCost[]>([]) // 🟢 aqui
  const [loading, setLoading] = useState(true)

  const loadDrinks = async () => {
    setLoading(true)
    try {
      const res = await api.get('/drinks')
      setDrinks(res.data) // ✅ agora corresponde ao tipo DrinkWithCost[]
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDrinks()
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Drinks</h1>
      {loading ? <p>Carregando...</p> : <DrinkList drinks={drinks} />}
    </div>
  )
}
