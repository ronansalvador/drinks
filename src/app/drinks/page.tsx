'use client'
import { useState, useEffect } from 'react'
import { Drink } from '@/app/types'
import { DrinkList } from '../components/DrinkList'
import { api } from '../utils/api' // ou use fetch direto

export default function DrinksPage() {
  const [drinks, setDrinks] = useState<Drink[]>([])
  const [loading, setLoading] = useState(true)

  const loadDrinks = async () => {
    setLoading(true)
    try {
      // usando axios
      const res = await api.get('/drinks')
      setDrinks(res.data)

      // ou usando fetch direto:
      // const res = await fetch('/api/drinks')
      // const data = await res.json()
      // setDrinks(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDrinks()
  }, [])
  console.log('dinrks', drinks)
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Drinks</h1>

      {loading ? <p>Carregando...</p> : <DrinkList drinks={drinks} />}
    </div>
  )
}
