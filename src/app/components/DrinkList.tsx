import { Drink } from '../types'

interface DrinkListProps {
  drinks: Drink[]
}

export function DrinkList({ drinks }: DrinkListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {drinks.map((d) => (
        <div key={d.id} className="p-4 bg-white shadow rounded-lg">
          <h2 className="font-bold text-lg">{d.name}</h2>
          <p className="text-gray-500">{d.description}</p>
          <ul className="mt-2">
            {d.ingredients.map((i) => (
              <li key={i.id}>
                {i.product?.name}: {i.volumeMl}
                {i.product?.unit}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
