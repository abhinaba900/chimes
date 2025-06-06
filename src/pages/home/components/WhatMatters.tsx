"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

export default function WhatMatters() {
  const mapRef = useRef<HTMLDivElement>(null);
  const position: [number, number] = [12.9012, 77.7529];
  const address = "Chikkatirupati Rd, Sarjapura, Bengaluru, Karnataka 562125";

  useEffect(() => {
    if (!mapRef.current) return;

    let map: L.Map | null = null;

    const initMap = async () => {
      try {
        const L = await import("leaflet");

        const DefaultIcon = L.icon({
          iconUrl: "/assets/marker-of-the-map.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        });
        L.Marker.prototype.options.icon = DefaultIcon;

        // Initialize map with zoom controls and scroll wheel zoom disabled
        map = L.map(mapRef.current!, {
          zoomControl: false, // Disables +/- zoom buttons
          scrollWheelZoom: false, // Disables mouse wheel zoom
        }).setView(position, 15);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
          map
        );

        L.marker(position)
          .addTo(map)
          .bindPopup(
            `<div class="popup-content-holder">
               <h3>SWIFT CITY</h3>
               <p>${address}</p>
             </div>`
          )
          .openPopup();
      } catch (error) {
        console.error("Failed to initialize map:", error);
      }
    };

    initMap();

    return () => {
      if (map) {
        map.remove();
        map = null;
      }
    };
  }, [position, address]);

  return (
    <div className="what-matters-content-holder-parent">
      <h3>
        Connected to What <br /> <span>Matters</span>
      </h3>
      <p>
        Discover a location that balances convenience with calm — close to top
        schools, malls, and city hubs, yet wrapped in nature's quiet
      </p>
      <div ref={mapRef} id="nearby" className="map-container" />
    </div>
  );
}
