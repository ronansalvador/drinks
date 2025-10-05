import Link from 'next/link'
import { DrinkWithCost } from '../types'

interface DrinkListProps {
  drinks: DrinkWithCost[]
}

export function DrinkList({ drinks }: DrinkListProps) {
  console.log(drinks)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {drinks.map((d) => (
        <Link
          key={d.id}
          href={`/drinks/${d.id}`}
          className="p-4 shadow rounded-lg hover:shadow-md transition border-1"
        >
          <h2 className="font-bold text-lg">{d.name}</h2>
          <p className="text-gray-500">{d.description}</p>
          <ul className="mt-2">
            {d.ingredientes.map((i) => (
              <li key={i.ingrediente}>
                {i.ingrediente}: {i.quantidade} - R$ {i.custo.toFixed(2)}
              </li>
            ))}
          </ul>
          <h3 className="mt-2 font-semibold">
            Custo total: R$ {d.custoTotal.toFixed(2)}
          </h3>
        </Link>
      ))}
    </div>
  )
}
