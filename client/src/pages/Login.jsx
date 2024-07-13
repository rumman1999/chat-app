import { useContext } from "react"
import {Alert , Button , Form , Row , Col , Stack} from "react-bootstrap"
import { AuthContext } from "../context/AuthContext"

function Login() {
  const {loginInfo , loginUser , updateLoginUserInfo , loginError} = useContext(AuthContext)

  return (
    <>
    <Form onSubmit={loginUser}>
      <Row style={{
        height:"80vh",
        width:"50%",
        margin:"auto",
        justifyContent:"center",
        paddingTop:"10%"
      }}>
        <Col>
        <Stack gap={3}>
        <h2>Login</h2>
        <Form.Control type="email" placeholder="Email" value={loginInfo.email} onChange={(e)=>{
          updateLoginUserInfo({...loginInfo , email:e.target.value})
        }}/>
        <Form.Control type="password" placeholder="Password" value={loginInfo.password} onChange={(e)=>{
         updateLoginUserInfo({...loginInfo , password:e.target.value})
        }}/>
        {
          loginError?.error &&
          <Alert variant="danger"><p>{loginError?.message}</p></Alert>
        }
        <Button type="submit">Login
        </Button>
       
        </Stack>
        </Col>
      </Row>
    </Form>
    </>
  )
}

export default Login