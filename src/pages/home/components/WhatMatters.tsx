"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";

export default function WhatMatters() {
  const mapRef = useRef<HTMLDivElement>(null);
  const position: [number, number] = [12.9012, 77.7529];
  const address = "Chikkatirupati Rd, Sarjapura, Bengaluru, Karnataka 562125";

  // Detect mobile screen
  const [popupMaxWidth, setPopupMaxWidth] = useState<number>(80);

  useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth <= 768) {
        setPopupMaxWidth(80); // Mobile value
      } else {
        setPopupMaxWidth(250); // Desktop value
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

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

        map = L.map(mapRef.current!, {
          zoomControl: false,
          scrollWheelZoom: false,
        }).setView(position, 15);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
          map
        );

        L.marker(position)
          .addTo(map)
          .bindPopup(
            `
              <div 
                class="popup-content-holder"
                style="
                  
                  padding:6px;
                "
              >
                <h3>SWIFT CITY</h3>
                <p>${address}</p>
              </div>
            `,
            { closeButton: false, maxWidth: popupMaxWidth }
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
  }, [position, address, popupMaxWidth]);

  return (
    <div className="what-matters-content-holder-parent">
      <h3>
        Connected to What <br /> <span>Matters</span>
      </h3>
      <p className="desktop-view">
        Discover a location that balances convenience with calm — close to top
        schools, malls, and city hubs.
      </p>
      <p className="mobile-view-text">
        A location that balances convenience with calm, close to top schools,
        malls and city hubs.
      </p>

      <div className="left-and-right-padding-in-content">
        <div ref={mapRef} id="nearby" className="map-container" />
      </div>
    </div>
  );
}
