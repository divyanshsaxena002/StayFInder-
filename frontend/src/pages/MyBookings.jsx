import React, { useEffect, useState } from "react";
import axios from "axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/bookings/${userId}`
        );
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };

    if (userId) fetchBookings();
  }, [userId]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((booking, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <h3>{booking.listingId?.title || "Unknown Listing"}</h3>
            <p>
              <strong>Location:</strong> {booking.listingId?.location}
            </p>
            <p>
              <strong>Check-in:</strong>{" "}
              {new Date(booking.startDate).toDateString()}
            </p>
            <p>
              <strong>Check-out:</strong>{" "}
              {new Date(booking.endDate).toDateString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyBookings;
