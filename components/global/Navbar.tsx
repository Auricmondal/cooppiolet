import { Method, strapiRequest } from '@/lib/api'
import NavbarProvider from '@/context/NavbarContext'
import NavContainer from './Navbar/NavContainer'
import axios from 'axios'

const Navbar = async () => {
  const data: { data: any } = await strapiRequest('/navbar?populate=*&locale=en', Method.GET)

  return <NavContainer content={data?.data} />
}

export default Navbar
