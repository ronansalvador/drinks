import { Product } from '../types'

interface ProductListProps {
  products: Product[]
  onDelete: (id: string) => void
}

export function ProductList({ products, onDelete }: ProductListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-4 py-2">Nome</th>
            <th className="text-left px-4 py-2">Volume</th>
            <th className="text-left px-4 py-2">Preço</th>
            <th className="text-left px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="px-4 py-2">{p.name}</td>
              <td className="px-4 py-2">
                {p.volumeMl}
                {p.unit}
              </td>
              <td className="px-4 py-2">R${p.price.toFixed(2)}</td>
              <td className="px-4 py-2 space-x-2">
                <button className="text-blue-500 hover:underline">
                  Editar
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => onDelete(p.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
