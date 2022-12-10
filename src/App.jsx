import { useState } from 'react'
import { Button, Container, Alert, Form } from 'react-bootstrap';
import './App.css'

function NavBarComponent(props) {
  return (
    <nav className='navbar'>
      <ul className='links'>
      <li><a href='#'>{props.home}</a></li>
      <li><a href='#'>{props.about}</a></li>
      <li><a href='#'>{props.contact}</a></li>
      </ul>
    </nav>
  )
}

function SideBarComponent(props) {
  return (
    <div className='sidebar'>
      <p><a href='#'>{props.link1}</a></p>
      <p><a href='#'>{props.link2}</a></p>
    </div>
  )
}

function Layout(props) {
  return (
    <div className='layout'>
      {props.children}
    </div>
  )
}

function YoutubeComponent(props) {
  return (
    <div className='container'>
      <img src={props.thumbnailImg} />
      <div className='content'>
        <p>{props.videoTitle}</p>
        <p>{props.uploader}</p>
        <p>{props.videoUploaded}</p>
      </div>
    </div>
  )
}

function Login(props){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ error, setError ] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    
    if(username == "user123" && password == "password123"){
      console.log("logged in");
      props.setLoginUser(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  const signUp = (e) => {
    e.preventDefault();
    props.show(false);
  }

  return (
    <Container>
      {
      error ? 
      <Alert variant='danger'>That was the wrong username and/or password</Alert>
      : 
      <h2>Welcome to the App</h2>
      }
      <Form onSubmit={(e) => handleLogin(e)}>
        <Form.Group className='mb-3' controlId='formUsername'>
          <Form.Label>Username</Form.Label>
          <Form.Control onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Enter Your Username" name="username" />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Your Password" name="password" />
        </Form.Group>
        <div className='mb-3 d-grid'>
          <Button type="submit">Login</Button>
        </div>
        <div className='mb-2 d-grid'>
          <Button onClick={signUp}>Sign Up</Button>
        </div>
      </Form>
    </Container>
  )
}

function Signup(props){
  const signIn = (e) => {
    e.preventDefault();
    props.signIn(true);
  }

  return (
    <Container>
      {
      <h2>Create an Account</h2>
      }
      <Form onSubmit={(e) => signIn(e)}>
        <Form.Group className='mb-3' controlId='formFirstName'>
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Your First Name" name="firstname" />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formLastName'>
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Your Last Name" name="lastname" />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formUsername'>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter Your Username" name="username" />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Create Your Password" name="password" />
        </Form.Group>
        <div className='d-grid gap-2'>
          <Button type="submit" size='lg'>Sign Up</Button>
        </div>
      </Form>
    </Container>
  )
}

function App() {
  const [ isUserLoggedIn, setUserLoggedIn ] = useState(false);
  const [ showLogin, setShowLogin ] = useState(true);

  return (
    <>
      { isUserLoggedIn ?
      <>
        <NavBarComponent home="Home" about="About Us" contact="Contact" />
        <div className='main'>
          <SideBarComponent link1="Upload" link2="Settings" />
          <Layout>
            <YoutubeComponent thumbnailImg="https://via.placeholder.com/600x400"
              videoTitle="Why A Cheeseburger?"
              uploader="Mark"
              videoUploaded="11/30/2022" />
            <YoutubeComponent thumbnailImg="https://via.placeholder.com/600x400"
              videoTitle="Luis' Big Break"
              uploader="Luis"
              videoUploaded="11/30/2022" />
            <YoutubeComponent thumbnailImg="https://via.placeholder.com/600x400"
              videoTitle="How to Make a Taco"
              uploader="CookingFoods"
              videoUploaded="11/28/2022" />
          </Layout>
        </div>
      </>
      :
      showLogin ? 
      <Login setLoginUser={setUserLoggedIn} show={setShowLogin}/> 
      :
      <Signup signIn={setUserLoggedIn} />
      }
    </>
  )
}

export default App
