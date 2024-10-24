"use client";

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import imgsrc from '../images/img1.jpg'; // Placeholder image for collections

export default function CollectionCard({ collection, items }) {
    if (!collection) {
        return <div>Loading...</div>; // Fallback UI
    }

    return (
        <div className="m-5 shadow p-3 mb-5 bg-white rounded">
            <h2>{collection}</h2>
            <img src={imgsrc} className="img-fluid" style={{ height: '200px', width: '200px' }} alt={collection} />
            <div className="mt-3">
                <h4>Items in {collection}</h4>
                {items && items.length > 0 ? (
                    items.map((item) => (
                        <p key={item._id}>{item.name}</p>
                    ))
                ) : (
                    <p>No items available</p>
                )}
            </div>
        </div>
    );
}
