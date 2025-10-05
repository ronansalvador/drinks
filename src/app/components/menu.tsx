'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu as MenuIcon, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false)

  // Agora cada item pode ter uma role específica (ou ficar acessível a todos)
  const menuItems = [
    { href: '/produtos', label: 'produtos' },
    { href: '/produtos/cadastro', label: 'cadastrar produto' },
    { href: '/drinks', label: 'Drinks' },
    { href: '/drinks/cadastro', label: 'cadastrar drink' },
  ]

  return (
    <nav className="bg-gray-100 p-4 shadow-md">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-800">
          Calculo Custo Drinks
        </h1>

        {/* Botão hamburguer */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <MenuIcon size={28} />}
        </button>

        {/* Menu desktop */}
        <ul className="hidden md:flex gap-6">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-gray-800 hover:text-blue-500 font-medium"
              >
                {item.label}
              </Link>
            </li>
          ))}

          {/* Se logado mostra botão Sair, senão mostra Login */}
        </ul>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4 mt-4 md:hidden"
          >
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-gray-800 hover:text-blue-500 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  )
}
