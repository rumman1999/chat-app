import { useContext } from "react"
import {Alert , Button , Form , Row , Col , Stack} from "react-bootstrap"
import { AuthContext } from "../context/AuthContext"

function Register() {
  const {registerInfo , registerUser , updateRegisteredUserInfo , registerError , isRegisterLoading} = useContext(AuthContext)
  return (
    <>
    <Form onSubmit={registerUser}>
      <Row style={{
        height:"80vh",
        width:"50%",
        margin:"auto",
        justifyContent:"center",
        paddingTop:"10%"
      }}>
        <Col>
        <Stack gap={3}>
        <h2>Register</h2>
        <Form.Control type="text" placeholder="Name" value={registerInfo.name} onChange={(e)=>{
          updateRegisteredUserInfo({...registerInfo , name:e.target.value})
        }}/>
        <Form.Control type="email" placeholder="Email" value={registerInfo.email} onChange={(e)=>{
          updateRegisteredUserInfo({...registerInfo , email:e.target.value})
        }}/>
        <Form.Control type="password" placeholder="Password" value={registerInfo.password} onChange={(e)=>{
         updateRegisteredUserInfo({...registerInfo , password:e.target.value})
        }}/>
        {
          registerError?.error &&
          <Alert variant="danger"><p>{registerError?.message}</p></Alert>
        }
        <Button type="submit">
          {
            isRegisterLoading ? "Creating Your Account " : "Register"
          }
        </Button>
       
        </Stack>
        </Col>
      </Row>
    </Form>
    </>
  )
}

export default Register