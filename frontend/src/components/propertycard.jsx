import React from 'react';
import { Link } from 'react-router-dom';

export default function PropertyCard({ data }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem' }}>
      <h3>{data.title}</h3>
      <p>{data.location}</p>
      <p>{data.price}</p>
      <Link to={`/listing/${data.id}`}>View Details</Link>
    </div>
  );
}
