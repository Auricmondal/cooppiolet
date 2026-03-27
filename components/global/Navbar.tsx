import { Method, strapiRequest } from '@/lib/api'
import NavbarProvider from '@/context/NavbarContext'
import NavContainer from './Navbar/NavContainer'

const Navbar = async () => {
  const data: { data: any } = await strapiRequest('/navbar?populate=*', Method.GET)

  return <NavContainer content={data.data} />
}

export default Navbar
