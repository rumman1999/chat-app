import { useContext } from "react";
import {  Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import styled from "styled-components";
import { TbSquareRoundedLetterRFilled, TbMassage } from "react-icons/tb";
import { FaSignOutAlt, FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Sidebar = styled(motion.div)`
  width: 50px;
  height: 100vh;
  background: linear-gradient(145deg, #1f1f1f, #343434);
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
  transition: width 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  &:hover {
    width: 250px;
  }
`;

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content:space-between;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 1rem 0;
  box-sizing: border-box;
`;

const Brand = styled.div`
`;

const StyledLink = styled(Link)`
  color: white;
  margin: 1rem;
  text-decoration: none;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap:1rem;
  width: 100%;
  padding: 0.8rem 0.25rem;
`;

const LogOutContainer = styled.div`
  width: 100%;
`;

const IconWrapper = styled.span`
  display: inline-block;
`;

function NavBar() {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <Sidebar
      initial={{ width: 50 }}
      whileHover={{ width: 200 }}
      transition={{ duration: 0.3 }}
    >
      <SidebarContent>
        <StyledLink  to="/" style={{margin:"0.5rem"}}>
        <Brand>
          <TbSquareRoundedLetterRFilled style={{ height: "32px", width: "32px" }} />
        </Brand>
        </StyledLink>
        
        <Stack direction="column" gap={3} style={{ width: "100%" , height:"auto" , flex:"none"}} >
          {!user && (
            <LogOutContainer>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <StyledLink to="/chat">
                  <IconWrapper>
                    <TbMassage style={{ height: "24px", width: "24px" }}/>
                  </IconWrapper>
                  <span className="link-text">Chat</span>
                </StyledLink>
              </motion.div>
            </LogOutContainer>
          )}
        </Stack>

        <Stack direction="column" gap={3} style={{ width: "100%" , height:"auto" , flex:"none"}} >
          {!user && (
            <LogOutContainer>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <StyledLink to="/login">
                  <IconWrapper>
                    <FaSignInAlt />
                  </IconWrapper>
                  <span className="link-text">Login</span>
                </StyledLink>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <StyledLink to="/register">
                  <IconWrapper>
                    <FaUserPlus />
                  </IconWrapper>
                  <span className="link-text">Register</span>
                </StyledLink>
              </motion.div>
            </LogOutContainer>
          )}
        </Stack>

        {user && (
          <LogOutContainer>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <StyledLink onClick={() => logoutUser()} to="/login">
                <IconWrapper>
                  <FaSignOutAlt />
                </IconWrapper>
                <span className="link-text">LogOut</span>
              </StyledLink>
            </motion.div>
          </LogOutContainer>
        )}
      </SidebarContent>
    </Sidebar>
  );
}

export default NavBar;
