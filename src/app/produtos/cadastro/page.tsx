'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/app/utils/api'

export default function ProductCreatePage() {
  const [name, setName] = useState('')
  const [volumeMl, setVolumeMl] = useState('')
  const [price, setPrice] = useState('')
  const [unit, setUnit] = useState('ml')
  const router = useRouter()

  const handleSave = async () => {
    if (!name || !volumeMl || !price) return alert('Preencha todos os campos')

    try {
      await api.post('/produtos', {
        name,
        volumeMl: parseInt(volumeMl),
        price: parseFloat(price),
        unit,
      })
      alert('Produto criado com sucesso!')
      router.push('/produtos')
    } catch (error) {
      console.error(error)
      alert('Erro ao criar produto')
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Cadastrar Produto</h1>
      <input
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-2"
      />
      <input
        placeholder="Volume (ml)"
        value={volumeMl}
        type="number"
        onChange={(e) => setVolumeMl(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-2"
      />
      <input
        placeholder="Preço"
        value={price}
        type="number"
        onChange={(e) => setPrice(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-2"
      />
      <select
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-4"
      >
        <option value="ml">ml</option>
        <option value="g">g</option>
        <option value="un">unidade</option>
      </select>
      <button
        onClick={handleSave}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Salvar
      </button>
    </div>
  )
}
