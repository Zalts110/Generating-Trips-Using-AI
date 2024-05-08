// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserInput from "./UserInput";
import { generateTripPlan } from "./api";
import TripPlanPage from "./tripPlanPage";
import TripPage from "./TripPage";

function App() {
  const [tripPlan, setTripPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [country, setCountry] = useState(null);
  const [transportation, setTransportation] = useState(null);

  
  const handleGenerateClick = async (country, transportation) => {
    setIsLoading(true);
    setCountry(country);
    setTransportation(transportation);
    const tripPlan = await generateTripPlan(country, transportation);
    console.log("Generated trip plan:", tripPlan);
    setTripPlan(tripPlan);
    setIsLoading(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<UserInput onGenerateClick={handleGenerateClick} />}
        />
        <Route
          path="/trip-plan"
          element={
            isLoading ? "Loading..." : <TripPlanPage tripPlan={tripPlan} country={country} transportation={transportation} />
          }
        />
        {tripPlan && (
          <Route
            path="/trip/:tripName"
            element={<TripPage tripPlan={tripPlan} />}
          />
        )}
      </Routes>
    </Router>
  );
}

export default App;