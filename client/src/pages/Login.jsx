import { useContext, useState } from "react";
import { Alert, Form, Stack } from "react-bootstrap";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import styled from 'styled-components';

const Container = styled(motion.div)`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #111; /* Dark background */
  overflow: hidden; /* Prevent scrolling */
`;

const FormWrapper = styled.div`
  max-width: 400px;
  width: 100%;
  padding: 2rem;
  background: #1f1f1f; /* Slightly lighter dark background for the form */
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
  text-align: center;
`;

const StyledFormControl = styled(Form.Control)`
  border-radius: 8px;
  border: 2px solid ${({ hasError }) => hasError ? '#d9534f' : '#444'}; /* Dynamic border color based on error */
  background: #333; /* Darker background for inputs */
  color: #fff; /* Light text color */
  padding: 1rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease; /* Smooth transition for border color and shadow */
  box-shadow: ${({ hasError }) => hasError ? '0 0 8px rgba(217, 83, 79, 0.6)' : 'none'}; /* Dynamic shadow based on error */
  &:focus {
    outline: none;
    border-color: ${({ hasError }) => hasError ? '#d9534f' : '#0070f3'}; /* Border color on focus */
  }
`;

const StyledButton = styled(motion.button)`
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background-color: #000; /* Black background */
  border: 2px solid #333; /* Dark border */
  color: #ffffff; /* White text */
  font-weight: 500; /* Slightly bolder font */
  text-transform: uppercase; /* Uppercase text */
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease; /* Smooth transition for all properties */

  &:hover {
    background-color: #333; /* Darker background on hover */
    border-color: #666; /* Slightly lighter border on hover */
    color: #f5f5f5; /* Light text color */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6); /* Subtle shadow on hover */
  }

  &:focus,
  &:active,
  &:focus-visible {
    outline: none; /* Remove default focus outline */
    background-color: #000; /* Maintain black background on focus */
    border-color: #666; /* Maintain border color on focus */
    color: #f5f5f5; /* Maintain text color on focus */
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3); /* Light glow effect on focus */
    -webkit-appearance: none; /* Remove default styles in WebKit browsers */
    -moz-appearance: none; /* Remove default styles in Mozilla browsers */
    appearance: none; /* Remove default styles in other browsers */
  }
  
  /* Ensure consistent appearance during transitions */
  &:focus:not(:focus-visible),
  &:active {
    background-color: #000;
    border-color: #666;
    color: #f5f5f5;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
  }
`;

const Heading = styled(motion.h2)`
  font-size: 2rem;
  font-weight: 600;
  color: #f5f5f5; /* Light heading color */
  margin-bottom: 1.5rem;
`;

const ErrorAlert = styled(motion(Alert))`
  margin-bottom: 1rem;
  background-color: #d9534f;
  color: #ffffff;
  border: none;
  font-size: 0.875rem;
  text-align: center;
  padding: 0.75rem;
`;

function Login() {
  const { loginInfo, loginUser, updateLoginUserInfo, loginError } = useContext(AuthContext);
  const [errorFields, setErrorFields] = useState({ email: false, password: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateLoginUserInfo({ ...loginInfo, [name]: value });

    // Reset error state when user starts typing
    if (loginError?.error) {
      setErrorFields((prev) => ({ ...prev, [name]: false }));
    }
  };

  return (
    <Container
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <FormWrapper>
        <Form onSubmit={(e) => loginUser(e)}>
          <Heading
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Login
          </Heading>
          <Stack gap={3}>
            <StyledFormControl
              type="email"
              placeholder="Email"
              name="email"
              value={loginInfo.email}
              onChange={handleChange}
              hasError={errorFields.email || loginError?.error}
              animate={loginError?.error ? { borderColor: ['#d9534f', '#ff6f6f', '#d9534f'] } : {}}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            />
            <StyledFormControl
              type="password"
              placeholder="Password"
              name="password"
              value={loginInfo.password}
              onChange={handleChange}
              hasError={errorFields.password || loginError?.error}
              animate={loginError?.error ? { borderColor: ['#d9534f', '#ff6f6f', '#d9534f'] } : {}}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            />
            {loginError?.error && (
              <ErrorAlert
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p>{loginError?.message}</p>
              </ErrorAlert>
            )}
            <StyledButton type="submit" whileTap={{ scale: 0.95 }}>
              Login
            </StyledButton>
          </Stack>
        </Form>
      </FormWrapper>
    </Container>
  );
}

export default Login;
