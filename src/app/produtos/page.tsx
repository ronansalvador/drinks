'use client'
import { useState, useEffect } from 'react'
import { Product } from '@/app/types'
import { ProductList } from '../components/ProductList'
import { api } from '../utils/api'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null) // produto em edição
  const [editName, setEditName] = useState('')
  const [editVolume, setEditVolume] = useState(0)
  const [editPrice, setEditPrice] = useState(0)

  const loadProducts = async () => {
    setLoading(true)
    try {
      const res = await api.get('/produtos')
      setProducts(res.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja realmente excluir este produto?')) return
    try {
      await api.delete(`/produtos/${id}`)
      loadProducts()
    } catch (error) {
      console.error(error)
    }
  }

  const startEdit = (product: Product) => {
    setEditingProduct(product)
    setEditName(product.name)
    setEditVolume(product.volumeMl)
    setEditPrice(product.price)
  }

  const cancelEdit = () => {
    setEditingProduct(null)
  }

  const saveEdit = async () => {
    if (!editingProduct) return

    try {
      await api.put(`/produtos/${editingProduct.id}`, {
        name: editName,
        volumeMl: editVolume,
        price: editPrice,
      })
      setEditingProduct(null)
      loadProducts()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Produtos</h1>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ProductList
          products={products}
          onDelete={handleDelete}
          onEdit={startEdit} // 🟢 passamos a função de editar
        />
      )}

      {/* Formulário inline de edição */}
      {editingProduct && (
        <div className="mt-4 p-4 border rounded">
          <h2 className="text-xl font-semibold mb-2">
            Editando: {editingProduct.name}
          </h2>
          <input
            className="border p-2 mb-2 block w-full"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="Nome"
          />
          <input
            type="number"
            className="border p-2 mb-2 block w-full"
            value={editVolume}
            onChange={(e) => setEditVolume(Number(e.target.value))}
            placeholder="Volume (ml)"
          />
          <input
            type="number"
            className="border p-2 mb-2 block w-full"
            value={editPrice}
            onChange={(e) => setEditPrice(Number(e.target.value))}
            placeholder="Preço"
          />
          <div className="space-x-2">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={saveEdit}
            >
              Salvar
            </button>
            <button
              className="bg-gray-300 px-4 py-2 rounded"
              onClick={cancelEdit}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
