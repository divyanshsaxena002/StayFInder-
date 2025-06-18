import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ListingDetail = () => {
  const { id } = useParams(); // listing ID from URL
  const [listing, setListing] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/listings/${id}`);
        setListing(res.data);
      } catch (err) {
        console.error("Error fetching listing:", err);
      }
    };

    fetchListing();
  }, [id]);

  const handleBooking = async () => {
    // Debug logs
    console.log("🧾 Booking Debug Info:");
    console.log("userId from localStorage:", userId);
    console.log("listingId from URL params:", id);
    console.log("Start:", startDate, "End:", endDate);

    // Validation
    if (!userId) {
      setMessage("⚠️ Please log in to book a stay.");
      return;
    }

    if (!startDate || !endDate) {
      setMessage("⚠️ Please select both check-in and check-out dates.");
      return;
    }

    const payload = {
      listing: id, // Changed back to 'listing' to match updated backend
      userId,
      startDate,
      endDate,
    };

    console.log("📦 Sending booking payload:", JSON.stringify(payload, null, 2));

    try {
      const response = await axios.post(
        "http://localhost:5000/api/bookings",
        payload
      );
      console.log("✅ Booking response:", response.data);
      setMessage("✅ Booking successful!");
    } catch (err) {
      console.error("❌ Booking failed:", err.response?.data || err.message);
      setMessage("❌ Booking failed. Please try again.");
    }
  };
  
  if (!listing) return <p>Loading...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{listing.title}</h1>
      <img
        src={listing.image || "https://picsum.photos/500/300"}
        alt={listing.title}
        style={{ width: "100%", height: "300px", objectFit: "cover" }}
      />
      <h3>{listing.location}</h3>
      <p>{listing.description}</p>
      <h2>₹{listing.price} / night</h2>

      <div style={{ marginTop: "2rem" }}>
        <h3>Book Now</h3>
        <label>
          Check-in:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <br />
        <label>
          Check-out:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <br />
        <button onClick={handleBooking}>Book Stay</button>
        {message && (
          <p style={{ color: message.startsWith("✅") ? "green" : "red" }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ListingDetail;
