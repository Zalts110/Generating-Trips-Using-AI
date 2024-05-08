import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { generateImageFromDescription } from "./api";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";
import "./App.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function TripPage({ tripPlan }) {
  const { tripName } = useParams();
  const [image, setImage] = useState(null);
  const mapRef = useRef();

  useEffect(() => {
    const trip = tripPlan.trip_routes.find((trip) => trip.name === tripName);

    if (trip) {
      const fetchImage = async () => {
        const generatedImage = await generateImageFromDescription(
          trip.description
        );
        setImage(generatedImage);
      };

      fetchImage();
    }
  }, [tripName, tripPlan]);

  if (!tripPlan || !tripPlan.trip_routes) {
    return <p>No trip plan available.</p>;
  }

  const trip = tripPlan.trip_routes.find((trip) => trip.name === tripName);

  if (!trip) {
    return <p>Trip not found.</p>;
  }

  const positionStart = [
    trip.start_coordinates.latitude,
    trip.start_coordinates.longitude,
  ];
  const positionEnd = [
    trip.end_coordinates.latitude,
    trip.end_coordinates.longitude,
  ];

  const Routing = () => {
    const map = useMap();
    useEffect(() => {
      L.Routing.control({
        waypoints: [
          L.latLng(positionStart[0], positionStart[1]),
          L.latLng(positionEnd[0], positionEnd[1]),
        ],
        routeWhileDragging: true,
      }).addTo(map);
    }, [map]);

    return null;
  };

  const handleSaveTrip = async () => {
    const imageURL = await generateImageFromDescription(trip.description); // Generate image URL

    const tripDetails = {
      name: trip.name,
      startLat: trip.start_coordinates.latitude,
      startLng: trip.start_coordinates.longitude,
      endLat: trip.end_coordinates.latitude,
      endLng: trip.end_coordinates.longitude,
      image: imageURL, // Add image URL to tripDetails
    };

    fetch("http://127.0.0.1:3001/save_trip", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tripDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Trip saved successfully:", data.data); // Change this line to log the 'data' field
        // Optionally, you can show a success message or redirect the user
        alert("Trip saved successfully!");
      })
      .catch((error) => {
        console.error("Failed to save trip:", error);
        // Optionally, you can show an error message to the user
        alert("Failed to save trip. Please try again later.");
      });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.4)",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <h1
          style={{
            color: "black",
            fontSize: "45px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          {trip.name}
        </h1>
        <hr
          style={{
            width: "100%",
            margin: "20px 0",
          }}
        />
        <h2
          style={{
            color: "black",
            fontSize: "20px",
            marginBottom: "10px",
          }}
        >
          {" "}
        </h2>
        <p
          style={{
            fontSize: "16px",
            marginBottom: "10px",
            fontFamily: "Arial, sans-serif",
            color: "#333",
            lineHeight: "1.5",
            letterSpacing: "0.05em",
          }}
        >
          {trip.description}
        </p>
        <MapContainer
          center={positionStart}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={positionStart}>
            <Popup>Starting Point</Popup>
          </Marker>
          <Marker position={positionEnd}>
            <Popup>Ending Point</Popup>
          </Marker>
          <Routing />
        </MapContainer>
        <button
          onClick={handleSaveTrip}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            maxWidth: "200px",
            marginBottom: "10px",
            textAlign: "left",
          }}
        >
          Save Trip
        </button>
      </div>
    </div>
  );
}

export default TripPage;
