import { redirect } from 'next/navigation'

// La raíz del proyecto es el cotizador: el middleware y el layout protegido
// se encargan de mandar al login si no hay sesión.
export default function Home() {
  redirect('/cotizador')
}
