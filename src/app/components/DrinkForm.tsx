import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'
import { Product } from '../types'

interface DrinkFormProps {
  products: Product[]
  onSubmit: (data: any) => void
}

export function DrinkForm({ products, onSubmit }: DrinkFormProps) {
  const { handleSubmit, register, control } = useForm()

  const options = products.map((p) => ({ value: p.id, label: p.name }))

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-lg mx-auto"
    >
      <input
        {...register('name')}
        placeholder="Nome do drink"
        className="w-full border px-3 py-2 rounded"
      />
      <textarea
        {...register('description')}
        placeholder="Descrição"
        className="w-full border px-3 py-2 rounded"
      />

      <Controller
        name="ingredients"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            isMulti
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        )}
      />

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Salvar
      </button>
    </form>
  )
}
