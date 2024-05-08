import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import backgroundImage from "./trip.jpg";

const Container = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; /* Align children vertically */
  font-family: 'Roboto', sans-serif; /* Add this line */
`;

const Content = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 8px;
`;

const Title = styled.h1`
  color: black;
  font-size: 45px;
  margin-bottom: 10px;
  /* position the title outside the content container */
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const Description = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
  display: block;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 16px;
  box-sizing: border-box; /* Add this line */
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 16px;
  box-sizing: border-box; /* Add this line */
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  max-width: 200px;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${spin} 2s linear infinite;
`;

function UserInput({ onGenerateClick }) {
  const [country, setCountry] = useState("");
  const [transportation, setTransportation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleTransportationChange = (event) => {
    setTransportation(event.target.value);
  };

  const handleGenerateClick = async () => {
    setIsLoading(true);
    await onGenerateClick(country, transportation);
    setIsLoading(false);
    navigate("/trip-plan");
  };


  return (
    <Container>
      <Content>
        <Title>Welcome to Trip Generator</Title>
        <Description>
          Plan your next adventure! Enter your desired country and mode of
          transportation below.
        </Description>
        <Label>
          Enter Country Name:
          <Input type="text" value={country} onChange={handleCountryChange} />
        </Label>
        <Label>
          Choose Mode of Transportation:
          <Select value={transportation} onChange={handleTransportationChange}>
            <option value="">Select</option>
            <option value="walking">Walking</option>
            <option value="car">Car</option>
            <option value="bicycle">Bicycle</option>
          </Select>
        </Label>
        <ButtonContainer>
          {isLoading ? (
            <Spinner />
          ) : (
            <Button onClick={handleGenerateClick}>Generate</Button>
          )}
        </ButtonContainer>
      </Content>
    </Container>
  );
}

export default UserInput;
