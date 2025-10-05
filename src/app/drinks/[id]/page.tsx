'use client'
import { useEffect, useState } from 'react'
import Select, { MultiValue } from 'react-select'
import { useRouter, useParams } from 'next/navigation'
import { Product, DrinkWithCost } from '@/app/types'
import { api } from '../../utils/api'

interface IngredientOption {
  value: string
  label: string
  volume: number
}

export default function DrinkEditPage() {
  const router = useRouter()
  const params = useParams()
  const { id } = params

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [ingredients, setIngredients] = useState<IngredientOption[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Carrega drink e produtos
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [drinkRes, productsRes] = await Promise.all([
          api.get(`/drinks/${id}`),
          api.get('/produtos'),
        ])

        const drink: DrinkWithCost = drinkRes.data
        console.log('drink', drink)
        setName(drink.name)
        setDescription(drink.description || '')

        setProducts(productsRes.data)

        // Converte ingredientes da API para IngredientOption
        const ingOptions: IngredientOption[] = drink.ingredientes.map((i) => {
          const product = productsRes.data.find(
            (p: Product) => p.name === i.ingrediente,
          )
          return {
            value: product?.id || '',
            label: i.ingrediente,
            volume: Number(i.quantidade.replace(/\D/g, '')),
          }
        })
        setIngredients(ingOptions)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [id])

  if (loading) return <p className="p-4">Carregando...</p>

  // Opções para react-select
  const options = products.map((p) => ({ value: p.id, label: p.name }))

  const handleSelectChange = (
    selected: MultiValue<{ value: string; label: string }>,
  ) => {
    const newIngredients: IngredientOption[] = selected.map((s) => {
      const existing = ingredients.find((i) => i.value === s.value)
      return existing ? existing : { value: s.value, label: s.label, volume: 0 }
    })
    setIngredients(newIngredients)
  }

  const handleSave = async () => {
    if (!name || ingredients.length === 0) {
      alert('Preencha nome e ingredientes')
      return
    }

    setSaving(true)
    try {
      await api.put(`/drinks/${id}`, {
        name,
        description,
        ingredients: ingredients.map((i) => ({
          productId: i.value,
          volumeMl: i.volume,
        })),
      })
      alert('Drink atualizado com sucesso!')
      router.push('/drinks')
    } catch (error) {
      console.error(error)
      alert('Erro ao atualizar drink')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar Drink</h1>

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
        disabled={saving}
        className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {saving ? 'Salvando...' : 'Salvar Drink'}
      </button>
    </div>
  )
}
