import {useState, useEffect} from "react"
function App() {
  const [loggedInUser, setLoggedInUser] = useState(false)
  const [user, setUser] = useState({
    username: "",
    password: "",
  })
  
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


  const handleSubmit = (e) => {
    e.preventDefault()
    fetch("http://localhost:5000/users/register", {
      body: JSON.stringify(user),
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      credentials: 'include'
    })
    .then(data => data.json())
    .then(json => {
      setLoggedInUser(json)
    })
    // Send Data
  }

  const handleLogin = (e) => {
    e.preventDefault()
    fetch("http://localhost:5000/users/login", {
      body: JSON.stringify(user),
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      credentials: 'include'
    })
    .then(data => data.json())
    .then(json => {
      setLoggedInUser(json)
    })
    // Send Data
  }

  const handleChange = (e) => {
    console.log(e.target.name)
    setUser({...user, [e.target.name]: e.target.value})
  }
  return (
    <>
    {!loggedInUser ? (
      <>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username" >Username</label>
          <input name="username" onChange={handleChange} value={user.username} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input name="password" onChange={handleChange} value={user.password} />
        </div>
        <button>Register!</button>
      </form>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username" >Username</label>
          <input name="username" onChange={handleChange} value={user.username} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input name="password" onChange={handleChange} value={user.password} />
        </div>
        <button>Login!</button>
      </form>
      </>
    ) : (
      <h2>You are logged in</h2>
    )}
    </>
  )
}

export default App;
