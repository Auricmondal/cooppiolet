import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_URL,
})

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export async function strapiRequest<T>(
  path: string,
  method: Method = Method.GET,
  data?: unknown
): Promise<T> {
  const token = process.env.STRAPI_READONLY_TOKEN

  if (!token) throw new Error('Missing token')

  const res = await api.request<T>({
    url: path,
    method,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res.data
}
