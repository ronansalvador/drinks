'use client'
import { useState, useEffect } from 'react'
import { Product } from '@/app/types'
import { ProductList } from '../components/ProductList'
import { api } from '../utils/api' // ou use fetch direto

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  // Função para carregar produtos
  const loadProducts = async () => {
    setLoading(true)
    try {
      // usando axios
      const res = await api.get('/produtos')
      setProducts(res.data)

      // ou usando fetch direto:
      // const res = await fetch('/api/products')
      // const data = await res.json()
      // setProducts(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // Carrega produtos ao montar o componente
  useEffect(() => {
    loadProducts()
  }, [])

  // Deletar produto
  const handleDelete = async (id: string) => {
    if (!confirm('Deseja realmente excluir este produto?')) return

    try {
      // usando axios
      await api.delete(`/produtos/${id}`)

      // ou fetch direto:
      // await fetch('/api/products', {
      //   method: 'DELETE',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ id }),
      // })

      // Recarrega a lista
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
        <ProductList products={products} onDelete={handleDelete} />
      )}
    </div>
  )
}
