import {useState, useEffect} from "react"
import Form from './Form.js'
function App() {
  const [loggedInUser, setLoggedInUser] = useState(false)
  
  useEffect(() => {
    fetch("http://localhost:5000/users/me", {
      credentials: 'include'
    })
    .then(data => data.json())
    .then(json => {
      // if (json.)
      if (json.username) {
        setLoggedInUser({json})
      }
    })
  }, [])


  const handleSignup = (e, form) => {
    e.preventDefault()
    fetch("http://localhost:5000/users/register", {
      body: JSON.stringify(form),
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      credentials: 'include'
    })
    .then(data => data.json())
    .then(json => setLoggedInUser(json))
    // Send Data
  }

  const handleLogin = (e, form) => {
    e.preventDefault()
    fetch("http://localhost:5000/users/login", {
      body: JSON.stringify(form),
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      credentials: 'include'
    })
    .then(data => data.json())
    .then(json => setLoggedInUser(json))
    // Send Data
  }

  return (
    <>
    {!loggedInUser ? (
      <>
      <h2>Register</h2>
      <Form handleSubmit={handleSignup} formFields={["username", "password", "confirm"]} title="Register!" />
      <h2>Login</h2>
      <Form handleSubmit={handleLogin} formFields={["username", "password"]} title="Log In!" />
      </>
    ) : (
      <h2>You are logged in</h2>
    )}
    </>
  )
}

export default App;
