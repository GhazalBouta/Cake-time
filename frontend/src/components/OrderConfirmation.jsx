import React from 'react';
import { useLocation } from 'react-router-dom';
import '../CSS/OrderConfirmation.css';

const OrderConfirmation = () => {
  const location = useLocation();
  const { total, paymentMethod, shippingInfo } = location.state || {};

  return (
    <div className="confirmation-container">
      <div className="confirmation-content">
        <div className="confirmation-header">
          <h1>🎉 Order Confirmed!</h1>
          <p>Your order has been successfully placed.</p>
        </div>

        <div className="order-details">
          <h2>Order Details</h2>
          <div className="detail-item">
            <span>Payment Method:</span>
            <span>{paymentMethod}</span>
          </div>
          <div className="detail-item">
            <span>Total Amount:</span>
            <span>€{total.toFixed(2)}</span>
          </div>
        </div>

        <div className="shipping-details">
          <h2>Shipping Information</h2>
          <div className="detail-item">
            <span>Name:</span>
            <span>{shippingInfo?.name}</span>
          </div>
          <div className="detail-item">
            <span>Email:</span>
            <span>{shippingInfo?.email}</span>
          </div>
          <div className="detail-item">
            <span>Address:</span>
            <span>{shippingInfo?.address}</span>
          </div>
          <div className="detail-item">
            <span>City:</span>
            <span>{shippingInfo?.city}</span>
          </div>
          <div className="detail-item">
            <span>Postal Code:</span>
            <span>{shippingInfo?.postalCode}</span>
          </div>
          <div className="detail-item">
            <span>Country:</span>
            <span>{shippingInfo?.country}</span>
          </div>
        </div>

        <div className="confirmation-footer">
          <p>Thank you for your purchase! Your order will be processed shortly.</p>
          <p>We will send you an email confirmation shortly.</p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;