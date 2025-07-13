import { useMutation, useQuery } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"

import { getUserMeOptions, loginAccessTokenMutation } from "@/client/@tanstack/react-query.gen"


const isLoggedIn = () => {
  return localStorage.getItem("access_token") !== null
}

const useAuth = () => {
  const navigate = useNavigate()

  const {data: user} = useQuery({ ...getUserMeOptions(), enabled: isLoggedIn() })

  const loginMutation = useMutation({
    ...loginAccessTokenMutation(),
    onSuccess: (data) => {
      navigate({ to: "/teams" })
      localStorage.setItem("access_token", data.access_token)
    },
    onError: (error) => {
      console.log(error)
    }

  })

  return {
    loginMutation,
    user
  }
}

export { isLoggedIn }
export default useAuth