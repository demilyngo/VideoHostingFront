import { UserDto } from '@/models/UserDto'
import axios from 'axios'

export const registerUser = async (
  name: string,
  email: string,
  login: string,
  password: string
): Promise<UserDto> => {
  const { data } = await axios
    .post<UserDto>(`api/register`, {
      name: name,
      email: email,
      login: login,
      password: password
    })
    .catch((error) => {
      throw error
    })

  return new UserDto(data)
}
