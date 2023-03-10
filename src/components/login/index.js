import Cookies from 'js-cookie'

const LoginCaliked = async () => {
  const options = {
    method: 'POST',
    body: JSON.stringify({username: 'rahul', password: 'rahul@2021'}),
  }

  const response = await fetch('https://apis.ccbp.in/login', options)
  const data = await response.json()
  console.log(data)
  Cookies.set('jwt_token', data.jwt_token, {expires: 30})
}

const Login = () => (
  <button type="button" onClick={LoginCaliked}>
    Submit
  </button>
)

export default Login
