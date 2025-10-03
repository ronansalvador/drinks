'use client'
import { useEffect, useState } from 'react'
import Select, { MultiValue } from 'react-select'
import { useRouter } from 'next/navigation'
import { Product } from '@/app/types'
import { api } from '../../utils/api'

interface IngredientOption {
  value: string
  label: string
  volume: number
}

export default function DrinkCreatePage() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [ingredients, setIngredients] = useState<IngredientOption[]>([])
  const router = useRouter()

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await api.get('/produtos')
        setProducts(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    loadProducts()
  }, [])

  const handleSave = async () => {
    if (!name || ingredients.length === 0)
      return alert('Preencha nome e ingredientes')

    try {
      const body = {
        name,
        description,
        ingredients: ingredients.map((i) => ({
          productId: i.value,
          volumeMl: i.volume,
        })),
      }
      await api.post('/drinks', body)
      alert('Drink criado com sucesso!')
      router.push('/drinks')
    } catch (error) {
      console.error(error)
      alert('Erro ao criar drink')
    }
  }

  // opções para react-select
  const options = products.map((p) => ({ value: p.id, label: p.name }))

  const handleSelectChange = (
    selected: MultiValue<{ value: string; label: string }>,
  ) => {
    // Mantém produtos existentes e adiciona novos sem duplicar
    const newIngredients: IngredientOption[] = selected.map((s) => {
      const existing = ingredients.find((i) => i.value === s.value)
      return existing ? existing : { value: s.value, label: s.label, volume: 0 }
    })
    setIngredients(newIngredients)
  }

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Criar Drink</h1>
      <input
        placeholder="Nome do drink"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-2"
      />
      <textarea
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-2"
      />

      <Select
        options={options}
        isMulti
        onChange={handleSelectChange}
        placeholder="Selecione produtos"
        value={ingredients.map((i) => ({ value: i.value, label: i.label }))}
      />

      {ingredients.map((i, idx) => (
        <div key={i.value} className="flex items-center space-x-2 mt-2">
          <span className="w-32">{i.label}</span>
          <input
            type="number"
            placeholder="Volume (ml)"
            value={i.volume}
            onChange={(e) => {
              const newIngredients = [...ingredients]
              newIngredients[idx].volume = parseInt(e.target.value) || 0
              setIngredients(newIngredients)
            }}
            className="border px-2 py-1 rounded w-24"
          />
        </div>
      ))}

      <button
        onClick={handleSave}
        className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Salvar Drink
      </button>
    </div>
  )
}
