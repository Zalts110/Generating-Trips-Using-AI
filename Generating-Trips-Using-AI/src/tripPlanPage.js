import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import backgroundImage from "./trip.jpg";


const TripContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-family: Arial, sans-serif;
`;


const Container = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; /* Align children vertically */
`;

const Content = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 8px;
`;

const Title = styled.h1`
  color: black;
  font-size: 45px;
  margin-bottom: 20px;
  text-align: center; /* Center align the title */
`;

const Line = styled.hr`
  width: 100%;
  margin: 20px 0;
`;

const TripName = styled.h2`
  color: black;
  font-size: 20px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
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
  margin-bottom: 10px; /* Add margin bottom for spacing */
  text-align: left; /* Align button to the left */
`;
const HomeLink = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  text-align: center;
  transition: background-color 0.3s ease;
`;

function TripPlanPage({ tripPlan, country, transportation }) {
  const navigate = useNavigate();

  if (!tripPlan || !tripPlan.trip_routes) {
    return (
      <Container>
        <Content>
          <Title>No trip plan available.</Title>
          <Link to="/">Back to home</Link>
        </Content>
      </Container>
    );
  }

  const tripRoutes = tripPlan.trip_routes;

  const handleTripSelect = (trip) => {
    console.log(`You selected ${trip.name}`);
    navigate(`/trip/${trip.name}`);
  };

  return (
    <Container>
      <Content>
        <Title>3 Best Trips In {country} By {transportation}</Title>
        {tripRoutes.map((trip, index) => (
          <TripContainer key={index}>
            <TripName>{trip.name}</TripName>
            <Description>{trip.description}</Description>
            <Button onClick={() => handleTripSelect(trip)}>
              Go to {trip.name}
            </Button>
            <Line /> {/* Place the line under the button */}
          </TripContainer>
        ))}
        <HomeLink to="/">Back to home</HomeLink>
      </Content>
    </Container>
  );
}

export default TripPlanPage;
