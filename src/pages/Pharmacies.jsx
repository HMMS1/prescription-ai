import { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import { FaWhatsapp, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import "./Pharmacies.css";

const libraries = ["places"];

const mapContainerStyle = {
  width: "100%",
  height: "560px",
  borderRadius: "34px",
};

function Pharmacies() {
  const mapRef = useRef(null);

  const [userLocation, setUserLocation] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        alert("Please allow location access.");
      }
    );
  }, []);

  const onMapLoad = (map) => {
    mapRef.current = map;

    if (!userLocation || !window.google) return;

    const service = new window.google.maps.places.PlacesService(map);

    service.nearbySearch(
      {
        location: userLocation,
        radius: 3000,
        type: "pharmacy",
      },
      (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const realPharmacies = results.map((place) => ({
            id: place.place_id,
            name: place.name,
            address: place.vicinity,
            rating: place.rating,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          }));

          setPharmacies(realPharmacies);
        }
      }
    );
  };

  if (loadError) {
    return <main className="pharmacies-page">Map failed to load.</main>;
  }

  return (
    <main className="pharmacies-page">
      <section className="pharmacies-header">
        <h1>Nearest Pharmacies</h1>
        <p>Real nearby pharmacies from Google Maps based on your location.</p>
      </section>

      <section className="pharmacies-layout">
        <div className="map-placeholder">
          {!isLoaded || !userLocation ? (
            <h3>Loading your location...</h3>
          ) : (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={userLocation}
              zoom={15}
              onLoad={onMapLoad}
            >
              <Marker position={userLocation} label="You" />

              {pharmacies.map((pharmacy, index) => (
                <Marker
                  key={pharmacy.id}
                  position={{
                    lat: pharmacy.lat,
                    lng: pharmacy.lng,
                  }}
                  label={`${index + 1}`}
                />
              ))}
            </GoogleMap>
          )}
        </div>

        <div className="pharmacy-list">
          {pharmacies.length === 0 ? (
            <div className="pharmacy-card">
              <div>
                <h3>Searching nearby pharmacies...</h3>
                <p>Allow location and make sure Places API is enabled.</p>
              </div>
            </div>
          ) : (
            pharmacies.map((pharmacy, index) => (
              <div className="pharmacy-card" key={pharmacy.id}>
                <div>
                  <h3>
                    {index === 0 ? "Nearest: " : ""}
                    {pharmacy.name}
                  </h3>

                  <p>
                    <FaMapMarkerAlt /> {pharmacy.address || "No address"}
                  </p>

                  <span>
                    {pharmacy.rating
                      ? `Rating: ${pharmacy.rating}`
                      : "No rating"}
                  </span>
                </div>

                <div className="contact-actions">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${pharmacy.lat},${pharmacy.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    title="Open in Google Maps"
                  >
                    <FaMapMarkerAlt />
                  </a>

                  <a href="#" title="Phone will require backend/place details">
                    <FaPhoneAlt />
                  </a>

                  <a href="#" title="WhatsApp requires pharmacy phone number">
                    <FaWhatsapp />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

export default Pharmacies;