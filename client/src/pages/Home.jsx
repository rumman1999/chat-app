
import { useNavigate } from "react-router-dom";
import bgVideo from "../../public/bgVideo/7989448-hd_1920_1080_25fps.mp4"
import "../css/landing.css"
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ContentContainer = styled.div`
  color: #333;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  max-width: 600px;
  margin: 2rem auto;
  text-align: center;
`;

const Heading = styled(motion.h1)`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #ffff;
`;

const Paragraph = styled(motion.p)`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #fafafa;
`;


const Button = styled(motion.button)`
  background: linear-gradient(145deg, #1a1a1a, #333333); /* Dark gradient for the background */
  color: #e0e0e0; /* Light gray text color for contrast */
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 10px; /* Rounded corners for a more modern look */
  cursor: pointer;
  outline: none;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5); /* Deep shadow for a floating effect */
  transition: background 0.3s, box-shadow 0.3s, transform 0.2s;

  &:hover {
    background: linear-gradient(145deg, #333333, #1a1a1a); /* Invert gradient on hover */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.6); /* Increase shadow on hover */
    transform: translateY(-2px); /* Slight lift effect on hover */
  }

  &:active {
    background: linear-gradient(145deg, #1a1a1a, #333333); /* Maintain hover gradient on click */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4); /* Reduce shadow on click */
    transform: translateY(0); /* Return to original position on click */
  }
`;

const variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

function Home() {
  const { user } = useContext(AuthContext);
    const navigate = useNavigate()

    const navigateFunc = () => {
      if(user){
        navigate("/chat")
      }else{
        navigate("/login")
      }
    }
  return (
    <div className="landing-page">
    <video autoPlay loop muted className="background-video">
      <source src={bgVideo} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <ContentContainer>
      <Heading
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 10 }}
      >
        Let's get started with AI driven Chatting App 
      </Heading>
      <Paragraph
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 5, delay: 0.2 }}
      >
        Enhancing the feeling
      </Paragraph>
      <Button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 10, delay: 0.2 }}
        onClick={()=>navigateFunc()}
      >
        Get Started
      </Button>
    </ContentContainer>
  </div>
  )
}

export default Home